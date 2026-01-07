import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const BookAppointmentSection = () => {

  return (
    <section className="px-2 lg:px-8 py-8">
  <div className="flex flex-col lg:flex-row w-full">

   <div className="w-full lg:w-7/12">
  <Image
    src="https://cdn.shopify.com/s/files/1/0933/1789/0388/files/gate-view.jpg?v=1753332739"
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

        <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4">
          Step Into Luxury – Our New Jewellery Store Is Now Open
        </h2>

        <p className="text-[13px] sm:text-[15px] font-light text-[#111111] mb-8 tracking-[0.8px]">
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
