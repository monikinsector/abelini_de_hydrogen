import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BespokeSection = () => {

  return (
      <div className='px-2 lg:px-8'>
          <div className="relative lg:min-w-[560px] min-h-[700px] lg:min-h-[unset] lg:min-w-[unset] bg-primary  mx-auto lg:w-[100%] z-50 !mt-[40px]">
          <div className="w-full">
            <Image
              src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bespoke_image_1272x350.avif?v=1750485349"
              alt="Engagement Rings"
              className="w-full h-auto object-cover hidden lg:block"
              width={1272}
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/bespoke_image_mobile_325x603.avif?v=1750485359"
              alt="Engagement Rings"
              className="w-full h-auto object-cover lg:hidden block"
              width={325}
            />
            
          </div>

          <div className="absolute lg:top-1/2 bottom-[0] lg:bottom-[unset] lg:left-0 lg:transform mt-auto lg:-translate-y-1/2 max-w-md p-8 min-w-[100%] lg:min-w-[unset]">
              <p className='text-p-14 font-light text-primary tracking-wider'>CREATE YOUR OWN DESIGN</p>
              <h3 className="text-h3 font-bold text-primary mb-3 tracking-wider flex justify-left">
              Bespoke Design Service
              </h3>

              <p className="text-p-14 font-light text-primary mb-8 tracking-wider">
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