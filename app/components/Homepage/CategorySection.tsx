import { Image } from '@shopify/hydrogen';
import React from 'react';
import { Link } from 'react-router';
import { categories } from './Data/homepage.data';

const CategorySection = () => {

  return (
    <section className="flex flex-col">
      <div className="container-fluid px-4 my-6">
        <div className="flex justify-between items-center border-b border-gray-200 mb-8">
          <h2 className="lg:text-h3 text-h3-m lg:leading-h3 leading-h3-m font-bold text-primary my-4 tracking-wider">
            Select Category
          </h2>
          <Link to="/all-categories" className="flex items-center gap-1 text-p-14 underline font-light tracking-wider text-primary">
            Show All
            <Image src="/assets/images/icons/arrow-right-small.svg" alt="Arrow Right" width={22} height={22} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 lg:gap-8">
          {categories.map((category: Category) => (
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