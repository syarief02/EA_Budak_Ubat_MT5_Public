export const FB_PIXEL_ID = "2242456612962821";

// Track pageview
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// Track standard event (e.g. ViewContent, Lead, Contact, CompleteRegistration)
export const event = (name, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

// Track custom event
export const customEvent = (name, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, options);
  }
};

