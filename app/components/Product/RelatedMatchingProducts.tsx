import { Image } from '@shopify/hydrogen';
import { useRef } from 'react';
import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  zoomImage?: string;
  href: string;
};

function ProductCard({ product }: { product: any }) {
  return (
    // Outer wrapper: Full width on mobile/tablet (centers content), normal behavior on desktop (lg)
    <div className="min-w-full lg:min-w-[278px] lg:w-[278px] snap-center flex justify-center lg:block px-1 lg:px-0">
      
      {/* Inner Card: Fixed dimensions on mobile/tablet, Auto height on desktop (stack layout) */}
      <div className="w-[280px] min-w-[280px] h-[360px] lg:w-[278px] lg:h-auto lg:min-w-[278px] lg:min-h-0 bg-white overflow-hidden relative group-hover:transition-none">
        
        <a href={product.href} className="relative block h-full lg:h-auto">
          <div className="h-full w-full lg:h-auto flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover block lg:hidden"
                loading="lazy"
                height={360}
                width={280}
              />
              <Image
                src={product.image}
                alt={product.name}
                className="w-[278px] h-[278px] object-cover hidden lg:block"
                loading="lazy"
                height={278}
                width={278}
              />
          </div>

          {product.zoomImage && (
            <div className="absolute bottom-[100px] left-1 w-20 h-20 rounded-full overflow-hidden"> 
              {/* Adjusted bottom position based on new height */}
              <img
                src={product.zoomImage}
                alt="Zoom"
                className="absolute top-0 left-0 w-full scale-200 origin-top"
                loading="lazy"
              />
            </div>
          )}

          <div className="p-2 text-center absolute bottom-0 lg:static w-full bg-white lg:bg-transparent h-[100px] lg:h-auto flex flex-col justify-center">
              {/* Fixed height on mobile, auto on desktop */}
            <p className="text-[12px] leading-[18px] lg:tracking-wide text-[#575757] line-clamp-2 py-4 lg:py-0">
              {product.name}
            </p>
            <p className="text-[14px] font-medium text-black mt-1">
              From {product.price}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

const tabs = ['Related Product', 'Matching Product'];

export default function RelatedMatchingProducts({
  relatedProducts,
  matchingProducts,
}: {
  relatedProducts: Product[];
  matchingProducts: Product[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const products = activeTab === 0 ? relatedProducts : matchingProducts;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 1024; // Changed to lg (1024px)
      const scrollAmount = isMobile 
        ? scrollRef.current.clientWidth 
        : scrollRef.current.clientWidth / 2;
        
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-6 ">
      <div className="max-w-[1140px] mx-auto px-4">
        {/* Tabs */}
        <div className="grid grid-cols-12 mb-6">
          {/* Tabs container: centered (col 5 → col 8) */}
          <div className="md:col-span-6 md:col-start-4 flex justify-center col-span-12 ">
            <div className="flex w-full max-w-md">
              {tabs.map((tab, i) => {
                const isActive = activeTab === i;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`
                      flex-1
                      cursor-pointer
                      px-6
                      py-2
                      transition-all
                      font-normal
                      ${
                        isActive
                          ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000] text-[#111]'
                          : 'bg-[#f4f4f4] border-b-2 text-[#575757] border-b-[#cfcfcf]'
                      }
                      ${i === 0 ? 'rounded-tl-[14px]' : 'rounded-tr-[14px]'}
                    `}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#111] text-white cursor-pointer transition-all max-lg:-left-2"
            aria-label="Previous"
          >
             <span className="flex items-center justify-center rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" style={{ fontSize: '22px' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" className="iconify" data-icon="entypo:chevron-thin-right" data-inline="false"><path fill="currentColor" d="M13.25 10L6.109 2.58a.697.697 0 0 1 0-.979a.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0a.697.697 0 0 1 0-.979z"></path></svg>
             </span>
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-0 lg:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#111] shadow-md text-white cursor-pointer transition-all max-lg:-right-2"
            aria-label="Next"
          >
            <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" style={{ fontSize: '22px' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" className="iconify" data-icon="entypo:chevron-thin-right" data-inline="false"><path fill="currentColor" d="M13.25 10L6.109 2.58a.697.697 0 0 1 0-.979a.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0a.697.697 0 0 1 0-.979z"></path></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
