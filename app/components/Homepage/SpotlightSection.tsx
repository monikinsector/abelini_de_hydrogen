import React from 'react';
import { Image } from '@shopify/hydrogen';

const Spotlight = () => {

  const logos = [
    {
      id: 1,
      name: 'Sun Newspaper',
      image: '/assets/images/home/spotlight/sun_newspaper.svg'
    },
    {
      id: 2,
      name: 'Daily Express',
      image: '/assets/images/home/spotlight/daily_express.svg'
    },
    {
      id: 3,
      name: 'Marie Claire',
      image: '/assets/images/home/spotlight/marie_claire.svg'
    },
    {
      id: 4,
      name: 'Hatched',
      image: '/assets/images/home/spotlight/hatched.svg'
    },
    {
      id: 5,
      name: 'Mirror',
      image: '/assets/images/home/spotlight/mirrorlogo.svg'
    },
  ];


  return (

    <section className="lg:px-10 py-8 flex flex-col bg-[#FCF4EC] text-center overflow-x-hidden">
      <div className="mb-4 ">
        <p className="title mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]">WHERE DO THEY MENTION US?</p>
        <h2 className="select_category flex justify-center capitalize m-0 text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] lg:text-[42px] lg:leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px]">Abelini In The Spotlight</h2>
      </div>
      <hr className="border-0 border-t border-solid border-[#111111] my-6 mx-auto w-[100%]" />
      <div className="flex flex-nowrap gap-10 items-center justify-around overflow-x-scroll [&::-webkit-scrollbar]:hidden">

        {logos.map((logo) => (
          <Image
            key={logo.id}
            src={logo.image}
            alt={logo.name}
            width={170}
            height={100}
            loading="lazy"
            className="w-[170px] h-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
