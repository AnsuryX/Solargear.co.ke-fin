
/**
 * Utility for tracking conversions and user interactions for Google Ads / GA4 via GTM.
 */

type ConversionSource = 'hero' | 'header' | 'footer' | 'package_modal' | 'chat_modal' | 'lead_form' | 'faq';

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
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
