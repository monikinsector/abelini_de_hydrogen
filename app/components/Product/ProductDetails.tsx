import {Image} from '@shopify/hydrogen';
import React, {useState} from 'react';
import Ratings from '~/components/Common/Ratings';
import Alert from '../Common/Alert';

export type ProductDetailsProps = {
  title: string;
  sku?: string;
  reviewsText?: string;
  rating?: number;
};

const Badge: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  gradientColor?: string;
}> = ({
  children,
  active,
  gradientColor = 'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
}) => (
  <button
    type="button"
    className={`
      h-[35px] w-[35px]
      text-[12px]
      flex items-center justify-center
      rounded-full
      text-sm font-normal cursor-pointer
      transition-all leai
      ${
        active
          ? ' border-4 border-[#ef900080]'
          : 'text-black hover:bg-[#dcdcdc]'
      }
    `}
    style={{
      background: gradientColor,
    }}
  >
    {children}
  </button>
);

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
          <div className="text-sm text-gray-600 bg-[#f8g4ef]">
            {' '}
            Our Price
            <span className="text-sm  line-through text-black px-1">
              {ourPrice}
            </span>
          </div>
        </div>
        <div className="bg-[#f2e9df] flex-1 p-3 rounded-tr-xl rounded-br-xl">
          Discounted price
          <div className="font-bold text-black text-3xl">{salePrice}</div>
        </div>
        {saleBadge}
      </div>

      <div className="hidden md:flex mt-2 mb-4 md:justify-between">
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

          <div className="hidden md:flex items-center text-xs text-[#0a5050] pt-1">
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

        {saleBadge && <div className="ml-4 mt-2">{saleBadge}</div>}
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
  <div className="mt-12 flex items-center gap-4">
    <button className="bg-black text-white text-[18px] md:text-sm p-2.5 cursor-pointer rounded-full flex-1 hover:bg-white hover:text-black hover:border-black hover:border">
      {primaryLabel}
    </button>
    <button className="border border-black p-2.5 text-sm cursor-pointer rounded-full flex-1 hover:bg-black hover:text-white hidden md:block">
      {secondaryLabel}
    </button>
  </div>
);

export type MetalOption = {
  label: string;
  gradientColor?: string;
};

export const MetalOptions: React.FC<{
  metals?: MetalOption[];
  activeIndex?: number;
  label?: string;
  onMetalChange?: (index: number, metal: MetalOption) => void;
}> = ({
  metals = [
    {
      label: '9k',
      gradientColor:
        'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
    },
    {
      label: '18k',
      gradientColor:
        'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
    },
    {
      label: '9k',
      gradientColor:
        'linear-gradient(to bottom, #e6c17e 0, #c7a369 99%, #c7a369 100%)',
    },
    {
      label: '18k',
      gradientColor:
        'linear-gradient(to bottom, #e6c17e 0, #c7a369 99%, #c7a369 100%)',
    },
    {
      label: '9k',
      gradientColor: 'linear-gradient(to bottom, #e3b591 0, #c99d81 100%)',
    },
    {
      label: '18k',
      gradientColor: 'linear-gradient(to bottom, #e3b591 0, #c99d81 100%)',
    },
    {
      label: 'plt',
      gradientColor:
        'linear-gradient(to bottom, #c7c7c7 0, #9e9e9e 99%, #9e9e9e 100%)',
    },
  ],
  activeIndex: initialActiveIndex = 0,
  label = '9K White Gold',
  onMetalChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleMetalClick = (index: number) => {
    setActiveIndex(index);
    onMetalChange?.(index, metals[index]);
  };

  return (
    <div>
      <div className="text-sm text-black mb-2">
        Metal: <span className="">{label}</span>
      </div>

      <div className="flex items-center gap-[10px]">
        {metals.map((m, i) => (
          <button
            key={`${m.label}-${i}`}
            onClick={() => handleMetalClick(i)}
            className="cursor-pointer"
          >
            <Badge active={i === activeIndex} gradientColor={m.gradientColor}>
              {m.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};

export const CustomizationPanel: React.FC<{
  initialTab?: 'custom' | 'specific';
}> = ({initialTab = 'custom'}) => {
  const [tab, setTab] = useState<'custom' | 'specific'>(initialTab);
  // --- TabOptions component -------------------------------------------------------

  return (
    <div className="mt-6 rounded-md overflow-hidden ">
      <div className="flex">
        <button
          onClick={() => setTab('custom')}
          className={`flex-1 py-1.5 px-3 cursor-pointer ${tab === 'custom' ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]' : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'}`}
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

      <div className="p-4 bg-[#f4f4f4] flex flex-col gap-6">
        {/* Stone type (replaced with TabOptions) */}
        <div className="mt-4">
          <div className="text-sm font-medium">
            Stone Type{' '}
            <span className="text-xs text-gray-500">How to Choose?</span>
          </div>
          <TabOptions
            className="mt-3"
            columns={4}
            options={[
              {
                id: 'lab',
                label: 'Lab Grown Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'natural',
                label: 'Natural Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'moissanite',
                label: 'Moissanite',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'black',
                label: 'Black Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              {id: 'ruby', label: 'Ruby', icon: '/assets/images/icons/di.svg'},
              {
                id: 'emerald',
                label: 'Emerald',
                icon: '/assets/images/icons/di.svg',
              },
            ]}
            initialSelected={0}
          />
        </div>

        {/* Shape */}
        <div className="mt-6">
          <div className="text-sm font-medium">Shape</div>
          <TabOptions
            className="mt-3"
            columns={5}
            options={[
              {
                id: 'round',
                label: 'Round',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'princess',
                label: 'Princess',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'emerald',
                label: 'Emerald',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'asscher',
                label: 'Asscher',
                icon: '/assets/images/icons/rnd.svg',
              },
              {id: 'oval', label: 'Oval', icon: '/assets/images/icons/rnd.svg'},
              {id: 'pear', label: 'Pear', icon: '/assets/images/icons/rnd.svg'},
              {
                id: 'heart',
                label: 'Heart',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'marquise',
                label: 'Marquise',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'cushion',
                label: 'Cushion',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'radiant',
                label: 'Radiant',
                icon: '/assets/images/icons/rnd.svg',
              },
            ]}
            initialSelected={0}
          />
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

        {/* Clarity / Colour / Cut etc. (use TabOptions) */}
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <div className="text-sm font-medium">Clarity</div>
            <TabOptions
              className="mt-2"
              options={[
                {id: 'if', label: 'IF'},
                {id: 'vvs1', label: 'VVS1'},
                {id: 'vvs2', label: 'VVS2'},
                {id: 'vs1', label: 'VS1'},
                {id: 'vs2', label: 'VS2'},
                {id: 'si1', label: 'SI1'},
                {id: 'si2', label: 'SI2'},
                {id: 'i1', label: 'I1'},
              ]}
              initialSelected={1}
            />
          </div>

          <div>
            <div className="text-sm font-medium">Colour</div>
            <TabOptions
              className="mt-2"
              options={[
                {id: 'D', label: 'D'},
                {id: 'E', label: 'E'},
                {id: 'F', label: 'F'},
                {id: 'I', label: 'I'},
              ]}
              initialSelected={3}
            />
          </div>

          <div>
            <div className="text-sm font-medium">Cut</div>
            <TabOptions
              className="mt-2"
              options={[
                {id: 'excellent', label: 'Excellent'},
                {id: 'verygood', label: 'Very Good'},
                {id: 'good', label: 'Good'},
              ]}
              initialSelected={2}
            />
          </div>

          <div>
            <div className="text-sm font-medium">Certificate</div>
            <TabOptions
              className="mt-2"
              options={[{id: 'abelini', label: 'ABELINI'}]}
              initialSelected={0}
            />
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
  );
};

export type TabOption = {id: string; label: string; icon?: string};

export const TabOptions: React.FC<{
  options: TabOption[];
  initialSelected?: number;
  onChange?: (option: TabOption) => void;
  columns?: number;
  className?: string;
}> = ({
  options,
  initialSelected = 0,
  onChange,
  columns = 4,
  className = '',
}) => {
  const [selected, setSelected] = useState<number>(initialSelected);

  const handle = (idx: number) => {
    setSelected(idx);
    onChange?.(options[idx]);
  };

  // use flex-wrap on desktop, overflow-x-auto on mobile for horizontal scroll
  return (
    <div 
      className={`flex gap-1 overflow-x-auto md:flex-wrap md:overflow-visible ${className}`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {options.map((opt, idx) => (
        <button
          key={opt.id}
          onClick={() => handle(idx)}
          className={`flex-shrink-0 max-w-[100px] text-xs rounded-xl py-[8px] px-[15px] inline-flex flex-col items-center justify-center h-fit ${
            idx === selected
              ? 'ring-1 ring-[#ef9000] bg-[#f8f4ef] cursor-pointer'
              : 'border bg-white border-[#b7b7b7] hover:bg-[#f8f4ef] cursor-pointer hover:ring-[#ef9000]'
          }`}
        >
          {opt.icon && (
            <Image
              src={opt.icon}
              alt={opt.label}
              height={30}
              width={30}
              className=""
            />
          )}
          <div>{opt.label}</div>
        </button>
      ))}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

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
          <div className="md:flex md:flex-col">
            <h1 className="text-[22px] md:text-[18px] md:text-left font-bold leading-7.5 md:leading-6.5">
              {title}
            </h1>
            {sku && (
              <p className="text-sm md:text-xs text-[#bf8f5f] md:text-black mt-2 mb-4 hidden md:block">
                SKU: <span className="text-[#bf8f5f] md:text-black">{sku}</span>
              </p>
            )}
          </div>
          <div className="flex flex-row md:flex-col justify-between md:justify-start mt-2 mb-4 md:mb-0">
            <div className="flex items-center gap-4 mt-2">
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
        <PriceArea
        // saleBadge={
        //   <div className="ml-4 px-3 py-2 rounded-xl bg-[#feecea] text-sm text-[#b35d4f]">
        //     Up To 20% Off Sale Ends In{' '}
        //     <div className="text-xs">0-1 d : 0-4 h : 0-57 m : 0-44 s</div>
        //   </div>
        // }
        />
      </div>

      {/* Delivery / info box */}
      <div className="mt-4 p-2 bg-[#eaf2f1] rounded-xl flex items-center gap-3 text-xs! md:mb-4">
        <Image
          height={22}
          width={22}
          src="/assets/images/icons/delivery_alert.svg"
          alt="delivery icon"
        />
        <div>
          <p className="font-medium">
            for <b>Free delivery</b> by 2026-01-20.
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

      <div className="hidden md:block">
        <PriceArea
          saleBadge={
            <div className="flex flex-col justify-center items-center">
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

      <div className="mt-6 flex md:items-center justify-between md:flex-row flex-col">
        <MetalOptions />

        <div className="w-[160px]">
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
        </div>
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
  );
};

export default ProductDetails;
