import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

type Props = {};

const TopStickBar = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const scrollTop = window.scrollY || window.pageYOffset || doc.scrollTop || 0;
          const maxScroll = doc.scrollHeight - window.innerHeight;
          const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setVisible(pct >= 0.1);
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initialize on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`topstickbar md:py-[10px] fixed top-0 left-0 right-0 z-[9999] transition-opacity duration-300 ease-in-out shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] bg-white w-full ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="container mx-auto lg:px-0 py-1 px-[15px] text-[12.8px] max-w-[1140px]">
        <div className="flex justify-center">
          {/* <!-- LEFT INFO COLUMN --> */}
          <div className="flex lg:w-4/12 w-6/12 p-0 justify-between">
            <div className="hidden lg:block text-sm p-0 color-BF8F5F text-[#BF8F5F] lg:text-[12.8px] ">
              Product
              <br />
              Information
            </div>
 
            <div className="hidden lg:flex flex-col p-0">
              <div className="max-h-[20px] overflow-hidden">
                <span className="metal_purity_label mr-1!">Metal:</span>
                <span className="metal_purity">v9K White Gold</span>
              </div>
              <div className="stone_clarity_div">
                <span className="stone_clarity_label mr-1!">Clarity: </span>
                <span className="stone_clarity mr-1!">SI2</span>
              </div>
              <div className="stone_color_div">
                <span className="stone_color_label mr-1!">Color: </span>
                <span className="stone_color mr-1!">I</span>
              </div>
            </div>
 
            <div className="flex flex-col p-0">
              <div className="block lg:hidden max-h-[20px] overflow-hidden">
                <span>Metal:</span>
                <span className="metal_purity">9K White Gold</span>
              </div>
 
              <div className="stone_carat_div">
                <span className="mr-1!">Carat:</span>
                <span className="stone_carat">0.20</span>
              </div>
 
              <div className="product_option_phone_view stone_clarity_div block">
                <span className="mr-1!">Clarity:</span>
                <span className="stone_clarity">SI2</span>
              </div>
 
              <div>
                <span className="mr-1!">Certificate:</span>
                <span className="stone_certificate">ABELINI</span>
              </div>
 
              <div className="product_option_phone_view stone_color_div block">
                <span className="mr-1!">Color:</span>
                <span className="stone_color">I</span>
              </div>
            </div>
          </div>
 
          {/* <!-- RIGHT CONTENT COLUMN --> */}
          <div className="lg:w-8/12 w-6/12 p-0">
            <div className="flex flex-wrap m-0">
              {/* <!-- PRICE BLOCK --> */}
              <div className="lg:w-4/12 w-full p-0 flex justify-center price_block">
                <div className="flex flex-wrap m-0 lg:ml-4 ml-0">
                  <div className="flex flex-col p-0">
                    <span className="px-1">Our price</span>
                    <span
  className="final_original_price org_price px-1 text-sm
             relative inline-block
             before:content-['']
             before:absolute
             before:left-0
             before:top-1/2
             before:w-full
             before:h-[1.5px]
             before:-translate-y-1/2
             before:bg-gray-500">
  £392
</span>
                  </div>
                  <div className="p-0">
                    <i className="bi bi-code-slash"></i>
                    <span className="final_prod_price sticky-price-font text-[22px] text-[#c21807] lg:text-[#111] lg:font-semibold px-[15px] lg:text-[24px] font-semibold leading-9 md:text-[16px]">
                      £346
                    </span>
                  </div>
                  <div className="hidden lg:block text-[#0a5050] text-xs px-1 w-full">
                    <a
                      href="/"
                      className="pt-1 info-education showfinance_sticky"
                    >
                      Or <span className="lowest_finance">£68.50</span>/ Month
                    </a>
                  </div>
                </div>
              </div>
 
              {/* <!-- NOT AVAILABLE BLOCK --> */}
              <div className="hidden lg:w-4/12 w-full p-0 justify-center noprice_block">
                <div className="m-0 lg:ml-4 ml-0">
                  <div>
                    This product combination is not available.
                    <br />
                    Please call us on +44 (0) 2038051270 for further assistance
                  </div>
                </div>
              </div>
 
              {/* <!-- CTA BUTTONS --> */}
              <div className="flex lg:w-8/12 w-full p-0 justify-center flex-col mt-2">
                <div className="flex flex-wrap m-0">
                  <div className="lg:w-6/12 w-full px-[15px]">
                    <Button variant="orange" className="w-full md:text-sm!" >Add to Cart</Button>
                  </div>
 
                  <div className="hidden lg:block lg:w-6/12 w-full px-[15px]">
                    <Button variant="outline" className="w-full md:text-xs!" >Book Showroom Appointment</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default TopStickBar;
 