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
    baseImages.length >= 5
      ? baseImages
      : [
          ...baseImages,
          '/assets/images/ring_2.webp',
          '/assets/images/ring_3.webp',
          '/assets/images/ring_4.webp',
          '/assets/images/ring_5.webp',
        ].slice(0, 6)

  const [active, setActive] = useState(0)
  const thumbRef = useRef<HTMLDivElement | null>(null)

  const prev = () => setActive((s) => Math.max(0, s - 1))
  const next = () => setActive((s) => Math.min(galleryImages.length - 1, s + 1))

  return (
    <div className="flex items-start gap-4">
      <div className="hidden md:flex flex-col gap-3 w-[72px]">
        {galleryImages.map((img, idx) => (
          <button
            key={img + idx}
            onClick={() => setActive(idx)}
            className={`relative rounded-md overflow-hidden border ${
              idx === active ? 'ring-2 ring-[#bf8f5f]' : 'border-gray-200'
            }`}
            style={{width: 72, height: 72}}
            aria-label={`Thumbnail ${idx + 1}`}>
            <Image src={img} alt={imageAlt} width={72} height={72} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>

      <div className="relative flex-1 max-w-[520px]">
        <div className="relative bg-white rounded-md overflow-hidden">
          <Image
            src={galleryImages[active]}
            alt={imageAlt}
            width={520}
            height={520}
            className="object-contain w-full h-[520px] bg-[#faf8f6]"
          />

          <button className="absolute left-4 bottom-4 bg-black text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black">🔍</span>
            Try On
          </button>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
            ›
          </button>
        </div>

        <div className="mt-3">
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
        </div>
      </div>

     
    </div>
  )
}

export default ProductGallery
