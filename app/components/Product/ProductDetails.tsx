import {Image} from '@shopify/hydrogen';
import React, {useState} from 'react';
import Ratings from '~/components/Common/Ratings';

export type ProductDetailsProps = {
  title: string;
  sku?: string;
  reviewsText?: string;
  rating?: number;
};

const Badge: React.FC<{children: React.ReactNode; active?: boolean}> = ({
  children,
  active,
}) => (
  <div
    className={`border rounded-full px-3 py-2 text-sm ${active ? 'ring-2 ring-[#bf8f5f]' : 'bg-white'}`}
  >
    {children}
  </div>
);

const IconBox: React.FC<{label: string; active?: boolean}> = ({
  label,
  active,
}) => (
  <div className={`flex flex-col items-center gap-2 text-center w-[74px]`}>
    <div
      className={`w-14 h-14 rounded-full border flex items-center justify-center ${active ? 'ring-2 ring-[#bf8f5f]' : ''}`}
    >
      <div className="w-8 h-8 bg-[#fff] rounded-sm" />
    </div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

export const PriceArea: React.FC<{
  highStreet?: string
  ourPrice?: string
  salePrice?: string
  saleBadge?: React.ReactNode
}> = ({highStreet = '£712', ourPrice = '£407', salePrice = '£358', saleBadge}) => {
  return (
    <div className="mt-6 flex items-center gap-6">
      <div className="text-sm text-gray-600">
        High Street <div className="font-bold">{highStreet}</div>
      </div>
      <div className="text-sm text-gray-400 line-through">{ourPrice}</div>
      <div className="text-3xl font-bold">{salePrice}</div>
      {saleBadge}
    </div>
  )
}

export const CTAButtons: React.FC<{primaryLabel?: string; secondaryLabel?: string}> = ({
  primaryLabel = 'Customise & Buy',
  secondaryLabel = 'Book Store Appointment',
}) => (
  <div className="mt-6 flex items-center gap-4">
    <button className="bg-black text-white px-6 py-3 rounded-full flex-1">{primaryLabel}</button>
    <button className="border border-black px-6 py-3 rounded-full flex-1">{secondaryLabel}</button>
  </div>
)

export const MetalOptions: React.FC<{metals?: string[]; activeIndex?: number}> = ({
  metals = ['9k', '18k', '9k', '18k', '9k', '18k', 'plt'],
  activeIndex = 2,
}) => (
  <div>
    <div className="text-sm text-gray-600">
      Metal: <span className="font-medium">9K Yellow Gold</span>
    </div>
    <div className="flex items-center gap-3 mt-2">
      {metals.map((m, i) => (
        <Badge key={m + i} active={i === activeIndex}>
          {m}
        </Badge>
      ))}
    </div>
  </div>
)

export const CustomizationPanel: React.FC<{
  initialTab?: 'custom' | 'specific'
}> = ({initialTab = 'custom'}) => {
  const [tab, setTab] = useState<'custom' | 'specific'>(initialTab)

  return (
    <div className="mt-6 rounded-md overflow-hidden ">
      <div className="flex">
        <button
          onClick={() => setTab('custom')}
          className={`flex-1 py-3 cursor-pointer ${tab === 'custom' ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]' : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'}`}
        >
          Diamond Customisation
        </button>
        <button
          onClick={() => setTab('specific')}
          className={`flex-1 py-3 cursor-pointer ${tab === 'specific' ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]' : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'}`}
        >
          Choose Specific Diamond
        </button>
      </div>

      <div className="p-4 bg-[#f4f4f4]">
        {/* Stone type */}
        <div>
          <div className="text-sm font-medium">
            Stone Type{' '}
            <span className="text-xs text-gray-500">How to Choose?</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3 text-xs">
            <div className="rounded-md py-2 px-2 text-center ring-2 ring-[#ef9000] bg-[#f8f4ef] flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/di.svg"
                alt="stone-type"
                height={30}
                width={30}
              />
              <p>Lab Grown Diamond</p>
            </div>
            <div className="border bg-white border-[#b7b7b7] rounded-md p-3 text-center flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/di.svg"
                alt="stone-type"
                height={30}
                width={30}
              />
              <p>Natural Diamond</p>
            </div>
            <div className="border bg-white border-[#b7b7b7] rounded-md p-3 text-center  flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/di.svg"
                alt="stone-type"
                height={30}
                width={30}
              />
              <p>Moissanite</p>
            </div>
            <div className="border bg-white border-[#b7b7b7] rounded-md p-3 text-center flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/di.svg"
                alt="stone-type"
                height={30}
                width={30}
              />
              <p>Black</p>
            </div>
          </div>
        </div>

        {/* Shape */}
        <div className="mt-6">
          <div className="text-sm font-medium">Shape</div>
          <div className="grid grid-cols-5 gap-3 mt-3">
           <div className="rounded-md py-2 px-2 text-center ring-2 ring-[#ef9000] bg-[#f8f4ef] flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/rnd.svg"
                alt="shape"
                height={30}
                width={30}
              />
              <p>Round</p>
            </div>
            <div className="border bg-white border-[#b7b7b7] rounded-md p-3 text-center flex flex-col items-center justify-center">
              <Image
                src="/assets/images/icons/rnd.svg"
                alt="stone-type"
                height={30}
                width={30}
              />
              <p>Princess</p>
            </div>
          </div>
        </div>

        {/* Carat slider (visual) */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Carat{' '}
              <span className="text-xs text-gray-500">How to Choose?</span>
            </div>
            <div className="text-xs text-gray-500">0.20 ct - 10.00 ct</div>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded" />
        </div>

        {/* Clarity / Colour / Cut etc. simplified */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium">Clarity</div>
            <div className="flex gap-2 mt-2">
              <div className="border rounded-md px-3 py-2">VVS1</div>
              <div className="border rounded-md px-3 py-2 ring-2 ring-[#bf8f5f]">
                VVS2
              </div>
              <div className="border rounded-md px-3 py-2 bg-white">VS1</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Colour</div>
            <div className="flex gap-2 mt-2">
              <div className="border rounded-md px-3 py-2">D</div>
              <div className="border rounded-md px-3 py-2">E</div>
              <div className="border rounded-md px-3 py-2">F</div>
              <div className="border rounded-md px-3 py-2 ring-2 ring-[#bf8f5f]">
                I
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Cut</div>
            <div className="flex gap-2 mt-2">
              <div className="border rounded-md px-3 py-2">Excellent</div>
              <div className="border rounded-md px-3 py-2">Very Good</div>
              <div className="border rounded-md px-3 py-2 ring-2 ring-[#bf8f5f]">
                Good
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Certificate</div>
            <div className="mt-2 border rounded-md px-3 py-2">ABELINI</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-[#f5a623] text-black py-3 rounded-full">
            Add to Cart
          </button>
          <button className="flex-1 border py-3 rounded-full">
            Book Store Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  sku,
  reviewsText,
  rating = 0,
}) => {
  return (
    <div className="px-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Ratings value={rating} text={reviewsText} />
          </div>
          {sku && (
            <p className="text-sm text-[#626262] mt-2">
              SKU: <span className="text-[#8a8a8a]">{sku}</span>
            </p>
          )}
        </div>
      </div>

      {/* Delivery / info box */}
      <div className="mt-4 p-2 bg-[#eaf2f1] rounded-md flex items-center gap-3 text-xs!">
        <Image
          height={22}
          width={22}
          src="/assets/images/icons/delivery_alert.svg"
          alt="delivery icon"
        />
        <div>
          <p className="font-medium">
            for <b>Free delivery</b> by <b>2026-01-20</b>.
          </p>
          <p className="text-xs mt-1">
            Shop our{' '}
            <a href="/" className="underline font-bold">
              In-Stock Products
            </a>{' '}
            or call us on{' '}
            <a className="text-[#0A5050] underline font-bold" href="/">
              02038051270
            </a>
            .
          </p>
        </div>
      </div>

      <PriceArea saleBadge={<div className="ml-4 px-3 py-2 rounded-md bg-[#feecea] text-sm text-[#b35d4f]">Up To 20% Off Sale Ends In <div className="text-xs">0-1 d : 0-4 h : 0-57 m : 0-44 s</div></div>} />

      <CTAButtons />

      <div className="mt-6 flex items-center justify-between">
        <MetalOptions />

        {/* <div className="w-[160px]">
          <label htmlFor="ring-size" className="text-xs text-gray-500">
            Ring size
          </label>
          <div
            id="ring-size"
            className="mt-2 border rounded-md p-3 text-center"
          >
            M
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <u>Ring Size Guide</u>
          </div>
        </div> */}
      </div>

      {/* Setting / Band / Shank choices */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div>
          <div className="text-sm font-medium">Setting Style</div>
          <div className="flex gap-3 mt-3">
            <IconBox label="Plain" active />
            <IconBox label="Hidden Halo" />
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Band Style</div>
          <div className="flex gap-3 mt-3">
            <IconBox label="Plain" active />
            <IconBox label="Pave" />
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Shank Width</div>
          <div className="flex gap-3 mt-3 items-center">
            <IconBox label="Standard" active />
            <IconBox label="Large" />
          </div>
        </div>
      </div>

      <CustomizationPanel />
    </div>
  )
}

export default ProductDetails;
