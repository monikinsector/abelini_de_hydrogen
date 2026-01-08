import { Image } from '@shopify/hydrogen';
import React from 'react';
import { Link } from 'react-router';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Engagement Rings',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/rings_300x300.avif?v=1750478975',
      link: '/engagement-rings'
    },
    {
      id: 2,
      name: 'Wedding Rings',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/wedding_300x300.avif?v=1750478985',
      link: '/wedding-rings'
    },
    {
      id: 3,
      name: 'Eternity Rings',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/earrings.avif?v=1750478975',
      link: '/diamond-rings/eternity-rings'
    },
    {
      id: 4,
      name: 'Necklace',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/pendants.avif?v=1750478975',
      link: '/pendants'
    },
    {
      id: 5,
      name: 'Earrings',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/earrings.avif?v=1750478975',
      link: '/earrings'
    },
    {
      id: 6,
      name: 'Bracelets',
      image: 'https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bracelets.avif?v=1750478975',
      link: '/bracelets'
    }
  ];

  return (
    <section className="lg:px-10 py-8 flex flex-col text-center overflow-x-hidden home-category">
      <div>
        <div className="flex justify-between items-center border-b border-gray-200 mb-8">
          <h2 className="text-h3 my-4 font-bold text-primary tracking-wider">
            Select Category
          </h2>
          <Link to="/all-categories" className="flex items-center gap-1 text-p-14 underline font-light tracking-wider text-primary">
            Show All
            <Image src="/assets/images/icons/arrow-right-small.svg" alt="Arrow Right" width={22} height={22} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link to={category.link} 
              key={category.id} 
              className="block no-underline text-center transition-transform duration-300 cursor-pointer" 
            >
              <div className="w-full aspect-square overflow-hidden mb-3 bg-[#f5f5f5]">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                  width={300}
                />
              </div>
              <p className="text-p-14 font-light text-primary my-2 tracking-wider">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        <Link to="/all-categories" className="btn-black w-full flex justify-center items-center mt-4 md:hidden text-p-14 font-light tracking-widest">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;