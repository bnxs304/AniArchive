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
      referrer: document.referrer
    };

    this.logEvent('page_view', pageData);
  }

  trackUserInteractions() {
    // Track social media clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-analytics="social"]')) {
        this.logEvent('social_click', {
          timestamp: new Date().toISOString(),
          platform: e.target.closest('[data-analytics="social"]').dataset.platform
        });
      }
    });

    // Track past event clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.past-event-item')) {
        this.logEvent('past_event_click', {
          timestamp: new Date().toISOString(),
          eventTitle: e.target.closest('.past-event-item').querySelector('img')?.alt
        });
      }
    });

    // Track ticket link clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-analytics="ticket"]')) {
        this.logEvent('ticket_click', {
          timestamp: new Date().toISOString(),
          element: e.target.textContent
        });
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
}

// Initialize analytics
const analytics = new Analytics();

export default analytics; 