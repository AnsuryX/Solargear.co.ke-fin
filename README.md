# Solar Gear Ltd - Nationwide Solar Installers Kenya

Solar Gear Ltd is a **lead-generation landing page for residential solar installations in Nairobi, Kenya**. We help homeowners transition to solar energy through an AI-powered chat qualification system and satellite audit analysis.

## 🌞 Features

- **AI-Powered Lead Qualification**: Virtual Solar Surveyor chatbot guides prospects through their solar journey
- **Interactive Savings Calculator**: Real-time ROI calculations for different package tiers
- **Package Selection Guide**: Three-tier offering (SolarStart™, SolarFamily™, SolarElite™)
- **Lead Capture Integration**: Automated lead submission via Formspree
- **A/B Testing Framework**: Built-in variant tracking for conversion optimization
- **Responsive Design**: Mobile-first approach for Kenyan market
- **3D Product Demos**: Interactive Spline visualizations
- **Analytics Integration**: GTM + GA4 for lead tracking and attribution

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion animations
- **AI Service**: Gemini API (Flash model) with function calling
- **Forms**: Formspree endpoint for lead capture
- **Charts**: Recharts for savings visualizations
- **3D**: Spline for product demos
- **Hosting**: Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:AnsuryX/Solargear.co.ke-fin.git
cd solar-gear-ltd

# Install dependencies
npm install

# Create environment file
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Test production build locally
- `npm run lint` - Run ESLint

## 🎯 Project Structure

```
src/
├── components/          # React components (lazy-loaded sections)
├── services/           # Gemini API & analytics services
├── lib/               # Utilities (cn, analytics, constants)
├── types.ts           # TypeScript definitions
├── App.tsx            # Main router & chat state management
└── index.css          # Global styles
```

## 💬 Lead Generation Flow

1. **Hero Section** → User clicks CTA
2. **AI Chat** → Virtual Surveyor qualifies lead (home type, package interest, location)
3. **Lead Submission** → Chat auto-submits via Formspree when contact info provided
4. **Booking Intent** → Props to Calendly for Remote Satellite Audit scheduling

## 📊 Package Tiers (Starting Prices)

| Package | Price | Best For |
|---------|-------|----------|
| **SolarStart™ Backup** | KES 285,000 | Essential backup power |
| **SolarFamily™ Hybrid** | KES 595,000 | Standard residential |
| **SolarElite™ Independence** | KES 1,450,000 | Off-grid autonomy |

*All prices customized post-satellite analysis*

## 🔗 Key Integrations

- **WhatsApp Support**: +254 722 371 250
- **Booking**: https://calendly.com/solargearlrd/30min
- **Lead Capture**: Formspree endpoint (`xrezgbrp`)

## 📈 Analytics & A/B Testing

- Variant assignment via localStorage (`sg_ab_variant`)
- Event tracking: lead submissions, chat interactions, ConversionRate
- GTM + GA4 integration with cohort analysis

## 🛠️ Environment Variables

Create `.env.local` in the root directory:

```
GEMINI_API_KEY=your_gemini_api_key
```

## 📝 Contributing

1. Follow Tailwind CSS conventions
2. Use `cn()` utility for conditional class merging
3. Lazy-load heavy components in App.tsx
4. Track conversions with `trackEvent()` utility
5. Test locally with `npm run preview` before deployment

## 🚢 Deployment

Hosted on **Netlify**. Push to the repository and Netlify auto-deploys via `netlify.toml`.

## 📞 Support

For issues or feature requests, contact the development team.

---

**Solar Gear Ltd** © 2026 | Making solar accessible across Kenya