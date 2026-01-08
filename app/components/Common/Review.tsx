import { Image } from '@shopify/hydrogen';
import React, { useState, useEffect, useRef } from 'react';

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

const ReviewSection = () => {
  const [activeTab, setActiveTab] = useState<'trustpilot' | 'trustshop' | 'google'>('trustpilot');
  
  const trustpilotWidgetRef = useRef<HTMLDivElement>(null);
  const trustpilotReviewsRef = useRef<HTMLDivElement>(null);
  const etrustedWidgetRef = useRef<HTMLDivElement>(null);
  const etrustedReviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="widget.trustpilot.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
    )
  };

  return (
    <section className="bg-[#f6f6f6] py-8">
      <div className="testimonial-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="mt-3 text-p-14 font-light text-primary mb-2 tracking-wider">TESTIMONIALS</p>
          <h2 className="flex capitalize m-0 text-h2 font-bold text-primary my-4 tracking-wider flex justify-center">Our Customers Love Us</h2>
          <p className="mt-3 text-p-14 font-light text-primary mb-2 tracking-wider">More than 10000 happy customers all over Europe</p>
        </div>

         <div className="grid grid-cols-3 gap-4 mb-8 tabs-tite-container border-b border-[#E4E4E4]">
          <div className="text-center">
            <div className={`p-4 cursor-pointer border-b-3 transition-all duration-200 h-full ${
                activeTab === 'trustpilot' ? 'border-[#EF9000]' : 'border-transparent hover:border-[#EF9000]'
              }`}
                onClick={() => setActiveTab('trustpilot')}
            >
              <Image
                src="/assets/images/reviews/trustpilot.png" 
                alt="trustpilot" 
                className="mx-auto mb-2 px-2" 
                width={130}
                height={30}
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
              className={`p-4 cursor-pointer border-b-3 transition-all duration-200 h-full ${
                activeTab === 'trustshop' ? 'border-[#EF9000]' : 'border-transparent hover:border-[#EF9000]'
              }`}
              onClick={() => setActiveTab('trustshop')}
            >
              <Image 
                src="/assets/images/reviews/trusted_shop.png" 
                alt="Trusted Shop Logo" 
                className="mx-auto mb-2 px-2" 
                width={130} 
                height={30} 
              />
              <div className="flex items-center justify-center">
                <div 
                  ref={etrustedWidgetRef}
                  className="pointer-events-none"
                >
                  <p className="text-[14px] leading-[20px] font-light text-[#111111] mb-2 tracking-[0.8px]">
                    Trust Shop 4.9 | 3171 reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div 
              className={`p-4 cursor-pointer border-b-3 transition-all duration-200 ${
                activeTab === 'google' ? 'border-[#EF9000]' : 'border-transparent hover:border-[#EF9000]'
              }`}
              onClick={() => setActiveTab('google')}
            >
              <Image 
                src="/assets/images/reviews/google.png" 
                alt="Google Logo" 
                className="mx-auto mb-2 px-2" 
                width={130} 
                height={30} 
              />
              <div className="flex items-center justify-center">
                <p className="text-[14px] leading-[20px] font-light text-[#111111] mb-2 tracking-[0.8px]">
                  Google 4.9 | 3171 reviews
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
                <h3>Google</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;