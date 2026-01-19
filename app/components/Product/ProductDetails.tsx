import {Image} from '@shopify/hydrogen';
import React from 'react';
import Ratings from '~/components/Common/Ratings';
import Alert from '../Common/Alert';
import RingSizeSelector from './RingSizeSelector';
import ProductOptions from './ProductOptions';
import {CustomizationPanel} from './ProductCustomize';
import {MetalOptions} from './MetalOptions';
import Button from '../Common/Button';

export type ProductDetailsProps = {
  title: string;
  sku?: string;
  reviewsText?: string;
  rating?: number;
};

const IconButtons = () => { 
  return <div className='flex items-center gap-2'>
          <button
            type="button"
            className="flex items-center justify-center border-0 p-0  focus:outline-none"
            aria-label="Add to Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 20 20"
              className="w-6 h-6 text-current mx-1"
              style={{
                fontSize: '28px',
                lineHeight: '30px',
                transform: 'rotate(360deg)',
              }}
            >
              <path
                fill="currentColor"
                d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0L10 5.197L8.864 4.156c-1.672-1.535-4.382-1.535-6.054 0c-1.881 1.726-1.881 4.519 0 6.245L10 17l7.19-6.599c1.88-1.726 1.88-4.52 0-6.245m-1.066 5.219L10 15.09L3.875 9.375c-.617-.567-.856-1.307-.856-2.094s.138-1.433.756-1.999c.545-.501 1.278-.777 2.063-.777c.784 0 1.517.476 2.062.978L10 7.308l2.099-1.826c.546-.502 1.278-.978 2.063-.978s1.518.276 2.063.777c.618.566.755 1.212.755 1.999s-.238 1.528-.856 2.095"
              />
            </svg>
          </button>
          
          <span
            className="inline-flex items-center justify-center w-8 h-8 bg-no-repeat bg-auto"
            aria-hidden="true"
            style={{
              backgroundImage: "url('/assets/images/icons/sprite_icon.png')",
              backgroundPosition: '-69px -109px',
            }}
          ></span>
          </div>
}

const IconBox: React.FC<{label: string; active?: boolean}> = ({
  label,
  active,
}) => (
  <div className={`flex flex-col items-center gap-2 text-center w-[74px]`}>
    <div
      className={`w-14 h-14 rounded-full border flex items-center justify-center hover:bg- ${active ? 'ring-2 ring-[#bf8f5f]' : ''}`}
    >
      <div className="w-8 h-8 bg-[#fff] rounded-sm" />
    </div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

export const PriceArea: React.FC<{
  highStreet?: string;
  ourPrice?: string;
  salePrice?: string;
  saleBadge?: React.ReactNode;
}> = ({
  highStreet = '£712',
  ourPrice = '£407',
  salePrice = '£358',
  saleBadge,
}) => {
  return (
    <div>
      <div className="flex block md:hidden">
        <div className="bg-[#f8f4ef]  p-3 flex-1 rounded-tl-xl rounded-bl-xl">
          <div className=" text-[#575757] bg-[#f8g4ef]">
            High Street{' '}
            <span className=" text-[#111111] px-1">{highStreet}</span>
          </div>
          <div className="text-lg md:text-sm text-gray-600 bg-[#f8g4ef]">
            {' '}
            Our Price
            <span className="text-lg  md:text-sm line-through text-black px-1">
              {ourPrice}
            </span>
          </div>
        </div>
        <div className="bg-[#f2e9df] flex-1 p-3 rounded-tr-xl rounded-br-xl leading-4">
          Discounted price
          <div className="font-bold text-black text-3xl">{salePrice}</div>
        </div>
        {saleBadge}
      </div>

      <div className="hidden md:flex mt-2 mb-4 md:justify-start gap-4">
        <div>
          <div className="md:flex items-center gap-2 hidden mt-2 mb-4 md:mb-0">
            <div className="text-xs text-[#575757]">
              <div className="">High Street</div>
              <div className="font-bold text-[15px]">£700</div>
            </div>

            <div className="text-black text-4xl font-normal">/</div>

            <div className="text-xs text-[#575757]">
              <div className="">Our Price</div>
              <div className="font-bold text-[15px]">£400</div>
            </div>

            <div className="text-black text-4xl font-normal">/</div>

            <div className="text-3xl font-bold text-black">£380</div>
          </div>

          <div className="block md:flex items-center text-xs text-[#0a5050] pt-1">
            <button className="underline text-[#0a5050] bg-none border-none cursor-pointer">
              Or £31.67 / Month - Finance Calculator 
            </button>
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                focusable="false"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20"
                className="ml-1 iconify"
                data-icon="entypo:info-with-circle"
                data-inline="false"
                style={{transform: 'rotate(360deg)'}}
              >
                <path
                  fill="currentColor"
                  d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601c0-5.302-4.299-9.6-9.6-9.6m.896 3.466c.936 0 1.211.543 1.211 1.164c0 .775-.62 1.492-1.679 1.492c-.886 0-1.308-.445-1.282-1.182c0-.621.519-1.474 1.75-1.474M8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678c-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061c.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756c.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {saleBadge && <div className="ml-4 mt-2 md:flex-1">{saleBadge}</div>}
      </div>
    </div>
  );
};

export const CTAButtons: React.FC<{
  primaryLabel?: string;
  secondaryLabel?: string;
}> = ({
  primaryLabel = 'Customise & Buy',
  secondaryLabel = 'Book Store Appointment',
}) => (
  <div className="mt:mt-12 mt-6 flex items-center gap-4">
    <button className="bg-black text-white text-[18px] md:text-sm p-2.5 cursor-pointer rounded-full flex-1 hover:bg-white hover:text-black hover:border-black hover:border">
      {primaryLabel}
    </button>
    <button className="border border-black p-2.5 text-sm cursor-pointer rounded-full flex-1 hover:bg-black hover:text-white hidden md:block">
      {secondaryLabel}
    </button>
  </div>
);

export const InfoBox = () => { 
  return <div className="mt-4 lg:mt-6 p-2 bg-[#eaf2f1] rounded-xl leading-4 flex items-center gap-3 text-xs! md:mb-4">
        <Image
          height={22}
          width={22}
          src="/assets/images/icons/delivery_alert.svg"
          alt="delivery icon"
        />
        <div>
          <p className="font-medium">
            for <b>Free delivery</b> by 20 Jan 2026.
          </p>
          <p className="text-xs mt-1">
            Shop our{' '}
            <a href="/" className="underline font-bold">
              In-Stock Products
            </a>{' '}
            or call us on{' '}
            <a className="text-[#0A5050] underline " href="/">
              02038051270
            </a>
            .
          </p>
        </div>
      </div>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  sku,
  reviewsText,
  rating = 0,
}) => {
  return (
    <div className="px-2">
      <div className="flex items-start justify-between">
        <div className="md:flex md:justify-between md:items-start gap-2">
          <div className="md:flex md:flex-col md:gap-2 flex-2 md:flex-1">
            <h1 className="text-[22px] md:text-[18px] md:text-left font-bold leading-7.5 md:leading-6.5">
              {title} 
            </h1>
            {sku && (
              <p className="text-sm md:text-xs text-[#bf8f5f] md:text-black mt-2  mb-4 md:mt-0 md:mb-0 hidden md:block">
                SKU: <span className="text-[#bf8f5f] md:text-black">{sku}</span>
              </p>
            )}
          </div>
          <div className="flex flex-row md:flex-col justify-between md:justify-start mt-2 mb-4 md:mt-0 md:mb-0">
            <div className="flex items-center gap-4 mt-2 md:mt-0 md:flex-2">
              <Ratings value={rating} text={reviewsText} />
            </div>
            {sku && (
              <p className="text-sm text-[#bf8f5f] md:text-[#626262] mt-2 mb-4 block md:hidden">
                SKU:{' '}
                <span className="text-[#bf8f5f] md:text-[#8a8a8a]">{sku}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Flash Sale and Price */}
      <div className="mt-2 mb-4 md:m-0 flex flex-col gap-4 md:hidden">
        <Alert />
        <PriceArea/>
      </div>

      {/* Delivery / info box */}
      <InfoBox/>

      <div className="hidden md:block">
        <PriceArea
          saleBadge={
            <div className="flex flex-col justify-center items-center md:flex-1">
              <div className="ml-4 bg-[#e4644533] rounded-lg p-1 flex items-center gap-2 w-full">
                <Image
                  src="/assets/images/icons/clock-light.svg"
                  alt="clock-icon"
                  height={23}
                  width={23}
                />
                <div className="text-xs text-[#e46445]">
                  <div className="font-[550] text-[12px]">
                    Up To 8% Off Sale Ends Today
                  </div>
                  <div className=" font-[500] text-[14px]">
                    ONE-DAY FLASH SALE
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center text-xs text-[#0a5050] pt-1">
                <button className=" text-[#0a5050] bg-none border-none cursor-pointer">
                  Price Match Guarantee*
                </button>
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 20 20"
                    className="ml-1 iconify"
                    data-icon="entypo:info-with-circle"
                    data-inline="false"
                    style={{transform: 'rotate(360deg)'}}
                  >
                    <path
                      fill="currentColor"
                      d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601c0-5.302-4.299-9.6-9.6-9.6m.896 3.466c.936 0 1.211.543 1.211 1.164c0 .775-.62 1.492-1.679 1.492c-.886 0-1.308-.445-1.282-1.182c0-.621.519-1.474 1.75-1.474M8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678c-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061c.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756c.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          }
        />
      </div>

      <CTAButtons />

      <div className="mt-6 flex md:items-center justify-between md:flex-row flex-col gap-4">
        <MetalOptions />
        <RingSizeSelector />
      </div>

      {/* Setting / Band / Shank choices */}

      <ProductOptions />

      <CustomizationPanel />

      <div className='flex flex-col gap-2 justify-center items-center m-2'>
        {/* Desktop Add to cart and Wishlist */}
        <div className="md:flex md:justify-between md:items-center gap-4 w-full hidden">
        <Button variant="orange" className="w-full text-sm!">
          Add to Cart
        </Button>
        <div className='hidden md:block'>
        <IconButtons/> 
        </div>
        </div>
        <Button className='w-full mx-3.75 block md:hidden' variant="orange">Add to Cart</Button>
        <Button variant="black" className="w-full mx-3.75 block md:hidden">
          Book Store Appointment
        </Button>

        <div className='hidden md:flex md:justify-center md:items-center w-full gap-4'>
        <Button variant="black" className="w-full block flex-2 text-sm!">
          Book Store Appointment
        </Button>
        <Button variant="outline" className="w-full flex-1 text-sm!">
            Order Sample
          </Button>

        </div>

          {/* mobile  */}
        <div className='flex items-center gap-2 w-full block md:hidden'>
          <Button variant="outline" className="w-full md:mx-3.75">
            Order Sample
          </Button>

          {/* Wishlist and Hint button  */}
          <div className="block md:hidden">
          <IconButtons/>
          </div>
        </div>
      </div>
      <div className='mt-4'>
      <InfoBox/>
      </div>
    </div>
  );
};

export default ProductDetails;
