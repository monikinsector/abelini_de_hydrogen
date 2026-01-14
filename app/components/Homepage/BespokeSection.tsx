import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { bespokeImages, type BespokeImage } from './Data/homepage.data';

const BespokeSection = () => {

  return (

    <section className="flex flex-col">
      <div className="container-fluid lg:px-10 px-4 lg:py-6 py-4">
          <div className="relative">
            <div className="w-full">
              {bespokeImages.map((image: BespokeImage) => (
                <React.Fragment key={image.id}>
                  {/* Desktop Image */}
                  <Image
                    src={image.image}
                    alt="Bespoke Image"
                    className="w-full h-auto object-cover hidden lg:block"
                    width={1272}
                  />
                  {/* Mobile Image */}
                  <Image
                    src={image.mobileImage}
                    alt="Bespoke Image"
                    className="w-full h-auto object-cover block lg:hidden"
                    width={325}
                  />
                </React.Fragment>
              ))}
              
            </div>
            <div className="absolute lg:top-1/2 lg:-translate-y-1/2 lg:w-[400px] lg:left-[30px] lg:bottom-[unset] bottom-[0] lg:p-0 p-5">
                <p className='text-p-14 font-light text-primary tracking-wider'>
                  CREATE YOUR OWN DESIGN
                </p>
                <h3 className="lg:text-h3 text-h3-m lg:leading-h3 leading-h3-m font-bold text-primary mb-4 tracking-wider flex justify-left">
                  Bespoke Design Service
                </h3>

                <p className="lg:text-p-14 text-p-12 font-light text-primary mb-4 tracking-wider">
                ABELINI Jewellery can transform the latest trends and preferences of style into bespoke jewellery through exquisite design. So if you are looking for a unique design that has been made for you, ABELINI will make your dream a reality.
                </p>

                <Link to="/bespoke" className="flex justify-center lg:w-fit w-full btn-transparent">
                Request Bespoke Design
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeSection;