import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BespokeSection = () => {

  return (
      <div className='px-2 lg:px-8'>
          <div className="relative lg:min-w-[560px] min-h-[700px] lg:min-h-[unset] lg:min-w-[unset] bg-[#e7d7ba]  mx-auto lg:w-[100%] z-50 !mt-[40px]">
          <div className="w-full">
            <Image
              src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bespoke_image_1272x350.avif?v=1750485349"
              alt="Engagement Rings"
              className="w-full h-auto object-cover hidden lg:block"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bespoke_image_mobile_325x603.avif?v=1750485359"
              alt="Engagement Rings"
              className="w-full h-auto object-cover lg:hidden block"
            />
            
          </div>

          <div className="absolute lg:top-1/2 bottom-[0] lg:bottom-[unset] lg:left-0 lg:transform mt-auto lg:-translate-y-1/2 max-w-md p-8 min-w-[100%] lg:min-w-[unset]">
              <p className='mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]'>CREATE YOUR OWN DESIGN</p>
              <h2 className="select_category flex capitalize m-0 text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] lg:text-[42px] lg:leading-[48px] font-semibold text-[#111111] my-4 tracking-[1px]">
              Bespoke Design Service
              </h2>

              <p className="mt-3 text-[14px] leading-[20px] font-light text-[#111] mb-2 tracking-[0.8px]">
              ABELINI Jewellery can transform the latest trends and preferences of style into bespoke jewellery through exquisite design. So if you are looking for a unique design that has been made for you, ABELINI will make your dream a reality.
              </p>

              <Link to="/bespoke" className="mt-3 btn-transparent">
              Request Bespoke Design
              </Link>
          </div>
        </div>
      </div>
  )
}

export default BespokeSection;