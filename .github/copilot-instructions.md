# Copilot Instructions for Solar Gear Ltd Website

## Project Overview
Solar Gear Ltd is a **lead-generation landing page for residential solar installations in Nairobi, Kenya**. The site uses an AI-powered chat (Google Gemini) to qualify leads before booking Remote Satellite Audits. Key metrics: leads → WhatsApp/booking → satellite analysis.

## Architecture & Data Flow

### Core Stack
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **AI Service**: Google Gemini API (flash model) with function calling for lead submission
- **Form Integration**: Formspree endpoint for lead capture (`submitLead` function)
- **Animations**: Framer Motion for modal/section transitions
- **Charts**: Recharts for calculator visualizations
- **3D**: Spline for interactive product demos

### Key Component Structure (Lazy-loaded in App.tsx)
```
App.tsx (main router, chat state, A/B test variant)
├── Hero / Header (CTAs)
├── ProblemSection / ProductSpotlight (awareness)
├── CalculatorSection (engagement, savings calc)
├── PackageSelectionGuide / PackagesSection (conversion paths)
├── SocialProof / TestimonialCarousel (credibility)
├── OfferSection / RiskReversal (objection handling)
├── LeadMagnet / FAQ (qualification, objections)
├── ChatModal (AI lead qualification)
├── PackagePurchaseModal (checkout intent)
└── PrivacyPolicy (hash-routed to #privacy)
```

### Gemini AI Service Integration
Located in [services/geminiService.ts](services/geminiService.ts):
- **System Instruction**: Detailed role ("Virtual Solar Surveyor") with 3-step process, pricing, and strategy for objection handling
- **Function Declaration**: `submitLead()` collects `{fullName, phoneNumber, homeType, packageInterest, location, notes}` → submits to Formspree
- **Temperature**: 0.7 (conversational but grounded)
- **Lead Handoff Trigger**: When user provides location + contact, AI calls `submitLead` automatically
- **Fallback**: On API errors, prompt user to use WhatsApp (+254 722 371 250)

### Package Tiers (Pricing Strategy)
All prices use "Starting from" language due to customization per satellite analysis:
- **SolarStart™ Backup**: KES 285,000 (basic essentials)
- **SolarFamily™ Hybrid**: KES 595,000 (standard home)
- **SolarElite™ Independence**: KES 1,450,000 (luxury off-grid)

## Critical Developer Workflows

### Environment Setup
1. `npm install`
2. Create `.env.local` with `GEMINI_API_KEY=<your-key>` (Vite loads as `API_KEY` via vite.config.ts)
3. `npm run dev` (localhost:3000)

### Build & Deployment
- **Dev**: `npm run dev` (Vite dev server)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview` (test production build locally)
- **Hosting**: Netlify (see netlify.toml for build config)

### Key Environment Variables
- `GEMINI_API_KEY` / `API_KEY`: Required for chat functionality; accessed via `process.env.API_KEY` in [vite.config.ts](vite.config.ts#L7)
- Vite passes env vars as `process.env` object (stringified for client safety)

## Project-Specific Conventions & Patterns

### Lazy Loading Strategy
All heavy components (sections) are dynamically imported with named exports to reduce initial bundle:
```tsx
const ProblemSection = lazy(() => 
  import('./components/ProblemSection').then(m => ({ default: m.ProblemSection }))
);
```
This pattern is used throughout App.tsx for non-critical-path sections. `Header` and `Hero` are **not** lazy (above the fold).

### Chat State Management
- `isChatOpen` / `setIsChatOpen`: Modal visibility toggle
- `prefillChatMessage`: Pre-populate chat with a section question (e.g., "Tell me about SolarStart" from PackagesSection CTA)
- `showGreeting`: Proactive chat greeting after 5 seconds (for engagement)
- All tracked via analytics for A/B testing

### Analytics & A/B Testing
In [lib/analytics.ts](lib/analytics.ts):
- `getABVariant()`: Persists user to variant A or B in localStorage (`sg_ab_variant`)
- `trackEvent()`: Pushes to GTM dataLayer with `ab_test_variant` included
- Key events: `whatsapp_conversion`, `form_lead_submit`, `chat_lead_submit` with `conversion_source` (hero/package_modal/etc.)
- Every GA4 event includes timestamp and variant for cohort analysis

### Utility Functions
- `cn()` in [lib/utils.ts](lib/utils.ts): Merges Tailwind classes with clsx + tailwind-merge (handles conflicts)
- Used throughout components: `cn("base-class", condition && "conditional-class")`

### Type Definitions
[types.ts](types.ts) defines: `Feature`, `Testimonial`, `ChatMessage` (role + text + isError/isBooking flags)

## Integration Points & External Dependencies

### Formspree (Lead Capture)
- Endpoint: `https://formspree.io/f/xrezgbrp`
- Triggered by Gemini `submitLead()` function in [geminiService.ts](services/geminiService.ts#L76)
- Adds `source: 'Virtual Surveyor AI'` header

### External Links / CTAs
- **WhatsApp**: `+254 722 371 250` (fallback, error states)
- **Calendly Booking**: `https://calendly.com/solargearlrd/30min` (booking intent)
- Both tracked separately in analytics

### Google Gemini API
- Model: `gemini-3-flash-preview`
- Function calling enabled for lead submission
- Response parsing looks for keywords: "notified our engineering", "details received" → track as lead

### Third-Party UI / Motion
- **Lucide Icons**: Buttons, loading spinners, modals (MessageCircle, Loader2, X, Sparkles)
- **Framer Motion**: Section reveal animations, modal open/close, AnimatePresence wrapper
- **Recharts**: Calculator cost/savings bar charts

## Common Modification Patterns

### Adding a New CTA to Chat
Pass `prefillChatMessage` prop to `ChatModal` from any component:
```tsx
onClick={() => setPrefillChatMessage("Tell me about SolarStart packages")}
```

### Changing Pricing or Package Names
Update both [geminiService.ts](services/geminiService.ts#L44) (SYSTEM_INSTRUCTION) AND component display files (PackagesSection, PackagePurchaseModal).

### Tweaking AI Behavior
Modify `SYSTEM_INSTRUCTION` or `temperature` in [geminiService.ts](services/geminiService.ts). Changes apply on next `initializeChat()` call.

### Tracking New Conversions
Use `trackEvent()` or `trackLeadSubmission()` in [lib/analytics.ts](lib/analytics.ts), ensure `conversion_source` param is added.

## Edge Cases & Troubleshooting

- **Chat not initializing**: Check `GEMINI_API_KEY` in .env.local; Gemini API may be rate-limited
- **Lead not submitting**: Verify Formspree endpoint; check browser console for CORS or JSON errors
- **Styling conflicts**: Always use `cn()` utility when combining conditional Tailwind classes
- **Lazy component flash**: All sections wrapped in Suspense with `SectionLoader` fallback UI
