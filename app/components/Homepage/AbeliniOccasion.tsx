import { useState, useEffect, useRef } from "react"
import { Image } from '@shopify/hydrogen'
import { Link } from 'react-router'

// Chevron icon components
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const rings = [
  {
    name: "Solitaire",
    href: "engagement-rings/classic-solitaire",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/solitaire_320x300.avif?v=1750486364",
  },
  {
    name: "Side Stone",
    href: "engagement-rings/side-stone-shoulder-set-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/side_stone_320x300.avif?v=1750486364",
  },
  {
    name: "Halo",
    href: "engagement-rings/halo-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/halo_320x300.avif?v=1750486365",
  },
  {
    name: "Trilogy",
    href: "engagement-rings/three-stone",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/trilogy_320x300.avif?v=1750486364",
  },
  {
    name: "Vintage",
    href: "engagement-rings/vintage-engagement-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/vintage_320x300.avif?v=1750486364",
  },
  {
    name: "Ruby",
    href: "engagement-rings/ruby",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/ruby_320x300.avif?v=1750486364",
  },
  {
    name: "Emerald",
    href: "engagement-rings/emeralds",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/emerald_320x300.avif?v=1750486374",
  },
  {
    name: "Oval",
    href: "engagement-rings/oval",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/oval_320x300.avif?v=1750486459",
  },
  {
    name: "Blue Sapphire",
    href: "engagement-rings/blue-sapphire",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/blue_sapphire_320x300.avif?v=1750486364",
  },
  {
    name: "Engagement Rings",
    href: "engagement-rings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/solitaire_320x300.avif?v=1750486364",
  },
  {
    name: "Eternity Rings",
    href: "diamond-rings/eternity-rings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/eternity_product.avif?v=1750486896",
  },
  {
    name: "Pendant",
    href: "pendants/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/pendant.avif?v=1750486906",
  },
  {
    name: "Earrings",
    href: "earrings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/earring.avif?v=1750486896",
  },
  {
    name: "Bracelets",
    href: "bracelets/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bracelet.avif?v=1750486897",
  },
]


const labGrownDiamonds = [
  {
    name: "Solitaire",
    href: "engagement-rings/classic-solitaire",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/solitaire_320x300.avif?v=1750486364",
  },
  {
    name: "Side Stone",
    href: "engagement-rings/side-stone-shoulder-set-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/side_stone_320x300.avif?v=1750486364",
  },
  {
    name: "Halo",
    href: "engagement-rings/halo-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/halo_320x300.avif?v=1750486365",
  },
  {
    name: "Trilogy",
    href: "engagement-rings/three-stone",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/trilogy_320x300.avif?v=1750486364",
  },
  {
    name: "Vintage",
    href: "engagement-rings/vintage-engagement-rings",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/vintage_320x300.avif?v=1750486364",
  },
  {
    name: "Ruby",
    href: "engagement-rings/ruby",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/ruby_320x300.avif?v=1750486364",
  },
  {
    name: "Emerald",
    href: "engagement-rings/emeralds",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/emerald_320x300.avif?v=1750486374",
  },
  {
    name: "Oval",
    href: "engagement-rings/oval",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/oval_320x300.avif?v=1750486459",
  },
  {
    name: "Blue Sapphire",
    href: "engagement-rings/blue-sapphire",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/blue_sapphire_320x300.avif?v=1750486364",
  },
  {
    name: "Engagement Rings",
    href: "engagement-rings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/solitaire_320x300.avif?v=1750486364",
  },
  {
    name: "Eternity Rings",
    href: "diamond-rings/eternity-rings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/eternity_product.avif?v=1750486896",
  },
  {
    name: "Pendant",
    href: "pendants/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/pendant.avif?v=1750486906",
  },
  {
    name: "Earrings",
    href: "earrings/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/earring.avif?v=1750486896",
  },
  {
    name: "Bracelets",
    href: "bracelets/lab-grown-diamond",
    img: "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bracelet.avif?v=1750486897",
  },
]

export default function ImageWithProductSlider() {
  // First carousel state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Second carousel state
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [slidesToShow2, setSlidesToShow2] = useState(4)
  const sliderRef2 = useRef<HTMLDivElement>(null)

  // Responsive slides calculation for first carousel
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setSlidesToShow(4)
        setSlidesToShow2(4)
      } else if (width >= 768) {
        setSlidesToShow(3)
        setSlidesToShow2(3)
      } else if (width >= 480) {
        setSlidesToShow(2)
        setSlidesToShow2(2)
      } else {
        setSlidesToShow(2)
        setSlidesToShow2(2)
      }
    }

    updateSlidesToShow()
    window.addEventListener('resize', updateSlidesToShow)
    return () => window.removeEventListener('resize', updateSlidesToShow)
  }, [])

  // Adjust currentIndex when slidesToShow changes for first carousel
  useEffect(() => {
    const maxIndex = Math.max(0, rings.length - slidesToShow)
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [slidesToShow, currentIndex])

  // Adjust currentIndex2 when slidesToShow2 changes for second carousel
  useEffect(() => {
    const maxIndex = Math.max(0, rings.length - slidesToShow2)
    if (currentIndex2 > maxIndex) {
      setCurrentIndex2(maxIndex)
    }
  }, [slidesToShow2, currentIndex2])

  // First carousel calculations
  const maxIndex = Math.max(0, rings.length - slidesToShow)
  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < maxIndex

  const scrollPrev = () => {
    if (canScrollPrev) {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    }
  }

  const scrollNext = () => {
    if (canScrollNext) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    }
  }

  // Second carousel calculations
  const maxIndex2 = Math.max(0, rings.length - slidesToShow2)
  const canScrollPrev2 = currentIndex2 > 0
  const canScrollNext2 = currentIndex2 < maxIndex2

  const scrollPrev2 = () => {
    if (canScrollPrev2) {
      setCurrentIndex2(prev => Math.max(0, prev - 1))
    }
  }

  const scrollNext2 = () => {
    if (canScrollNext2) {
      setCurrentIndex2(prev => Math.min(maxIndex2, prev + 1))
    }
  }

  return (
    <div className="w-full bg-white pt-[40px]">
      <div className="text-center py-8">
        <p className="mt-3 text-[14px] leading-[20px] font-light text-[#111111] mb-2 tracking-[0.8px]">OUR JEWELLERY</p>
        <h2 className="flex capitalize m-0 text-[42px] leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px] flex justify-center">
          Abelini For
          <br />
          Any Occasion
        </h2>
      </div>

      <div className="grid grid-cols-1 flex lg:grid flex-col lg:grid-cols-2 min-h-[600px]">
        <div className=" flex flex-col items-start mt-[-40px] justify-between lg:mt-[80px]">
          <div className="relative lg:min-w-[560px] min-h-[700px] lg:min-h-[unset] w-[90%] lg:min-w-[unset] bg-[#f7ede3] lg:ml-[60px]  mx-auto lg:w-[100%] z-50">
            <div className="w-full">
              <Image
                src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/most_loved_engagement_1_1410x666.avif?v=1750480436"
                alt="Engagement Rings"
                className="w-full h-auto object-cover hidden lg:block"
                loading="lazy"
              />
              <Image
                src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/most_loved_engagement_mobile_1_450x560.avif?v=1750480446"
                alt="Engagement Rings"
                className="w-full h-auto object-cover lg:hidden block"
                loading="lazy"
              />
              
            </div>

            <div className="absolute lg:top-1/2 bottom-[0] lg:bottom-[unset] lg:right-0 lg:transform mt-auto lg:-translate-y-1/2 max-w-md p-20 min-w-[100%] lg:min-w-[unset]">
                <h3 className="text-[30px] font-bold text-[#111111] leading-[38px] my-4 tracking-[1px]">
                Most Loved
                <br />
                Engagement Rings
                </h3>

                <p className="text-[13px] leading-[20px] font-light text-[#111111] mb-8 tracking-[0.8px]">
                Our engagement ring collection includes meticulously crafted, elegant rings that symbolize love and
                commitment. From classic solitaires to intricate halos and vintage-inspired pieces are made using
                high-quality materials like platinum, gold, diamonds and gemstones.
                </p>

                <Link to="engagement-rings" className="btn-transparent">
                  <span>
                    Engagement Rings
                  </span>
                </Link>
            </div>
          </div>
          
          <div className="w-[100%] lg:py-12 py-2 relative lg:ml-[60px]">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute lg:left-[10px] left-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none lg:p-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="stroke-[#333] w-8 h-8 lg:stroke-white" />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute lg:right-[10px] right-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none lg:p-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="stroke-[#333] w-8 h-8 lg:stroke-white" />
            </button>
            
            <div className="max-w-7xl mx-auto lg:px-4">
              <div className="relative w-[90%] mx-auto overflow-hidden">
                <div 
                  ref={sliderRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
                  }}
                >
                  {rings.map((ring, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 px-2"
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
                      <Link to={ring.href} className="group text-center block">
                        <div className="bg-white mb-3 imageWithProductSlider-slider-card">
                          <Image
                            src={ring.img || '/placeholder.svg'}
                            alt={ring.name}
                            width={120}
                            height={120}
                            className="w-[160px] h-auto max-w-none max-h-none object-contain mx-auto"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111]">{ring.name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>



          </div>
        </div>

        <div className="relative overflow-hidden order-[-1] lg:order-[0]">
          <Image src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/young_woman_709x551.avif?v=1750480684" loading="lazy" alt="Model wearing jewelry" className="object-cover w-[100%] h-[100%]" />
        </div>
      </div>

      <div className="w-full bg-white pt-[40px]"> 
        <div className="grid grid-cols-1 flex lg:grid flex-col lg:grid-cols-2 min-h-[600px] my-3 mx-3">
          <div className="relative overflow-hidden order-[-1] lg:order-[0]">
            <Image src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/young_blonde_woman_707x551.avif?v=1750484246" loading="lazy" alt="Model wearing jewelry" className="object-cover w-[100%] h-[100%]" width={707} height={551} />
          </div>
          <div className=" flex flex-col items-start mt-[-40px] justify-between lg:mt-[80px]">
            <div className="relative lg:min-w-[560px] min-h-[700px] lg:min-h-[unset] w-[90%] lg:min-w-[unset] bg-[#f7ede3] lg:ml-[-60px]  mx-auto lg:w-[100%] z-50">
              <div className="w-full">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/plain_wedding_rings_1_1410x666.avif?v=1750484743"
                  alt="Engagement Rings"
                  className="w-full h-auto object-cover hidden lg:block"
                  loading="lazy"
                />
                <Image
                  src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/plain_wedding_rings_mobile_1_450x560.avif?v=1750484733"
                  alt="Engagement Rings"
                  className="w-full h-auto object-cover lg:hidden block"
                  loading="lazy"
                />
                
              </div>

              <div className="absolute lg:top-1/2 bottom-[0] lg:bottom-[unset] lg:left-0 lg:transform mt-auto lg:-translate-y-1/2 max-w-md min-w-[100%] lg:min-w-[unset] lg:px-[60px]">
                <h3 className="text-[30px] font-bold text-[#111111] leading-[38px] my-4 tracking-[1px] flex justify-left">In Trend
                <br />Lab Grown Diamonds</h3>

                <p className="text-[13px] leading-[20px] font-light text-[#111111] mb-8 tracking-[0.8px]">Embrace Brilliant Savings with Trending Lab Grown Diamond Jewellery! Enjoy the allure of natural diamonds at a fraction of the cost. Our collection offers captivating beauty, allowing you to achieve a bigger, impressive look.</p>

                <Link to="lab-grown-diamonds" className="btn-transparent">
                  <span>
                    Lab Grown Diamonds
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="w-[100%] lg:py-12 py-2 relative lg:ml-[-60px]">
              <button
                onClick={scrollPrev2}
                disabled={!canScrollPrev2}
                className="absolute lg:left-[10px] left-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none lg:p-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="stroke-[#333] w-8 h-8 lg:stroke-white" />
              </button>

              <button
                onClick={scrollNext2}
                disabled={!canScrollNext2}
                className="absolute lg:right-[10px] right-[0] top-1/2 -translate-y-1/2 z-10 bg-transparent lg:bg-[#111111] rounded-full lg:rounded-none lg:p-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="stroke-[#333] w-8 h-8 lg:stroke-white" />
              </button>
              
              <div className="max-w-7xl mx-auto lg:px-4">
                <div className="relative w-[90%] mx-auto overflow-hidden">
                  <div 
                    ref={sliderRef2}
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex2 * (100 / slidesToShow2)}%)`
                    }}
                  >
                    {labGrownDiamonds.map((ring, index) => (
                      <div 
                        key={index} 
                        className="flex-shrink-0 px-2"
                        style={{ width: `${100 / slidesToShow2}%` }}
                      >
                        <Link to={ring.href} className="group text-center block">
                          <div className="bg-white mb-3 imageWithProductSlider-slider-card">
                            <Image
                              src={ring.img || '/placeholder.svg'}
                              alt={ring.name}
                              width={120}
                              height={120}
                              className="w-[160px] h-auto max-w-none max-h-none object-contain mx-auto"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111]">{ring.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}