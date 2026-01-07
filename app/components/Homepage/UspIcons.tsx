import { Image } from '@shopify/hydrogen';
import React from 'react';

interface UspItem {
  id: string;
  target: string;
  src: string;
  alt: string;
  label: string;
}

const uspItems: UspItem[] = [
  {
    id: 'free_resizing',
    target: '#free_resizing',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/resize.svg?v=2024173836',
    alt: 'Abelini Free Resizing',
    label: 'Free Resizing'
  },
  {
    id: 'information',
    target: '#information',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/free_delivery.svg?v=2024173836',
    alt: 'Abelini Free Delivery',
    label: 'Free Delivery'
  },
  {
    id: 'sixty_day_return',
    target: '#sixty_day_return',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/return.svg?v=2024173836',
    alt: 'Abelini 60-Day Risk-Free Returns',
    label: '60-Day Risk-Free Returns'
  },
  {
    id: 'diamond_certificate',
    target: '#diamond_certificate',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/certificate.svg?v=2024173836',
    alt: 'Abelini Diamond & Valuation Certificate',
    label: 'Diamond & Valuation Certificate'
  },
  {
    id: 'attractive_packing',
    target: '#attractive_packing',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/gifts.svg?v=2024173836',
    alt: 'Abelini Attractive Packaging',
    label: 'Attractive Packaging'
  },
  {
    id: 'life_time_warranty',
    target: '#life_time_warranty',
    src: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/warranty.svg?v=2024173836',
    alt: 'Abelini Lifetime Warranty',
    label: 'Lifetime Warranty'
  }
];

const UspIcons: React.FC = () => {
  return (
    <section className="flex py-4 lg:px-6">
      <div className="w-[1/2] lg:w-full mx-auto px-4 ">
        {/* <div className="w-[110px] h-[120px]"> */}
          <ul className="flex justify-center flex-wrap ">
            {uspItems.map(({ id, target, src, alt, label }) => (
              <li key={id} className='flex justify-center text-center w-1/2 lg:w-[170px] pb-4 lg:pb-10 py-3'>
                <a
                  className="block flex flex-col items-center mx-auto cursor-pointer"
                  data-toggle="modal"
                  data-target={target}
                >
                  <Image
                    src={src}
                    alt={alt}
                    loading="lazy"
                    width={42}
                    height={42}
                    className="w-[42px] h-[42px] object-contain"
                  />
                  <p className="mt-2 text-center">{label}</p>
                </a>
              </li>
            ))}
          </ul>
        {/* </div> */}
      </div>
    </section>
  );
};

export default UspIcons;
