
/**
 * Utility for tracking conversions and user interactions.
 * Events are pushed to the dataLayer for tag management systems (e.g., Cloudflare Zaraz).
 */

type ConversionSource = 'hero' | 'header' | 'footer' | 'package_modal' | 'chat_modal' | 'lead_form' | 'faq' | 'general_cta';

// A/B Test Variants
export type ABVariant = 'A' | 'B' | 'C';

/**
 * Gets or assigns a persistent A/B test variant for the user.
 */
export const getABVariant = (): ABVariant => {
  if (typeof window === 'undefined') return 'A';
  
  const savedVariant = localStorage.getItem('sg_ab_variant') as ABVariant;
  if (savedVariant && (savedVariant === 'A' || savedVariant === 'B' || savedVariant === 'C')) {
    return savedVariant;
  }

  // Randomly assign A, B or C
  const rand = Math.random();
  const newVariant: ABVariant = rand < 0.33 ? 'A' : rand < 0.66 ? 'B' : 'C';
  localStorage.setItem('sg_ab_variant', newVariant);
  return newVariant;
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    // Ensure dataLayer exists
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    const variant = getABVariant();
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
      ab_test_variant: variant,
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackWhatsAppClick = (source: ConversionSource, packageName?: string) => {
  trackEvent('whatsapp_conversion', {
    conversion_source: source,
    package_name: packageName || 'general',
    method: 'whatsapp_direct'
  });
};

export const trackLeadSubmission = (source: 'form' | 'chat', packageName?: string) => {
  trackEvent(source === 'form' ? 'form_lead_submit' : 'chat_lead_submit', {
    conversion_source: source,
    package_interest: packageName || 'unknown'
  });
};

export const trackPackageInterest = (packageName: string) => {
  trackEvent('package_interest_click', {
    package_name: packageName
  });
};
