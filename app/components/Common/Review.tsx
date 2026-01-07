import React, { useState, useEffect, useRef } from 'react';
import {useNonce} from '@shopify/hydrogen';

// Type definitions
interface GoogleReview {
  rating: string | number;
  text: string;
  author: string;
}

interface ReviewData {
  google_reviews?: GoogleReview[];
  google_total_review?: {
    total_review: number;
    percentage: number;
  };
  trust_shops_total_review?: {
    total_review: number;
    percentage: number;
  };
}

// Chevron icon components
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// Star icon component
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'etrusted-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-etrusted-widget-id'?: string;
      };
    }
  }
}

interface TestimonialsSectionProps {
  googleReviewsData?: ReviewData | null;
}

const TestimonialsSection = ({ googleReviewsData }: TestimonialsSectionProps) => {
  const nonce = useNonce();
  const [activeTab, setActiveTab] = useState<'trustpilot' | 'trustshop' | 'google'>('trustpilot');
  const [scriptsLoaded, setScriptsLoaded] = useState({
    trustpilot: false,
    etrusted: false
  });
  const [reviewsPerSlide, setReviewsPerSlide] = useState(3);
  const googleContainerRef = useRef<HTMLDivElement>(null);
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [totalGoogleReviews, setTotalGoogleReviews] = useState(0);
  const [googleReviewsRating, setGoogleReviewsRating] = useState(0);
  const [totalTrustedShopsReviews, setTotalTrustedShopsReviews] = useState(0);
  const [trustedShopsReviewsRating, setTrustedShopsReviewsRating] = useState(0);

  const scrollGoogle = (offset: number) => {
    if (googleContainerRef.current) {
      googleContainerRef.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  };
  
  const trustpilotWidgetRef = useRef<HTMLDivElement>(null);
  const trustpilotReviewsRef = useRef<HTMLDivElement>(null);
  const etrustedWidgetRef = useRef<HTMLDivElement>(null);
  const etrustedReviewsRef = useRef<HTMLDivElement>(null);
  const widgetsInitialized = useRef({
    trustpilot: false,
    etrusted: false
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setReviewsPerSlide(1);
        } else if (window.innerWidth < 1024) {
          setReviewsPerSlide(2);
        } else {
          setReviewsPerSlide(3);
        }
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Use data from server-side loader
  useEffect(() => {
    if (googleReviewsData) {
      setGoogleReviews(googleReviewsData?.google_reviews || []);
      setTotalGoogleReviews(googleReviewsData?.google_total_review?.total_review || 0);
      setGoogleReviewsRating(googleReviewsData?.google_total_review?.percentage || 0);
      setTotalTrustedShopsReviews(googleReviewsData?.trust_shops_total_review?.total_review || 0);
      setTrustedShopsReviewsRating(googleReviewsData?.trust_shops_total_review?.percentage || 0);
    }
  }, [googleReviewsData]);

  useEffect(() => {
    const loadScripts = () => {
      if (typeof window === 'undefined') return;
      
      // Check if Trustpilot script already exists
      const existingTrustpilotScript = document.querySelector('script[src*="trustpilot.com"]');
      if (!existingTrustpilotScript) {
        // Check if already loaded via window object
        if ((window as any).Trustpilot) {
          setScriptsLoaded(prev => ({ ...prev, trustpilot: true }));
          return;
        }
        
        const trustpilotScript = document.createElement('script');
        trustpilotScript.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
        trustpilotScript.async = true;
        if (nonce) {
          trustpilotScript.setAttribute('nonce', nonce);
        }
        trustpilotScript.onload = () => {
          setScriptsLoaded(prev => ({ ...prev, trustpilot: true }));
        };
        trustpilotScript.onerror = () => {
          console.error('Failed to load Trustpilot script');
        };
        document.head.appendChild(trustpilotScript);
      } else if ((window as any).Trustpilot) {
        // Script exists and is loaded
        setScriptsLoaded(prev => ({ ...prev, trustpilot: true }));
      }
      
      // Check if eTrusted script already exists
      const existingETrustedScript = document.querySelector('script[src*="etrusted.com"]');
      const existingETrustedCSS = document.querySelector('link[href*="etrusted.com"]');
      
      // Load eTrusted CSS if not already loaded
      if (!existingETrustedCSS) {
        const etrustedCSS = document.createElement('link');
        etrustedCSS.rel = 'stylesheet';
        etrustedCSS.href = 'https://integrations.etrusted.com/applications/widget.css/v2';
        etrustedCSS.type = 'text/css';
        document.head.appendChild(etrustedCSS);
      }
      
      if (!existingETrustedScript) {
        // Check if already loaded via window object
        if ((window as any).eTrustedWidget) {
          setScriptsLoaded(prev => ({ ...prev, etrusted: true }));
          return;
        }
        
        const etrustedScript = document.createElement('script');
        etrustedScript.src = 'https://integrations.etrusted.com/applications/widget.js/v2';
        etrustedScript.async = true; // Changed from defer to async for faster loading
        if (nonce) {
          etrustedScript.setAttribute('nonce', nonce);
        }
        etrustedScript.onload = () => {
          // Wait a bit for the widget to register itself
          setTimeout(() => {
            if ((window as any).eTrustedWidget) {
              setScriptsLoaded(prev => ({ ...prev, etrusted: true }));
            } else {
              console.warn('eTrusted script loaded but eTrustedWidget not found on window');
              setScriptsLoaded(prev => ({ ...prev, etrusted: true }));
            }
          }, 100);
        };
        etrustedScript.onerror = () => {
          console.error('Failed to load eTrusted script');
        };
        document.head.appendChild(etrustedScript);
      } else {
        // Script exists, check if widget is available
        if ((window as any).eTrustedWidget) {
          setScriptsLoaded(prev => ({ ...prev, etrusted: true }));
        } else {
          // Script exists but widget not ready yet, wait for it
          const checkWidget = setInterval(() => {
            if ((window as any).eTrustedWidget) {
              setScriptsLoaded(prev => ({ ...prev, etrusted: true }));
              clearInterval(checkWidget);
            }
          }, 100);
          // Stop checking after 5 seconds
          setTimeout(() => clearInterval(checkWidget), 5000);
        }
      }
    };

    loadScripts();
  }, []); // Only run once on mount

  // Initialize Trustpilot widgets
  useEffect(() => {
    if (scriptsLoaded.trustpilot && typeof window !== 'undefined' && (window as any).Trustpilot) {
      const initializeTrustpilot = () => {
        try {
          // Always initialize the widget in the tab header (rating display)
          if (trustpilotWidgetRef.current) {
            (window as any).Trustpilot.loadFromElement(trustpilotWidgetRef.current, true);
          }
          // Initialize/reload the reviews widget when trustpilot tab is active
          if (trustpilotReviewsRef.current) {
            if (activeTab === 'trustpilot') {
              // Force reload when tab becomes active
              (window as any).Trustpilot.loadFromElement(trustpilotReviewsRef.current, true);
            } else {
              // Still initialize even if not active (for pre-loading)
              (window as any).Trustpilot.loadFromElement(trustpilotReviewsRef.current, true);
            }
          }
          widgetsInitialized.current.trustpilot = true;
        } catch (error) {
          console.error('Error initializing Trustpilot widget:', error);
        }
      };

      // Delay to ensure DOM is ready
      const timer = setTimeout(initializeTrustpilot, activeTab === 'trustpilot' ? 400 : 200);
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded.trustpilot, activeTab]);

  // Initialize eTrusted widget when script loads
  useEffect(() => {
    if (scriptsLoaded.etrusted && typeof window !== 'undefined' && (window as any).eTrustedWidget) {
      const initializeETrusted = () => {
        try {
          if ((window as any).eTrustedWidget && (window as any).eTrustedWidget.init) {
            // Initialize globally - the widget should auto-detect custom elements
            (window as any).eTrustedWidget.init();
            widgetsInitialized.current.etrusted = true;
          }
        } catch (error) {
          console.error('Error initializing eTrusted widget:', error);
        }
      };

      const timer = setTimeout(initializeETrusted, 300);
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded.etrusted]);

  // Re-initialize eTrusted widget when trustshop tab becomes active
  useEffect(() => {
    if (activeTab === 'trustshop' && scriptsLoaded.etrusted && typeof window !== 'undefined') {
      const reinitializeETrusted = () => {
        try {
          const widgetElement = etrustedReviewsRef.current?.querySelector('etrusted-widget');
          
          if (widgetElement && (window as any).eTrustedWidget) {
            // Check if widget has already rendered content
            const hasContent = widgetElement.shadowRoot || widgetElement.children.length > 0;
            
            if (!hasContent) {
              // Widget hasn't rendered, try to trigger it
              // Dispatch a custom event to trigger widget initialization
              const event = new CustomEvent('etrusted-widget-init', { bubbles: true });
              widgetElement.dispatchEvent(event);
              
              // Also try global init as fallback
              if ((window as any).eTrustedWidget.init) {
                (window as any).eTrustedWidget.init();
              }
            }
          } else if ((window as any).eTrustedWidget && (window as any).eTrustedWidget.init) {
            // Element not found yet, try global init
            (window as any).eTrustedWidget.init();
          }
        } catch (error) {
          console.error('Error re-initializing eTrusted widget:', error);
        }
      };

      // Wait for tab transition to complete (300ms CSS transition + buffer)
      const timer = setTimeout(reinitializeETrusted, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab, scriptsLoaded.etrusted]);


  const tabContent = {
    trustpilot: (
      <div className="trustpilot-content">
        <div 
          ref={trustpilotReviewsRef}
          className="trustpilot-widget" 
          data-locale="en-GB"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="5982fc490000ff0005a809d7"
          data-style-height="" 
          data-style-width="100%" 
          data-theme="light"
          data-stars="1,2,3,4,5" 
          data-review-languages="en"
        >
          <a
            href="https://uk.trustpilot.com/review/abelini.com"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      </div>
    ),
    trustshop: (
      <div className="trustshop-content">
        <div ref={etrustedReviewsRef}>
          <etrusted-widget
            data-etrusted-widget-id="wdg-673e15ea-7c32-4a80-8a04-a688541a7c6b"
          ></etrusted-widget>
        </div>
      </div>
    ),
    google: (
      <div className="relative">
        <button
          onClick={() => scrollGoogle(-200)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 !bg-black text-white rounded-full p-2 !w-fit"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollGoogle(200)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 !bg-black text-white rounded-full p-2 !w-fit"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={googleContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 px-4 py-6 google-revews-scroll-container"
        >
          {googleReviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 bg-white  p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                {[...Array(parseInt(String(review.rating)))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFA500] text-[#FFA500]" />
                ))}
              </div>
              <p className="title text-center mb-4 line-clamp-4 text-sm tab-title-text">
                {review.text}
              </p>
              <p className="tab-title-text tab-title-text-review">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <section className="bg-[#f6f6f6] py-8">
      <div className="testimonial-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="title mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]">TESTIMONIALS</p>
          <h2 className="select_category flex capitalize m-0 text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] lg:text-[42px] lg:leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px] flex justify-center">Our Customers Love Us</h2>
          <p className="title mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]">More than 10000 happy customers all over Europe</p>
        </div>

         <div className="grid grid-cols-3 lg:gap-4 mb-8 tabs-tite-container border-b border-[#E4E4E4]">
          <div className="text-center">
            <div 
              className={`p-4 cursor-pointer border-b-4 transition-all duration-200 h-[99px] tab-title-wrapper ${
                activeTab === 'trustpilot' ? 'border-[#EF9000]' : 'border-transparent hover:border-gray-200'
              }`}
                onClick={() => setActiveTab('trustpilot')}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/trustpilot_logo.png?v=1739877934" 
                alt="trustpilot" 
                className="mx-auto mb-2 px-2" 
                width="130" 
                height="30" 
              />
              <div className="flex items-center justify-center">
                <div 
                  ref={trustpilotWidgetRef}
                  className="trustpilot-widget pointer-events-none h-[23.5px]" 
                  data-locale="en-GB"
                  data-template-id="5419b6a8b0d04a076446a9ad"
                  data-businessunit-id="5982fc490000ff0005a809d7" 
                  data-style-width="100%"
                  data-theme="light" 
                  data-style-alignment="center"
                >
                  <a href="https://www.trustpilot.com/review/yourdomain.com" target="_blank" rel="noopener">
                    Trustpilot
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div 
              className={`p-4 cursor-pointer border-b-4 transition-all duration-200 h-[99px] tab-title-wrapper ${
                activeTab === 'trustshop' ? 'border-[#EF9000]' : 'border-transparent hover:border-gray-200'
              }`}
              onClick={() => setActiveTab('trustshop')}
            >
              <img 
                src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/trusted_shop_logo.png?v=1739878966" 
                alt="Trusted Shop Logo" 
                className="mx-auto mb-2 px-2" 
                width="130" 
                height="30" 
              />
              <div className="flex items-center justify-center">
                <div 
                  ref={etrustedWidgetRef}
                  className="pointer-events-none"
                >
                  <p className="text-sm tab-title-text">
                    Trust Shop {trustedShopsReviewsRating} | {totalTrustedShopsReviews} reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div 
              className={`p-4 cursor-pointer border-b-4 transition-all duration-200 h-[99px] tab-title-wrapper ${
                activeTab === 'google' ? 'border-[#EF9000]' : 'border-transparent hover:border-gray-200'
              }`}
              onClick={() => setActiveTab('google')}
            >
              <img 
                src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/google_logo.png?v=1739878966" 
                alt="Google Logo" 
                className="mx-auto mb-2 px-2" 
                width="130" 
                height="30" 
              />
              <div className="flex items-center justify-center">
                <p className="text-sm block tab-title-text">
                  Google {googleReviewsRating} | {totalGoogleReviews} reviews
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out w-full"
              style={{ transform: `translateX(-${activeTab === 'trustpilot' ? 0 : activeTab === 'trustshop' ? 100 : 200}%)` }}
            >
              <div className="w-full flex-shrink-0 px-1">
                {tabContent.trustpilot}
              </div>
              <div className="w-full flex-shrink-0 px-1">
                {tabContent.trustshop}
              </div>
              <div className="w-full flex-shrink-0 px-1">
                {tabContent.google}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;