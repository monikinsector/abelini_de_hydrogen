import { Image } from '@shopify/hydrogen';
import ProductDetails from '~/components/Product/ProductDetails';
import Breadcrumb from '~/components/Common/Breadcrumb';
import UspIcons from '~/components/Homepage/UspIcons';
import ProductGallery from '~/components/Product/ProductGallery';
import ProductSpecs from '~/components/Product/ProductSpecs';

type Props = {};

const ProductDetail = (props: Props) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Engagement Rings', href: '/engagement-rings' },
    {
      label:
        'Low Set Round 9k White Gold Lab Grown Diamond Classic Solitaire Engagement Rings',
    },
  ];

  return (
    <>

      <section id="product-detail">
        <div className="max-w-285 mx-auto">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <ProductGallery
                imageSrc="/assets/images/ring.webp"
                imageAlt="Low set ring"
                mobileTabs={[
                  { key: 'images', label: 'Images', iconSrc: '/assets/images/icons/image.svg' },
                  { key: 'videos', label: 'Videos', iconSrc: '/assets/images/icons/image.svg' },
                  { key: '360', label: '360', iconSrc: '/assets/images/icons/image.svg' },
                ]}
              />
            </div>

            <div className="flex-1">
              <ProductDetails
                title={
                  'Low Set Round 9k White Gold Lab Grown Diamond Classic Solitaire Engagement Rings'
                }
                sku="RINE3170-BD-RND"
                reviewsText="12000+ Customer Reviews"
                rating={5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* As Seen On Section  */}
      {/* <section>
            <div>
                <h2>As Seen On</h2>
            </div>
        </section> */}

      <div className="!max-w-285 mx-auto">
        <UspIcons />
      </div>

      {/* Product Description And Review */}
      <section className="!max-w-285 mx-auto py-6 border-t border-t-[#dee2e6]">
        <div className="flex justify-center flex-col md:flex-row gap-6">
          {/* Product description  */}
          <div className="flex-1 px-[15px]">
            {/* heading  */}
            <div className="flex justify-between items-center flex-col md:flex-row md:items-start!">
              <h2 className="text-2xl mb-4">Product Description</h2>
              <p className="text-[14px]">
                <span className="text-[#BF8F5]! mr-1">Reference Code:</span>
                RINE3170-LBG
              </p>
            </div>

            <p className="text-[#626262] text-[12.8px] pb-4]">
              Introducing our Classic Solitaire Engagement Rings, available in
              9K or 18K white, yellow, rose gold or platinum. Choose from a
              range of stone types including Natural Diamond, Lab Grown Diamond,
              Moissanite, Black Diamond, Amethyst, Ruby, Emerald, Blue Sapphire,
              Garnet, Aquamarine, Citrine, Peridot, Topaz and Tourmaline.
              Customise your ring with diamonds ranging from 0.20ct to 10.00ct,
              with options for D to I colour and IF to I1 clarity grades. Select
              from a variety of shapes such as Round, Princess, Emerald,
              Asscher, Oval, Pear, Heart, Marquise and Cushion. This timeless
              design is perfect for engagement rings that will be cherished for
              a lifetime.
            </p>

            {/* Product information and product dimensions */}
            <div className="flex flex-wrap justify-between gap-4">
              <div className="w-full md:w-1/2">
                <ProductSpecs
                  specs={[
                    { key: 'style', label: 'Style', value: 'Classic Solitaire' },
                    { key: 'setting', label: 'Setting Type', value: 'Low Set' },
                    { key: 'stone', label: 'Stone Type', value: 'Lab Grown Diamond' },
                  ]}
                />
              </div>

              <div className="w-full md:w-1/2">
                <ProductSpecs
                  specs={[
                    { key: 'band', label: 'Band Thickness', value: '1.5mm' },
                    { key: 'height', label: 'Setting Height', value: '4.8mm' },
                    { key: 'shoulder', label: 'Shoulder Width', value: '0.9mm' },
                    { key: 'shank', label: 'Shank Width', value: '2.1mm' },
                  ]}
                />
              </div>

              <div className="w-full">
                <p className="text-[#BF8F5F] capitalize text-14px my-2">Similar Items</p>
                <div className="text-[12.8px]">
                  <a className="hover:text-[#bf8f5f] underline mr-2" href="/classic-solitaire-engagement-rings">Classic Solitaire Engagement Rings</a>
                  <span className="mx-2">|</span>
                  <a className="hover:text-[#bf8f5f] underline mr-2" href="/white-gold-engagement-rings">White Gold Engagement Rings</a>
                  <span className="mx-2">|</span>
                  <a className="hover:text-[#bf8f5f] underline mr-2" href="/lab-grown-diamond-engagement-rings">Lab Grown Diamond Engagement Rings</a>
                  <span className="mx-2">|</span>
                  <a className="hover:text-[#bf8f5f] underline" href="/round-engagement-rings">Round Engagement Rings</a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Review  */}
          <div className="flex-1 px-[15px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mb-4">Product Review</h2>
            </div>
            <div className="w-full">
              <div className="h-[500px] overflow-auto rounded-md">
                <iframe
                  title="Customer reviews powered by Trustpilot"
                  loading="lazy"
                  src="https://widget.trustpilot.com/trustboxes/5717796816f630043868e2e8/index.html?templateId=5717796816f630043868e2e8&amp;businessunitId=5982fc490000ff0005a809d7#locale=en-US&amp;styleHeight=500px&amp;styleWidth=100%25&amp;theme=light&amp;name=Solitaire%20Engagement%20Rings%20Platinum%20%2F%20Rose%20%2F%20White%20Gold%20Brilliant%20Cut%20Diamond&amp;sku=RINE3170&amp;textColor=%23191919&amp;starColor=%2300b67a&amp;fullwidth=false&amp;noReviews=hide"
                  style={{
                    position: 'relative',
                    height: '500px',
                    width: '100%',
                    borderStyle: 'none',
                    display: 'block',
                    overflow: 'hidden',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Box  */}
      <section className="p-6 bg-[#f8f4ef]">
        {/* heading  */}
        <div className="flex justify-center items-center">
          <div>
            <div className="text-center">
              <h3 className="text-[20px] font-bold">Our Customers Love Us</h3>
              <p className="text-[#626262] text-[12.8px] mb-4">
                More than 10000 happy customers all over the Europe
              </p>
            </div>

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
          </div>
        </div>
        {/* <a
          className="cursor-pointer rounded-3xl border p-2.5  hover:bg-black mx-auto"
          href="/"
        >
          View All Reviews
        </a> */}
      </section>
    </>
  );
};

export default ProductDetail;
