import { Image } from '@shopify/hydrogen';
import React from 'react';
import { Link } from 'react-router';
import { uspItems, type uspItem } from './Data/homepage.data';

const UspIcons: React.FC = () => {
  return (
    <section className="flex my-8 lg:px-6 px-4 justify-center items-center">
      <div className="container flex justify-center flex-wrap grid grid-cols-2 lg:grid-cols-6">
        {uspItems.map((item: uspItem) => (
          <Link
            key={item.id}
            to={item.target}
            className="flex flex-col items-center col-span-1 lg:mb-0 mb-6"
          >
            <Image
              src={`/assets/images/icons/${item.src}`}
              alt={item.alt}
              width={42}
              height={42}
              className="mx-auto"
            />
            <p className="mt-3 text-center text-primary text-p-13 font-light tracking-wider capitalize max-w-[150px]">{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UspIcons;
