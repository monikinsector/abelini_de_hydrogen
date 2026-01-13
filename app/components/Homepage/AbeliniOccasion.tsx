import {useState, useEffect, useRef} from 'react';
import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';

export function ImageWithProductSlider({rings}: {rings: any[]}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: false});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <div
      className="w-full relative overflow-hidden flex justify-center"
      ref={emblaRef}
    >
      <div className="flex lg:w-[calc(100%-120px)] w-full mx-auto">
        {rings.map((ring, index) => (
          <div className="flex-none lg:w-1/3 w-1/2 min-w-0 relative px-2">
            <Image
              src={ring.img}
              alt={ring.name}
              width={320}
              height={300}
              className="w-full h-auto object-cover"
            />
            <p className="text-p-14 font-light tracking-wider mb-2 text-center">
              {ring.name}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        disabled={selectedIndex === 0}
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
  );
}

const rings = [
  {
    name: 'Solitaire',
    href: 'engagement-rings/classic-solitaire',
    img: '/assets/images/home/category/solitaire_320x300.webp',
  },
  {
    name: 'Side Stone',
    href: 'engagement-rings/side-stone-shoulder-set-rings',
    img: '/assets/images/home/category/side_stone_320x300.webp',
  },
  {
    name: 'Halo',
    href: 'engagement-rings/halo-rings',
    img: '/assets/images/home/category/halo_320x300.webp',
  },
  {
    name: 'Trilogy',
    href: 'engagement-rings/three-stone',
    img: '/assets/images/home/category/trilogy_320x300.webp',
  },
  {
    name: 'Vintage',
    href: 'engagement-rings/vintage-engagement-rings',
    img: '/assets/images/home/category/vintage_320x300.webp',
  },
  {
    name: 'Ruby',
    href: 'engagement-rings/ruby',
    img: '/assets/images/home/category/ruby_320x300.webp',
  },
  {
    name: 'Emerald',
    href: 'engagement-rings/emeralds',
    img: '/assets/images/home/category/emerald_320x300.webp',
  },
  {
    name: 'Oval',
    href: 'engagement-rings/oval',
    img: '/assets/images/home/category/oval_320x300.jpeg',
  },
  {
    name: 'Blue Sapphire',
    href: 'engagement-rings/blue-sapphire',
    img: '/assets/images/home/category/blue_sapphire_320x300.webp',
  },
];

const labGrownDiamonds = [
  {
    name: 'Engagement Rings',
    href: 'engagement-rings/lab-grown-diamond',
    img: '/assets/images/home/category/solitaire_320x300.webp',
  },
  {
    name: 'Eternity Rings',
    href: 'diamond-rings/eternity-rings/lab-grown-diamond',
    img: '/assets/images/home/category/eternity_product.webp',
  },
  {
    name: 'Pendant',
    href: 'pendants/lab-grown-diamond',
    img: '/assets/images/home/category/pendant.webp',
  },
  {
    name: 'Earrings',
    href: 'earrings/lab-grown-diamond',
    img: '/assets/images/home/category/earring.webp',
  },
  {
    name: 'Bracelets',
    href: 'bracelets/lab-grown-diamond',
    img: '/assets/images/home/category/bracelet.webp',
  },
];

export default function AbeliniOccasion() {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col container-fluid my-6">
        <div className="text-center my-6">
          <p className="mb-3 text-p-14 font-light text-primary tracking-wider">
            OUR JEWELLERY
          </p>
          <h2 className="lg:text-h2 text-h2-m lg:leading-h2 leading-h2-m font-bold text-primary mb-3 tracking-wider">
            Abelini For
            <br />
            Any Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 flex flex-col lg:grid-cols-2 min-h-[600px]">
          <div className="col-span-1 flex flex-col items-start mt-[-48px] justify-between lg:mt-[48px]">
            <div className="relative lg:ml-[60px] w-[100%] z-50 lg:p-0 px-4">
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
                  Our engagement ring collection includes meticulously crafted,
                  elegant rings that symbolize love and commitment. From classic
                  solitaires to intricate halos and vintage-inspired pieces are
                  made using high-quality materials like platinum, gold,
                  diamonds and gemstones.
                </p>

                <Link
                  to="engagement-rings"
                  className="flex btn-transparent lg:w-fit justify-center"
                >
                  <span>Engagement Rings</span>
                </Link>
              </div>
            </div>

            <div className="w-[100%] lg:py-12 py-2 relative lg:ml-[48px]">
              <ImageWithProductSlider rings={rings} />
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden order-[-1] lg:order-[0]">
            <Image
              src="/assets/images/home/young_woman_709x551.webp"
              loading="lazy"
              alt="Model wearing jewelry"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 flex flex-col lg:grid-cols-2 min-h-[600px]">
          <div className="col-span-1 relative overflow-hidden order-[-1] lg:order-[0]">
            <Image
              src="/assets/images/home/young_blonde_woman_707x551.webp"
              loading="lazy"
              alt="Model wearing jewelry"
              className="object-cover w-[100%] h-[100%]"
              width={707}
              height={551}
            />
          </div>
          <div className="col-span-1 flex flex-col items-start mt-[-48px] justify-between lg:mt-[48px]">
            <div className="relative lg:ml-[-48px] w-[100%] z-50 lg:px-0 px-4">
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
                <h3 className="lg:text-h3 text-h3-m lg:leading-h3 leading-h3-m font-bold text-primary mb-3 tracking-wider flex justify-left">
                  In Trend
                  <br />
                  Lab Grown Diamonds
                </h3>

                <p className="text-p-14 font-light text-primary mb-6 tracking-wider">
                  Embrace Brilliant Savings with Trending Lab Grown Diamond
                  Jewellery! Enjoy the allure of natural diamonds at a fraction
                  of the cost. Our collection offers captivating beauty,
                  allowing you to achieve a bigger, impressive look.
                </p>

                <Link
                  to="lab-grown-diamonds"
                  className="flex btn-transparent lg:w-fit justify-center"
                >
                  <span>Lab Grown Diamonds</span>
                </Link>
              </div>
            </div>

            <div className="w-[100%] lg:py-12 py-2 relative lg:ml-[-48px]">
              <ImageWithProductSlider rings={labGrownDiamonds} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
