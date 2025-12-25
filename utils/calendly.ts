// Calendly integration utility
// This provides a consistent way to open Calendly across the app

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        utm?: {
          utmCampaign?: string;
          utmSource?: string;
          utmMedium?: string;
          utmContent?: string;
          utmTerm?: string;
        };
      }) => void;
      showPopupWidget: (url: string) => void;
      closePopupWidget: () => void;
    };
  }
}

// Default Calendly URL
const CALENDLY_URL = 'https://calendly.com/d/cxff-b85-5pd/schedule-ai-consultation';

interface CalendlyOptions {
  email?: string;
  name?: string;
  source?: string;
}

/**
 * Opens Calendly popup with optional prefilled data
 * @param options - Optional prefill data (email, name, source)
 */
export const openCalendly = (options?: CalendlyOptions) => {
  if (typeof window === 'undefined') return;

  // Check if Calendly is loaded
  if (window.Calendly) {
    window.Calendly.initPopupWidget({
      url: CALENDLY_URL,
      prefill: {
        email: options?.email || '',
        name: options?.name || '',
      },
      utm: {
        utmSource: options?.source || 'website',
        utmMedium: 'popup',
        utmCampaign: 'schedule-consultation',
      },
    });
  } else {
    // Fallback: open in new tab if Calendly widget isn't loaded
    const url = new URL(CALENDLY_URL);
    if (options?.email) url.searchParams.set('email', options.email);
    if (options?.name) url.searchParams.set('name', options.name);
    window.open(url.toString(), '_blank');
  }
};

/**
 * Opens Calendly with email prompt
 * Prompts user for email before opening Calendly to ensure confirmation is sent
 */
export const openCalendlyWithEmail = (source?: string) => {
  if (typeof window === 'undefined') return;

  const email = window.prompt(
    'Enter your email to receive booking confirmation:',
    ''
  );

  if (email && email.includes('@')) {
    const name = window.prompt('Enter your name (optional):', '') || '';
    openCalendly({ email, name, source });
  } else if (email !== null) {
    // User entered invalid email but didn't cancel
    alert('Please enter a valid email address to receive your booking confirmation.');
    openCalendlyWithEmail(source);
  }
  // If email is null, user cancelled - do nothing
};

/**
 * Simple Calendly open without prefill
 */
export const openCalendlySimple = () => {
  if (typeof window === 'undefined') return;

  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
};

export { CALENDLY_URL };
