import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';


const SupportIcons = () => {

  const supportIcons = [
    {
      name: 'Assay Office London',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/assay_office_london_logo_230x90.avif?v=1750488327',
    },
    {
      name: 'Assay Assured',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/assay_assured_230x90.avif?v=1750488328',
    },
    {
      name: 'Stop Blood Diamonds',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/gia_logo_230x90.avif?v=1750488328',
    },
    {
      name: 'The National Association of Jewellers',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/stop_blood_icon_230x90.avif?v=1750488328',
    },
    {
      name: 'GIA',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/the_national_icon_230x90.avif?v=1750488337',
    },
  ]
  return (
    <div className="my-16 w-full flex justify-center">
      <div className="w-full grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 px-6 justify-items-center items-center">

        {supportIcons.map((icon, index) => (
          <Image
            key={index}
            src={icon.image}
            alt={icon.name}
            width={230}
            height={90}
            className="object-contain mx-auto"
            loading="lazy"
          />
        ))}

      </div>
    </div>

  );
};



export default function RichText() {
    return (
          <>
            <div className="lg:w-1/2 w-full text-center flex flex-col mx-auto bg-white lg:py-[35px] py-8 lg:px-8 px-6">
                <h2 className="text-[18px] sm:text-[34px] lg:text-[42px] font-bold text-[#111] leading-[30px] sm:leading-[38px] lg:leading-[48px] my-4 tracking-[1px] capitalize">Why Abelini</h2>
                <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]">It's easy to lose sight of what value really means. If your opinion of
                    value is like ours and is about getting more and paying less, then you're in the right
                    place. By buying directly from manufacturers online, it can save up to 70% compare to
                    high street jewellers. We pride ourselves on offering enduring quality at fair prices;
                    shopping is just better that way, isn't it?
                </p>
                <Link to="/about-us" className="flex justify-center title mt-[30px]">
                    <u>Learn more</u>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    style={{ height: '22px', width: '22px', transform: 'rotate(360deg)' }}
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    className="iconify ml-2"
                    data-icon="octicon:arrow-right-24"
                    data-inline="false"
                    >
                    <path
                        fill="currentColor"
                        d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275a.75.75 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0"
                    />
                    </svg>
                </Link>
            </div>
                <SupportIcons />
        </>
    )
}