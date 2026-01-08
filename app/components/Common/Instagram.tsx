import { Image } from '@shopify/hydrogen';
import React from 'react';

interface InstagramItem {
  src: string;
  alt: string;
}

const InstagramItems: InstagramItem[] = [
  {
    src: '/assets/images/instagram/insta-1.avif',
    alt: 'Abelini Instagram'
  },
  {
    src: '/assets/images/instagram/insta-2.avif',
    alt: 'Abelini Instagram'
  },
  {
    src: '/assets/images/instagram/insta-3.avif',
    alt: 'Abelini Instagram'
  },
  {
    src: '/assets/images/instagram/insta-4.avif',
    alt: 'Abelini Instagram'
  },
  {
    src: '/assets/images/instagram/insta-5.avif',
    alt: 'Abelini Instagram'
  },
  {
    src: '/assets/images/instagram/insta-5.avif',
    alt: 'Abelini Instagram'
  }
];

const Instagram: React.FC = () => {
  return (
    <section >
      <h2 className="text-h3 font-bold text-primary my-4 tracking-wider text-center my-8 flex items-center justify-center gap-3">
        <Image src="/assets/images/icons/instagram.svg" alt="Instagram" width={30} />
        @abelinijewellery
      </h2>
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-2 flexjustify-center items-center px-12">
          {InstagramItems.map((item) => (
            <div className="col-span-1 flex justify-center items-center" key={item.src}>
              <Image src={item.src} alt={item.alt} width={250} className="rounded-lg object-cover h-[250px] w-full" />
            </div>
          ))}
      </div>      
    </section>
  );
};

export default Instagram;
