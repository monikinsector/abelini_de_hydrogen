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

        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          Step into luxury with our new jewellery store, now open in the heart of London.
          Experience the finest selection of fine jewellery, diamonds, and precious stones.
        </p>

        <a href="https://www.test.com/book-appointment" className="cursor-pointer rounded-[24px] border border-black bg-transparent px-16 py-2 text-[14px] text-base hover:bg-black hover:text-white text-black transition-all duration-[450ms] w-full sm:w-auto"
        >
          Book an appointment now
        </a>

      </div>
    </div>

  </div>
</section>
  )
}

export default BookAppointmentSection;
