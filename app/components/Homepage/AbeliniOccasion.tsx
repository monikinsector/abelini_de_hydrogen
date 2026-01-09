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
    img: "/assets/images/home/category/solitaire_320x300.webp",
  },
  {
    name: "Side Stone",
    href: "engagement-rings/side-stone-shoulder-set-rings",
    img: "/assets/images/home/category/side_stone_320x300.webp",
  },
  {
    name: "Halo",
    href: "engagement-rings/halo-rings",
    img: "/assets/images/home/category/halo_320x300.webp",
  },
  {
    name: "Trilogy",
    href: "engagement-rings/three-stone",
    img: "/assets/images/home/category/trilogy_320x300.webp",
  },
  {
    name: "Vintage",
    href: "engagement-rings/vintage-engagement-rings",
    img: "/assets/images/home/category/vintage_320x300.webp",
  },
  {
    name: "Ruby",
    href: "engagement-rings/ruby",
    img: "/assets/images/home/category/ruby_320x300.webp",
  },
  {
    name: "Emerald",
    href: "engagement-rings/emeralds",
    img: "/assets/images/home/category/emerald_320x300.webp",
  },
  {
    name: "Oval",
    href: "engagement-rings/oval",
    img: "/assets/images/home/category/oval_320x300.jpeg",
  },
  {
    name: "Blue Sapphire",
    href: "engagement-rings/blue-sapphire",
    img: "/assets/images/home/category/blue_sapphire_320x300.webp",
  },
]


const labGrownDiamonds = [
  {
    name: "Engagement Rings",
    href: "engagement-rings/lab-grown-diamond",
    img: "/assets/images/home/category/solitaire_320x300.webp",
  },
  {
    name: "Eternity Rings",
    href: "diamond-rings/eternity-rings/lab-grown-diamond",
    img: "/assets/images/home/category/eternity_product.webp",
  },
  {
    name: "Pendant",
    href: "pendants/lab-grown-diamond",
    img: "/assets/images/home/category/pendant.webp",
  },
  {
    name: "Earrings",
    href: "earrings/lab-grown-diamond",
    img: "/assets/images/home/category/earring.webp",
  },
  {
    name: "Bracelets",
    href: "bracelets/lab-grown-diamond",
    img: "/assets/images/home/category/bracelet.webp",
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
    <section className="flex flex-col">
    <div className="flex flex-col container-fluid my-6">
        <div className="text-center my-6">
          <p className="mb-3 text-p-14 font-light text-primary tracking-wider">OUR JEWELLERY</p>
          <h2 className="lg:text-h2 text-h2-m lg:leading-h2 leading-h2-m font-bold text-primary mb-3 tracking-wider">
            Abelini For
            <br />
            Any Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 flex flex-col lg:grid-cols-2 min-h-[600px]">
          <div className="col-span-1 flex flex-col items-start mt-[-40px] justify-between lg:mt-[80px]">
            <div className="relative lg:ml-[60px] w-[100%] z-50 px-4">
              <div className="w-full">
                <Image
                  src="/assets/images/home/most_loved_engagement_1_1410x666.webp"
                  alt="Engagement Rings"
                  className="w-full h-auto object-cover hidden lg:block"
                />
                <Image
                  src="/assets/images/mobile/home/most_loved_engagement_mobile_1-450x660.webp"
                  alt="Engagement Rings"
                  className="object-cover lg:hidden block "
                />
              </div>
              <div className="absolute lg:top-1/2 lg:w-[50%] lg:-translate-y-1/2 lg:mr-[60px] lg:bottom-[unset] bottom-0 right-0 w-full lg:p-0 p-8">
                  <h3 className="lg:text-h3 text-h3-m lg:leading-h3 leading-h3-m font-bold text-primary mb-3 tracking-wider">
                  Most Loved
                  <br />
                  Engagement Rings
                  </h3>

                  <p className="text-p-14 font-light text-primary mb-6 tracking-wider">
                  Our engagement ring collection includes meticulously crafted, elegant rings that symbolize love and
                  commitment. From classic solitaires to intricate halos and vintage-inspired pieces are made using
                  high-quality materials like platinum, gold, diamonds and gemstones.
                  </p>

                  <Link to="engagement-rings" className="flex btn-transparent lg:w-fit justify-center">
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
                              className="w-[160px] h-auto max-w-none max-h-none object-contain mx-auto"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-p-14 font-light tracking-wider mb-2">{ring.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>



            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden order-[-1] lg:order-[0]">
            <Image src="/assets/images/home/young_woman_709x551.webp" loading="lazy" alt="Model wearing jewelry" className="object-cover w-[100%] h-[100%]" />
          </div>
        </div>

        
        <div className="grid grid-cols-1 flex flex-col lg:grid-cols-2 min-h-[600px]">
          <div className="col-span-1 relative overflow-hidden order-[-1] lg:order-[0]">
            <Image src="/assets/images/home/young_blonde_woman_707x551.webp" loading="lazy" alt="Model wearing jewelry" className="object-cover w-[100%] h-[100%]" width={707} height={551} />
          </div>
          <div className="col-span-1 flex flex-col items-start mt-[-40px] justify-between lg:mt-[80px]">
            <div className="relative lg:ml-[-60px] w-[100%] z-50 lg:px-0 px-4">
              <div className="w-full">
                <Image
                  src="/assets/images/home/plain_wedding_rings_1_1410x666.webp"
                  alt="Engagement Rings"
                  className="w-full h-auto object-cover hidden lg:block"
                  width={1410}
                />
                <Image
                  src="/assets/images/mobile/home/plain_wedding_rings_mobile_1-450x660.webp"
                  alt="Engagement Rings"
                  className="w-full sm:h-[860px] object-cover lg:hidden block "
                  width={450}
                />
                
              </div>

              <div className="absolute lg:top-1/2 lg:w-[50%] lg:-translate-y-1/2 lg:ml-[60px] lg:bottom-[unset] bottom-0 left-0  w-full lg:p-0 p-8">
                <h3 className="lg:text-h3 text-h3-m lg:leading-h3 leading-h3-m font-bold text-primary mb-3 tracking-wider flex justify-left">In Trend
                <br />Lab Grown Diamonds</h3>

                <p className="text-p-14 font-light text-primary mb-6 tracking-wider">Embrace Brilliant Savings with Trending Lab Grown Diamond Jewellery! Enjoy the allure of natural diamonds at a fraction of the cost. Our collection offers captivating beauty, allowing you to achieve a bigger, impressive look.</p>

                <Link to="lab-grown-diamonds" className="flex btn-transparent lg:w-fit justify-center">
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
                          <p className="text-p-14 font-light tracking-wider mb-2">{ring.name}</p>
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
    </section>
  )
}