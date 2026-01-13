import {Image} from '@shopify/hydrogen';
import Button from '~/components/Common/Button';

const ReviewBox = () => {
  return (
    <section className="p-6 bg-[#f8f4ef] ">
      <div className="flex justify-center items-center my-4">
        <div>
          <div className="text-center">
            <h3 className="text-[20px] font-bold">Our Customers Love Us</h3>
            <p className="text-[#626262] text-[12.8px] mb-4">
              More than 10000 happy customers all over the Europe
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8">
            <a
              href="/customer-reviews"
              target="_blank"
              className="relative block"
            >
              <div className="absolute top-[34%] left-[7px] z-20 transform -translate-y-1/2">
                <p className="font-semibold text-[14px] uppercase">
                  12000+ Customer Reviews
                </p>
              </div>
              <Image
                src="/assets/images/customer_review_section_new.svg"
                height={300}
                width={300}
              />
            </a>

            {/* Other Reviews  */}
            <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
              {/* Google Reviews */}
              <a
                href="https://customerreviews.google.com/v/merchant?q=abelini.com&c=GB&v=19&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex justify-center lg:justify-start mx-auto lg:mx-0 mb-2"
                style={{width: 300, height: 90}}
              >
                {/* Text Overlay Left */}
                <div className="absolute left-4 top-3/4 -translate-y-1/2 text-black flex justify-center items-center gap-[15px]">
                  <h4 className="text-lg font-medium leading-none text-[24px]">
                    4.9
                  </h4>
                  <p className="text-xs leading-tight">
                    Out of <br /> 5 stars
                  </p>
                </div>

                {/* Text Overlay Right */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-black">
                  <p className="text-xs">5842 Reviews</p>
                </div>

                {/* Image */}
                <Image
                  src="/assets/images/customer_review_section_2_1_new.svg"
                  alt="Google"
                  loading="lazy"
                  width={300}
                  height={90}
                  className="w-[300px] h-[90px] object-contain"
                />
              </a>

              {/* Trusted Shops */}
              <a
                href="https://www.trustedshops.co.uk/buyerrating/info_X53E2D51D4B9C7693EC4DEB116F975061.html"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex justify-center lg:justify-start mx-auto lg:mx-0 mb-2"
                style={{width: 300, height: 90}}
              >
                {/* Text Overlay Left */}
                <div className="absolute left-4 top-3/4 -translate-y-1/2 text-black flex justify-center items-center gap-[15px]">
                  <h4 className="text-lg font-medium leading-none text-[24px]">
                    4.9
                  </h4>
                  <p className="text-xs leading-tight">
                    Out of <br /> 5 stars
                  </p>
                </div>

                {/* Text Overlay Right */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-black">
                  <p className="text-xs">3171 Reviews</p>
                </div>

                {/* Image */}
                <Image
                  src="/assets/images/customer_review_section_2_2_new.svg"
                  alt="Trusted Shops"
                  loading="lazy"
                  width={300}
                  height={90}
                  className="w-[300px] h-[90px] object-contain"
                />
              </a>

              {/* Trustpilot Widget Container */}
              <div
                className="mx-auto lg:mx-0 my-1 rounded-xl overflow-hidden bg-white"
                style={{width: 300, height: 120}}
              >
                {/* Trustpilot iframe injected externally */}
                <iframe
                  title="Customer reviews powered by Trustpilot"
                  loading="lazy"
                  src="https://widget.trustpilot.com/trustboxes/53aa8807dec7e10d38f59f32/index.html?templateId=53aa8807dec7e10d38f59f32&businessunitId=5982fc490000ff0005a809d7#locale=en-GB&styleHeight=120px&styleWidth=300px&styleBackground=black&theme=bark"
                  className="w-full h-full border-0 block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-start-5 md:col-span-3 flex justify-center">
          <Button
            variant="outline"
            className="!p-[10px] md:text-[14px]! font-normal w-full text-[18px] leading-3 mt-4 md:mt-0"
          >
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewBox;
