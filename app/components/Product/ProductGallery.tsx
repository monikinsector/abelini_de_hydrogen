import React, {useState, useRef} from 'react'
import {Image} from '@shopify/hydrogen'

export type MediaTab = { key: string; label: string; count?: number; iconSrc?: string }

export type ProductGalleryProps = {
  imageSrc: string
  imageAlt?: string
  mobileTabs?: MediaTab[]
  images?: string[]
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  imageSrc,
  imageAlt = '',
  mobileTabs = [],
  images = [],
}) => {
  const baseImages = images.length > 0 ? images : [imageSrc]
  const galleryImages =
    baseImages.length >= 1
      ? baseImages
      : [
          ...baseImages,
          '/assets/images/ring.webp',
          '/assets/images/ring.webp',
          '/assets/images/ring.webp',
          '/assets/images/ring.webp',
        ].slice(0, 6)

  const [active, setActive] = useState(0)
  const thumbRef = useRef<HTMLDivElement | null>(null)

  const prev = () => setActive((s) => Math.max(0, s - 1))
  const next = () => setActive((s) => Math.min(galleryImages.length - 1, s + 1))

  return (
    <div className="hidden lg:flex flex-col md:flex-row items-start gap-4 mt-4">
      <div className="hidden md:flex flex-col gap-3  flex-shrink-0 order-1">
        {galleryImages.map((img, idx) => (
          <button
            key={img + idx}
            onClick={() => setActive(idx)}
            className={`rounded-md overflow-hidden border w-full ${
              idx === active ? 'rounded-xl border-[#cfcfcf]' : 'border-[#cfcfcf]'
            }`}
            style={{width: 98, height: 98}}
            aria-label={`Thumbnail ${idx + 1}`}>
            <Image src={img} alt={imageAlt} width={98} height={98} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>

      <div className="w-[444px] flex-shrink-0 relative order-2">
        <div className="relative bg-white rounded-md overflow-hidden w-full">
          
          <Image
            src={galleryImages[active]}
            alt={imageAlt}
            width={444}
            height={444}
            className="object-cover w-full h-[444px] bg-[#faf8f6]"
          />

          <button
            type="button"
            className="absolute top-2 right-2 flex items-center justify-center p-0 border-0 bg-transparent w-6 h-6 z-10"
            aria-label="Close or zoom image">
           <Image src='/assets/images/icons/arrows-maximize-light.svg' height={24} width={24} alt='resize-icon'/>
          </button>

          <button className="absolute left-4 bottom-4 bg-black text-white px-3 py-2 rounded-full text-sm flex items-center gap-2 hidden ">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black">🔍</span>
            Try On
          </button>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center z-10">
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center z-10">
            ›
          </button>
        </div>

        {/* <div className="mt-3 md:block hidden">
          <div ref={thumbRef} className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={img + idx + '-h'}
                onClick={() => setActive(idx)}
                className={`rounded-sm overflow-hidden border ${
                  idx === active ? 'ring-2 ring-[#bf8f5f]' : 'border-gray-200'
                }`}>
                <Image src={img} alt={`Thumb ${idx + 1}`} width={84} height={84} className="object-cover w-[84px] h-[84px]" />
              </button>
            ))}
          </div>
        </div> */}
      </div>

     
    </div>
  )
}

export default ProductGallery
