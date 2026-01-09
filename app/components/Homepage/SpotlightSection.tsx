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

    <section className="bg-[#FCF4EC] flex flex-col">
      <div className="container-fluid px-4 lg:px-8 py-12 mb-6 block">
        <p className="mb-3 text-p-14 font-light text-primary tracking-wider text-center">WHERE DO THEY MENTION US?</p>
        <h2 className="flex justify-center capitalize m-0 lg:text-h2 text-h2-m lg:leading-h2 leading-h2-m font-bold text-primary my-4 tracking-wider text-center">Abelini In The Spotlight</h2>
        <hr className="border-0 border-t border-solid border-primary my-6 mx-auto w-[100%]" />
        <div className="flex flex-nowrap gap-10 items-center justify-around overflow-x-scroll [&::-webkit-scrollbar]:hidden">

          {logos.map((logo) => (
            <Image
              key={logo.id}
              src={logo.image}
              alt={logo.name}
              loading="lazy"
              width={100}
              height={100}
              className="w-full h-auto object-contain max-h-[100px] max-w-[150px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
