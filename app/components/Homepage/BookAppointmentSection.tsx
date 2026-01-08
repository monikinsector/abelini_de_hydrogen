import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BookAppointmentSection = () => {

  return (
    <section>
      <div className="container-fluid px-4 my-6">
        <div className="flex flex-col lg:flex-row w-full bg-[#f6f6f6]">

          <div className="w-full">
            <Image
              src="/assets/images/gate-view.webp"
              alt="Visit Showroom"
              className="
                w-full 
                h-[400px] object-cover 
                lg:h-full
              "
            />
          </div>

          <div className="w-full lg:w-5/12 flex flex-col items-center px-4">

              <h3 className="text-h3 font-bold text-primary my-4 tracking-wider flex justify-left">
                Step Into Luxury – Our New Jewellery Store Is Now Open
              </h3>

              <p className="text-p-13 font-light text-primary mb-4 tracking-wider">
                Step into luxury with our new jewellery store, now open in the heart of London.
                Experience the finest selection of fine jewellery, diamonds, and precious stones.
              </p>

              <Link to="/book-appointment" className="mb-4 btn-transparent lg:w-auto w-full flex justify-center">
                Book an appointment now
              </Link>

          </div>

        </div>
      </div>
    </section>
  )
}

export default BookAppointmentSection;
