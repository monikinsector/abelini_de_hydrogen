import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BespokeSection = () => {

  return (

    <section className="flex flex-col">
      <div className="container-fluid px-4 my-6">
          <div className="relative">
            <div className="w-full">
              <Image
                src="/assets/images/bespoke_image_1272x350.webp"
                alt="Engagement Rings"
                className="w-full h-auto object-cover hidden lg:block"
                width={1272}
              />
              <Image
                src="/assets/images/mobile/bespoke_image_mobile_325x603.webp"
                alt="Engagement Rings"
                className="w-full h-auto object-cover lg:hidden block"
                width={325}
              />
              
            </div>
            <div className="absolute lg:top-1/2 bottom-[0] lg:bottom-[unset] lg:left-0 lg:transform mt-auto lg:-translate-y-1/2 max-w-md lg:px-8 px-4 min-w-[100%] lg:min-w-[unset] my-6">
                <p className='text-p-14 font-light text-primary tracking-wider mb-3'>CREATE YOUR OWN DESIGN</p>
                <h3 className="text-h3 font-bold text-primary mb-3 tracking-wider flex justify-left">
                Bespoke Design Service
                </h3>

                <p className="text-p-14 font-light text-primary mb-3 tracking-wider">
                ABELINI Jewellery can transform the latest trends and preferences of style into bespoke jewellery through exquisite design. So if you are looking for a unique design that has been made for you, ABELINI will make your dream a reality.
                </p>

                <Link to="/bespoke" className="mb-3 btn-transparent lg:w-auto w-full flex justify-center">
                Request Bespoke Design
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeSection;