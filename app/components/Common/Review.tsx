import { Image } from '@shopify/hydrogen';
import React, { useState, useEffect, useRef } from 'react';
import {Script} from '@shopify/hydrogen';
import {useLoaderData} from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import type { SwaggerReviewResponse } from '~/services/swagger.server';

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

const Review = () => {
  const [activeTab, setActiveTab] = useState<'trustpilot' | 'trustshop' | 'google'>('trustpilot');

  const trustpilotWidgetRef = useRef<HTMLDivElement>(null);
  const trustpilotReviewsRef = useRef<HTMLDivElement>(null);
  const etrustedWidgetRef = useRef<HTMLDivElement>(null);
  const etrustedReviewsRef = useRef<HTMLDivElement>(null);

  const { reviewsData } = useLoaderData<{ reviewsData: SwaggerReviewResponse }>();

  const [emblaRef, emblaApi] = useEmblaCarousel({loop: false});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const hasInitializedEmbla = useRef(false);

  useEffect(() => {
    if (!emblaApi || hasInitializedEmbla.current) return;

    hasInitializedEmbla.current = true;

    const snaps = emblaApi.scrollSnapList?.() ?? [];
    const index = emblaApi.selectedScrollSnap?.() ?? 0;

    setScrollSnaps(snaps);
    setSelectedIndex(index);

    emblaApi.on?.('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap?.() ?? 0);
    });

    emblaApi.on?.('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList?.() ?? []);
      setSelectedIndex(emblaApi.selectedScrollSnap?.() ?? 0);
    });
  }, [emblaApi]);

  return (
    <section className="bg-[#f6f6f6] px-4 py-8 flex justify-center">
      <Script 
        async 
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" 
      />
      <Script
        async
        src="https://integrations.etrusted.com/applications/widget.js/v2"
        type="text/javascript"
      />

      <div className="container">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-full text-center px-[10px]">
            <p className="text-[14px] font-light text-[#111111] leading-[20px] mb-2 tracking-[0.8px] uppercase mt-6">TESTIMONIALS</p>
            <h2 className="font-bold tracking-[1px] text-[34px] leading-[38px] lg:text-[42px] lg:leading-[48px] mt-3">Our Customers Love Us</h2>
            <p className="text-[14px] font-normal leading-[28px] tracking-[1px] text-[#111] lg:font-light lg:leading-[20px] lg:tracking-[0.8px] lg:mb-2 mt-3">More than 10000 happy customers all over Europe</p>
          </div>
        </div>
         <div className="grid grid-cols-3 lg:gap-4 gap-2 mb-8 tabs-tite-container border-b border-[#E4E4E4]" role="tablist">
          <div className="flex items-center justify-center">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'trustpilot'}
              aria-controls="trustpilot-tabpanel"
              id="trustpilot-tab"
              className={`overflow-hidden lg:px-4 lg:py-2 min-h-[90px] border-b-5 transition-all duration-200 h-full flex flex-col lg:block ${
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
                  <a href="https://uk.trustpilot.com/review/abelini.com" target="_blank" rel="noopener">
                    Trustpilot
                  </a>
                </div>
              </div>
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'trustshop'}
              aria-controls="trustshop-tabpanel"
              id="trustshop-tab"
              className={`overflow-hidden lg:px-4 lg:py-2 min-h-[90px] border-b-5 transition-all duration-200 h-full ${
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
                  <p className="text-[13px] font-normal leading-5 tracking-[0.8px] text-[#111] mb-2 lg:text-[14px] lg:font-light lg:mb-0 lg:tracking-[0.8px]">
                    Trust Shop {reviewsData?.trust_shops_total_review?.percentage}
                    <span className="lg:hidden"><br /></span>
                    <span className="hidden lg:inline"> | </span>
                    {reviewsData?.trust_shops_total_review?.total_review} reviews
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'google'}
              aria-controls="google-tabpanel"
              id="google-tab"
              className={`overflow-hidden lg:px-4 lg:py-2 min-h-[90px] border-b-5 transition-all duration-200 h-full ${
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
                <p className="text-[13px] font-normal leading-5 tracking-[0.8px] text-[#111] mb-2 lg:text-[14px] lg:font-light lg:mb-0 lg:tracking-[0.8px]">
                  Google {reviewsData?.google_total_review?.percentage}
                  <span className="lg:hidden"><br /></span>
                  <span className="hidden lg:inline"> | </span>
                  {reviewsData?.google_total_review?.total_review} reviews
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out w-full"
              style={{ transform: `translateX(-${activeTab === 'trustpilot' ? 0 : activeTab === 'trustshop' ? 100 : 200}%)` }}
            >
              <div 
                id="trustpilot-tabpanel"
                role="tabpanel"
                aria-labelledby="trustpilot-tab"
                className="w-full flex-shrink-0 px-1"
              >
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
              </div>
              <div 
                id="trustshop-tabpanel"
                role="tabpanel"
                aria-labelledby="trustshop-tab"
                className="w-full flex-shrink-0 px-1"
              >
                <div className="trustshop-content">
                  <div ref={etrustedReviewsRef}>
                    <etrusted-widget
                      data-etrusted-widget-id="wdg-673e15ea-7c32-4a80-8a04-a688541a7c6b"
                    ></etrusted-widget>
                  </div>
                </div>
              </div>
              <div 
                id="google-tabpanel"
                role="tabpanel"
                aria-labelledby="google-tab"
                className="w-full flex-shrink-0 px-1"
              >
                <div 
                  className="w-full relative overflow-hidden flex justify-center"
                  ref={emblaRef}
                >
                  <div
                    className="flex lg:w-[calc(100%-120px)] w-full mx-auto gap-4"
                    // className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 px-4 py-8 google-revews-scroll-container"
                  >
                    {reviewsData?.google_reviews.map((review, i) => (
                      <div
                        key={review.review_id}
                        /* Combined s-item-new and s-item-2 logic:
                          - w-[320px] h-[300px]: Fixed dimensions from your CSS
                          - border-black/10: Mapping rgba(0,0,0,.1)
                          - transition-all duration-1000: Mapping transition: height 1s
                        */
                        className="flex-shrink-0 w-[320px] h-[300px] bg-white p-12 
                                  cursor-pointer relative transition-all duration-1000 
                                  border-[0.05em] border-black/10 rounded-[0.2em] 
                                  text-center flex flex-col justify-between hover:shadow-md"
                      >
                        <div className="text-center relative overflow-hidden flex flex-col">
                          {/* Star Rating Section */}
                          <div className="flex justify-center mt-3 gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Image 
                                key={`${review.review_id}-star-${index}`}
                                src="/assets/images/icons/star.svg" 
                                alt="Star" 
                                className="!w-5"
                              />
                            ))}
                          </div>
                          <p className="text-[14px] text-black font-bold my-4 text-xl capitalize"></p>
                          <p className="text-[14px] font-light text-[#111] leading-[20px] tracking-[0.8px] mb-2 line-clamp-4">
                            {review.text}
                          </p>
                          {/* Author Text */}
                          <p className="text-[12px] font-medium tracking-widest text-[#626262] mt-auto">
                            {review.author}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={scrollPrev}
                    disabled={selectedIndex === 0}
                    aria-label="Previous"
                    className="absolute left-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none w-fit disabled:opacity-50 disabled:cursor-not-allowed p-3"
                  >
                    <Image
                      src="/assets/images/icons/arrow-left-white.svg"
                      alt="Previous"
                      className="lg:block hidden"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/assets/images/icons/arrow-left-black.svg"
                      alt="Previous"
                      className="lg:hidden block"
                      width={24}
                      height={24}
                    />
                  </button>

                  <button
                    onClick={scrollNext}
                    disabled={selectedIndex === scrollSnaps.length - 1}
                    aria-label="Next"
                    className="absolute right-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none w-fit disabled:opacity-50 disabled:cursor-not-allowed p-3"
                  >
                    <Image
                      src="/assets/images/icons/arrow-right-white.svg"
                      alt="Next"
                      className="lg:block hidden"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/assets/images/icons/arrow-right-black.svg"
                      alt="Next"
                      className="lg:hidden block"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;