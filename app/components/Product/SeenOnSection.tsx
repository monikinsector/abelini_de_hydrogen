import React from 'react';
import { Image } from '@shopify/hydrogen';

const SeenOn = () => {
  const logos = [
    { id: 1, name: 'Sun Newspaper', image: '/assets/images/home/spotlight/sun_newspaper.svg' },
    { id: 2, name: 'Daily Express', image: '/assets/images/home/spotlight/daily_express.svg' },
    { id: 3, name: 'Marie Claire', image: '/assets/images/home/spotlight/marie_claire.svg' },
    { id: 4, name: 'Hatched', image: '/assets/images/home/spotlight/hatched.svg' },
    { id: 5, name: 'Mirror', image: '/assets/images/home/spotlight/mirrorlogo.svg' },
  ];

  return (
    <section className="bg-[#FCF4EC]">
      <div className="container-fluid px-4 lg:px-8 py-10">
        <h2 className="capitalize text-center font-bold text-primary tracking-wider text-[20px] lg:text-[20px] ">
          As Seen On
        </h2>

        {/* Logos */}
        <div className="mt-6 flex md:flex-row md:flex-wrap flex-col items-center justify-center lg:gap-14 gap-8 py-2.5 lg:py-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {logos.map((logo) => (
            <Image
              key={logo.id}
              src={logo.image}
              alt={logo.name}
              loading="lazy"
              width={170}
              height={45}
              className="object-contain max-h-[45px] max-w-[170px] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeenOn;
