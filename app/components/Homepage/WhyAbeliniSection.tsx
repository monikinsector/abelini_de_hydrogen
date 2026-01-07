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
    image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/stop_blood_icon_230x90.avif?v=1750488328',
  },
  {
    name: 'The National Association of Jewellers',
    image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/the_national_icon_230x90.avif?v=1750488337',
  },
  {
    name: 'GIA',
    image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/gia_logo_230x90.avif?v=1750488328',
  },
];

  return (
    <div className="my-16 w-full flex justify-center">
      <div className="w-full grid px-6 gap-x-6 gap-y-8 grid-cols-6 lg:grid-cols-5 justify-items-center items-center">

        {supportIcons.map((icon, index) => (
          <div
            key={icon.name}
            className={`flex justify-center items-center col-span-2 
              ${index === 3 ? 'col-start-2' : ''} 
              lg:col-span-1 lg:col-start-auto
            `}
          >
            <Image
              src={icon.image}
              alt={icon.name}
              width={230}
              height={90}
              className="object-contain"
              loading="lazy"
            />
          </div>
        ))}

      </div>
    </div>



  );
};



export default function RichText() {
    return (
          <>
            <div className="lg:w-1/2 w-full text-center flex flex-col mx-auto bg-white lg:py-[35px] py-8 lg:px-8 px-6">
                <h2 className="flex capitalize m-0 text-[42px] leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px] flex justify-center">Why Abelini</h2>
                <p className="mt-3 text-[14px] font-light text-[#111111] mb-2 tracking-[0.8px]">It's easy to lose sight of what value really means. If your opinion of value is like ours and is about getting more and paying less, then you're in the right place. By buying directly from manufacturers online, it can save up to 70% compare to high street jewellers. We pride ourselves on offering enduring quality at fair prices; shopping is just better that way, isn't it?
                </p>
                <Link to="/about-us" className="flex justify-center title mt-[30px]">
                    <u>Learn more</u>
                    <Image src="/assets/images/icons/arrow-right.svg" alt="Arrow Right" width={22} height={22} className="ml-2" />
                </Link>
            </div>
                <SupportIcons />
        </>
    )
}