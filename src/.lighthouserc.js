module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/entreprise',
        'http://localhost:5173/data-processing',
        'http://localhost:5173/control-access',
        'http://localhost:5173/bureau-etude',
        'http://localhost:5173/sav',
        'http://localhost:5173/contact',
        'http://localhost:5173/blog',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.90 }],
        
        // Performance budgets
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Image optimization
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'modern-image-formats': 'warn',
        
        // Code optimization
        'unused-javascript': 'warn',
        'unused-css-rules': 'warn',
        
        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'button-name': 'error',
        'link-name': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};