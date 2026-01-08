import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BookAppointmentSection = () => {

  return (
    <section className="px-2 lg:px-8 py-8">
  <div className="flex flex-col lg:flex-row w-full">

   <div className="w-full lg:w-7/12">
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


    <div className="w-full lg:w-5/12 bg-gray-100 flex items-center">
      <div className="max-w-3xl px-4 lg:px-4 py-10">

        <h3 className="text-[30px] font-bold text-[#111111] leading-[38px] my-4 tracking-[1px] flex justify-left">
          Step Into Luxury – Our New Jewellery Store Is Now Open
        </h3>

        <p className="text-[13px] leading-[20px] font-light text-[#111111] mb-8 tracking-[0.8px]">
          Step into luxury with our new jewellery store, now open in the heart of London.
          Experience the finest selection of fine jewellery, diamonds, and precious stones.
        </p>

        <Link to="/book-appointment" className="mt-3 btn-transparent">
          Book an appointment now
        </Link>

      </div>
    </div>

  </div>
</section>
  )
}

export default BookAppointmentSection;
