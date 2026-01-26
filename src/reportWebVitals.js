import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }) {
  // Send to your analytics endpoint
  console.log('Web Vital:', { name, delta, value, id });
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    });
  }
  
  // Check against thresholds
  const thresholds = {
    CLS: 0.1,
    INP: 200,   // Changed from FID
    FCP: 1800,
    LCP: 2500,
    TTFB: 600,
  };
  
  if (value > thresholds[name]) {
    console.warn(`⚠️ ${name} exceeded threshold: ${value}ms (max: ${thresholds[name]}ms)`);
  }
}

export default function reportWebVitals() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);  // Changed from onFID
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}