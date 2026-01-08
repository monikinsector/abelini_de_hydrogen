import { Image } from '@shopify/hydrogen';
import React from 'react';
import { Link } from 'react-router';

interface UspItem {
  target: string;
  src: string;
  alt: string;
  label: string;
}

const uspItems: UspItem[] = [
  {
    target: '#free_resizing',
    src: 'resize.svg',
    alt: 'Abelini Free Resizing',
    label: 'Free Resizing'
  },
  {
    target: '#information',
    src: 'free_delivery.svg',
    alt: 'Abelini Free Delivery',
    label: 'Free Delivery'
  },
  {
    target: '#sixty_day_return',
    src: 'return.svg',
    alt: 'Abelini 60-Day Risk-Free Returns',
    label: '60-Day Risk-Free Returns'
  },
  {
    target: '#diamond_certificate',
    src: 'certificate.svg',
    alt: 'Abelini Diamond & Valuation Certificate',
    label: 'Diamond & Valuation Certificate'
  },
  {
    target: '#attractive_packing',
    src: 'gifts.svg',
    alt: 'Abelini Attractive Packaging',
    label: 'Attractive Packaging'
  },
  {
    target: '#life_time_warranty',
    src: 'warranty.svg',
    alt: 'Abelini Lifetime Warranty',
    label: 'Lifetime Warranty'
  }
];

const UspIcons: React.FC = () => {
  return (
    <section className="flex py-8 lg:px-6">
      <div className="lg:w-full mx-auto px-4 ">
          <ul className="flex justify-center flex-wrap gap-2">
            {uspItems.map(({ target, src, alt, label }, index) => (
              <li key={index} className='flex justify-center text-center w-1/2 lg:w-[170px] pb-4 py-3'>
                <Link
                  to={"#"}
                  className="mx-auto cursor-pointer flex flex-col items-center"
                >
                  <Image
                    src={`/assets/images/icons/${src}`}
                    alt={alt}
                    width={42}
                  />
                  <p className="mt-2 text-center text-primary text-p-14 font-light tracking-wider">{label}</p>
                </Link>
              </li>
            ))}
          </ul>
        {/* </div> */}
      </div>
    </section>
  );
};

export default UspIcons;
