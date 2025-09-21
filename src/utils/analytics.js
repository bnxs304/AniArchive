// Analytics utility for AniArchive
// This file provides basic analytics tracking for SEO and user experience monitoring

class Analytics {
  constructor() {
    this.events = [];
    this.init();
  }

  init() {
    // Track page views
    this.trackPageView();
    
    // Track user interactions
    this.trackUserInteractions();
    
    // Track performance metrics
    this.trackPerformance();
  }

  trackPageView() {
    const pageData = {
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      subdomain: this.getCurrentSubdomain(),
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screen: {
        width: screen.width,
        height: screen.height
      },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    this.logEvent('page_view', pageData);
    
    // Enhanced Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-6MQTHHG2LR', {
        page_title: pageData.title,
        page_location: pageData.url,
        custom_map: {
          'custom_parameter_1': 'subdomain',
          'custom_parameter_2': 'event_city'
        }
      });
      
      gtag('event', 'page_view', {
        page_title: pageData.title,
        page_location: pageData.url,
        subdomain: pageData.subdomain,
        event_city: pageData.subdomain || 'main'
      });
    }
  }

  trackUserInteractions() {
    // Track social media clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-analytics="social"]')) {
        const platform = e.target.closest('[data-analytics="social"]').dataset.platform
        this.logEvent('social_click', {
          timestamp: new Date().toISOString(),
          platform: platform,
          subdomain: this.getCurrentSubdomain()
        });
        
        // Google Analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'social_click', {
            social_network: platform,
            event_city: this.getCurrentSubdomain() || 'main'
          });
        }
      }
    });

    // Track past event clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.past-event-item')) {
        const eventTitle = e.target.closest('.past-event-item').querySelector('img')?.alt
        this.logEvent('past_event_click', {
          timestamp: new Date().toISOString(),
          eventTitle: eventTitle,
          subdomain: this.getCurrentSubdomain()
        });
        
        // Google Analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'past_event_click', {
            event_title: eventTitle,
            event_city: this.getCurrentSubdomain() || 'main'
          });
        }
      }
    });

    // Track ticket link clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-analytics="ticket"]')) {
        const element = e.target.textContent
        this.logEvent('ticket_click', {
          timestamp: new Date().toISOString(),
          element: element,
          subdomain: this.getCurrentSubdomain()
        });
        
        // Google Analytics conversion event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'ticket_click', {
            event_category: 'conversion',
            event_label: element,
            event_city: this.getCurrentSubdomain() || 'main',
            value: 1
          });
        }
      }
    });

    // Track subdomain navigation
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-analytics="subdomain-nav"]')) {
        const targetCity = e.target.closest('[data-analytics="subdomain-nav"]').dataset.city
        this.logEvent('subdomain_navigation', {
          timestamp: new Date().toISOString(),
          from_subdomain: this.getCurrentSubdomain(),
          to_city: targetCity
        });
        
        // Google Analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'subdomain_navigation', {
            from_city: this.getCurrentSubdomain() || 'main',
            to_city: targetCity
          });
        }
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.closest('[data-analytics="form"]')) {
        const formType = e.target.closest('[data-analytics="form"]').dataset.formType
        this.logEvent('form_submission', {
          timestamp: new Date().toISOString(),
          form_type: formType,
          subdomain: this.getCurrentSubdomain()
        });
        
        // Google Analytics conversion event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            event_category: 'conversion',
            event_label: formType,
            event_city: this.getCurrentSubdomain() || 'main',
            value: 1
          });
        }
      }
    });
  }

  trackPerformance() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.logEvent('lcp', {
          value: lastEntry.startTime,
          timestamp: new Date().toISOString()
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.logEvent('fid', {
            value: entry.processingStart - entry.startTime,
            timestamp: new Date().toISOString()
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.logEvent('cls', {
          value: clsValue,
          timestamp: new Date().toISOString()
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.logEvent('page_load_time', {
        value: loadTime,
        timestamp: new Date().toISOString()
      });
    });
  }

  logEvent(eventName, data) {
    const event = {
      event: eventName,
      data: data,
      timestamp: new Date().toISOString()
    };

    this.events.push(event);
    
    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Send to analytics service (implement as needed)
    this.sendToAnalytics(event);
  }

  sendToAnalytics(event) {
    // Implement your analytics service here
    // Examples: Google Analytics, Mixpanel, etc.
    
    // For now, we'll just store in localStorage for demo purposes
    try {
      const existingEvents = JSON.parse(localStorage.getItem('aniarchive_analytics') || '[]');
      existingEvents.push(event);
      localStorage.setItem('aniarchive_analytics', JSON.stringify(existingEvents));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  getEvents() {
    return this.events;
  }

  getStoredEvents() {
    try {
      return JSON.parse(localStorage.getItem('aniarchive_analytics') || '[]');
    } catch (error) {
      console.error('Failed to retrieve stored events:', error);
      return [];
    }
  }

  clearStoredEvents() {
    localStorage.removeItem('aniarchive_analytics');
  }

  getCurrentSubdomain() {
    if (typeof window === 'undefined') return null
    
    const hostname = window.location.hostname
    
    // Handle localhost development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const port = window.location.port
      if (port === '3001') return 'coventry'
      if (port === '3002') return 'birmingham'
      if (port === '3003') return 'london'
      if (port === '3004') return 'manchester'
      if (port === '3005' || port === '3006') return 'leicester'
      return null
    }
    
    // Handle production subdomains
    const parts = hostname.split('.')
    if (parts.length >= 3) {
      const subdomain = parts[0]
      return subdomain !== 'www' ? subdomain : null
    }
    
    return null
  }
}

// Initialize analytics
const analytics = new Analytics();

export default analytics; 