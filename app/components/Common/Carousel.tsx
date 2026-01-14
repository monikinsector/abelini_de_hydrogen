import { Image } from '@shopify/hydrogen'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Children,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type CarouselProps = {
  children: ReactNode
  slidesPerView?: number
  slidesToScroll?: number
  loop?: boolean
  spacing?: number
  showArrows?: boolean
  scrollDuration?: number
}

export default function Carousel({
  children,
  slidesPerView = 1,
  slidesToScroll = 1,
  loop = false,
  spacing = 32,
  showArrows = true,
  scrollDuration = 25, // 🔥 default smooth
}: Readonly<CarouselProps>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    slidesToScroll,
    align: 'start',
    containScroll: 'trimSnaps',
    duration: scrollDuration,
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const update = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    update()
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)

    return () => {
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div
          className="embla__container flex flex-nowrap"
          style={{ marginLeft: -spacing }}
        >
          {Children.map(children, (child) => (
            <div
              className="flex-[0_0_100%] basis-[20%] md:basis-[14.3%] lg:basis-[11.1%] flex-shrink-0 "
              style={{
                paddingLeft: spacing,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="
              absolute left-2 top-1/2 -translate-y-1/2 z-10
              h-12 p-3 cursor-pointer w-12 rounded-full bg-white shadow
              disabled:hidden
            "
          >
            <Image src='/assets/images/icons/c_left.svg' alt='Left'/>
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="
              absolute right-2 top-1/2 -translate-y-1/2 z-10
              h-12 p-3 cursor-pointer w-12 rounded-full bg-white shadow
              disabled:hidden
            "
          >
            <Image src='/assets/images/icons/c_right.svg' alt='Right'/>
          </button>
        </>
      )}
    </div>
  )
}
