import React from 'react';
import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';

const OurStores = () => {
  return (
    <section className="px-0 lg:px-4 py-4 flex flex-col bg-[#FCF4EC]">
      <div className="w-full">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="w-full text-center mb-6 lg:mb-0 lg:w-10/12">
            <h2 className="text-[18px] sm:text-[34px] lg:text-[42px] font-bold text-[#111] leading-[30px] sm:leading-[38px] lg:leading-[48px] my-4 tracking-[1px] capitalize"> Our Stores </h2>
            <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111] text-center">
              Across our global showrooms, Abelini's experts guide you in finding or designing jewellery that reflects your story — crafted with precision,integrity, and lasting beauty at an exceptional value.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-10/12">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-9/12 flex justify-center order-2 lg:order-fiirst">
                <div className="flex flex-wrap w-full">
                  <div className="w-full md:w-4/12 lg:w-4/12 text-center mb-4">
                    <div className="mb-3">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0963/0410/3712/files/gb.png?v=1762321146"
                        alt="UK Flag"
                        width={50}
                        height={50}
                        loading="lazy"
                        className="mx-auto mb-3" />
                    </div>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]">Abelini Ltd,14 St Cross Street,Hatton Garden, London, EC1N 8UN </p>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]">United Kingdom</p>
                    <Link to="https://www.abelini.com/book-appointment" target="_blank"
                      className="btn-black w-auto"> Book an Appointment
                    </Link>
                  </div>

                  {/* Australia */}
                  <div className="w-full md:w-4/12 lg:w-4/12 text-center mb-4">
                    <div className="mb-3">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0963/0410/3712/files/au.png?v=1762321146"
                        alt="Australia Flag"
                        width={50}
                        height={50}
                        loading="lazy"
                        className="mx-auto mb-3" />
                    </div>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]">Abelini Pty Ltd Suite 804,365 Little Collins Street,Melbourne,VIC 3000</p>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]"> Australia</p>
                    <Link to="https://www.abelini.com.au/book-appointment" target="_blank"
                      className="btn-black"> Book an Appointment
                    </Link>
                  </div>
                  {/* Germany */}

                  <div className="w-full md:w-4/12 lg:w-4/12 text-center mb-4">
                    <div className="mb-3">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/0963/0410/3712/files/de.png?v=1762321146"
                        alt="Germany Flag"
                        width={50}
                        height={50}
                        loading="lazy"
                        className="mx-auto mb-3" />
                    </div>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]"> Coming soon </p>
                    <p className="text-[11px] sm:text-sm font-light sm:font-normal tracking-[0.8px] sm:tracking-[1px] mb-2 leading-[18px] sm:leading-5 lg:leading-7 text-[#111111]"> Germany </p>
                    <Link to="javascript:void(0)"
                      className="btn-black">Launching Soon
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-3/12 flex justify-center lg:items-center mb-6 lg:order-last sm:order-first">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0595/6635/8625/files/rutvi_img.jpg?v=1761897417"
                  alt="Abelini Store Expert"
                  className="object-cover"
                  width="100%"
                  height="100%"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OurStores;
