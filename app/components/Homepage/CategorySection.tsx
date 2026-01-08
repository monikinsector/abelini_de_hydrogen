import React from 'react';
import { Link } from 'react-router';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Engagement Rings',
      image: '/assets/images/home/rings_300x300.webp',
      link: '/engagement-rings'
    },
    {
      id: 2,
      name: 'Wedding Rings',
      image: '/assets/images/home/wedding_300x300.webp',
      link: '/wedding-rings'
    },
    {
      id: 3,
      name: 'Eternity Rings',
      image: '/assets/images/home/eternity-300x300.webp',
      link: '/diamond-rings/eternity-rings'
    },
    {
      id: 4,
      name: 'Necklace',
      image: '/assets/images/home/pendants.webp',
      link: '/pendants'
    },
    {
      id: 5,
      name: 'Earrings',
      image: '/assets/images/home/earrings.webp',
      link: '/earrings'
    },
    {
      id: 6,
      name: 'Bracelets',
      image: '/assets/images/home/bracelets.webp',
      link: '/bracelets'
    }
  ];

  return (
    <section className="lg:px-10 py-8 flex flex-col text-center overflow-x-hidden home-category">
      <div>
        <div className="flex justify-between items-center mb-10 md:mb-[30px] border-b border-[#d6d6d6]">
          <h2 className="select_category flex capitalize m-0 text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] lg:text-[42px] lg:leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px]">
            Select Category
          </h2>
          <Link to="/all-categories" className="hidden md:inline-flex items-center gap-1 text-sm font-normal underline text-[#111] transition-opacity duration-300 hover:opacity-70">
            Show All
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              aria-hidden="true" 
              focusable="false" 
              width="1em" 
              height="1em" 
              style={{ fontSize: '22px', lineHeight: '22px', transform: 'rotate(360deg)' }} 
              preserveAspectRatio="xMidYMid meet" 
              viewBox="0 0 256 256" 
              className="iconify" 
              data-icon="ph:caret-right-light" 
              data-inline="false"
            >
              <path 
                fill="currentColor" 
                d="m180.24 132.24l-80 80a6 6 0 0 1-8.48-8.48L167.51 128L91.76 52.24a6 6 0 0 1 8.48-8.48l80 80a6 6 0 0 1 0 8.48"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-3 md:gap-[15px] lg:gap-5">
          {categories.map((category) => (
            <Link to={category.link} 
              key={category.id} 
              className="block no-underline text-center transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full aspect-square overflow-hidden mb-3 bg-[#f5f5f5]">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full rounded-none object-cover transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <p className="title mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        <Link to="/all-categories" className="btn-black block w-full flex justify-center items-center mt-4 md:hidden">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;