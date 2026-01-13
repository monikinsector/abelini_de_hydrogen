import { Image } from '@shopify/hydrogen';
import React from 'react';
import { Link } from 'react-router';
import { uspItems, type uspItem } from './Data/homepage.data';

const UspIcons: React.FC = () => {
  return (
    <section className="flex py-8 lg:px-6">
      <div className="w-full mx-auto px-4">
          <ul className="flex justify-center flex-wrap gap-6 grid grid-cols-2 lg:grid-cols-6">
            {uspItems.map((item: uspItem) => (
              <li key={item.id} className='flex justify-center text-center col-span-1 items-center my-3'>
                <Link
                  to={item.target}
                  className="mx-auto cursor-pointer flex flex-col items-center"
                >
                  <Image
                    src={`/assets/images/icons/${item.src}`}
                    alt={item.alt}
                    width={42}
                  />
                  <p className="mt-3 text-center text-primary text-p-13 font-light tracking-wider capitalize">{item.label}</p>
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
