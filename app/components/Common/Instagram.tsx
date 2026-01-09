import {Image} from '@shopify/hydrogen';
import React from 'react';

interface InstagramItem {
  src: string;
  alt: string;
}

const InstagramItems: InstagramItem[] = [
  {
    src: '/assets/images/instagram/insta-1.avif',
    alt: 'Abelini Instagram',
  },
  {
    src: '/assets/images/instagram/insta-2.avif',
    alt: 'Abelini Instagram',
  },
  {
    src: '/assets/images/instagram/insta-3.avif',
    alt: 'Abelini Instagram',
  },
  {
    src: '/assets/images/instagram/insta-4.avif',
    alt: 'Abelini Instagram',
  },
  {
    src: '/assets/images/instagram/insta-5.avif',
    alt: 'Abelini Instagram',
  },
  {
    src: '/assets/images/instagram/insta-5.avif',
    alt: 'Abelini Instagram',
  },
];

const Instagram: React.FC = () => {
  return (
    <section className="overflow-x-hidden flex flex-col">
      <div className="flex flex-col container-fluid px-4 my-6">
        <h2 className="text-h3 font-bold text-primary my-6 tracking-wider text-center flex items-center justify-center gap-3">
          <Image
            src="/assets/images/icons/instagram.svg"
            alt="Instagram"
            width={30}
          />
          @abelinijewellery
        </h2>
        <div className="flex flex-nowrap lg:gap-10 gap-2 items-center justify-around overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {InstagramItems.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt={item.alt}
              width={250}
              className="rounded-lg object-cover h-[250px] w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
