import {Image} from '@shopify/hydrogen';
import ProductDetails from '~/components/Product/ProductDetails';
import Breadcrumb from '~/components/Common/Breadcrumb';
import UspIcons from '~/components/Homepage/UspIcons';
import ProductGallery from '~/components/Product/ProductGallery';
import ProductSpecs from '~/components/Product/ProductSpecs';
import TopStickBar from '~/components/Common/TopStickBar';
import ImageTab from '~/components/Product/ImageTab';
import Button from '~/components/Common/Button';
import ProductImagesMobile from '~/components/Product/ProductImageMobile';
import ReviewBox from '~/components/Product/ReviewBox';
import RelatedMatchingProducts from '~/components/Product/RelatedMatchingProducts';
import SeenOn from '~/components/Product/SeenOnSection';
import MobileOptionAccordion from '~/components/Product/MobileOptionsAccordion';

type Props = {};

const ProductDetail = (props: Props) => {
  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: 'Engagement Rings', href: '/engagement-rings'},
    {label: 'Classic Solitaire', href: '/solitaire-engagement-rings'},
    {
      label:
        'Low Set Round 9k White Gold Lab Grown Diamond Classic Solitaire Engagement Rings',
    },
  ];

  return (
    <>
      <TopStickBar />
      <section id="product-detail">
        <div className="max-w-285 mx-auto">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex flex-col lg:flex-row gap-4 md:mt-2">
            <ProductGallery
              imageSrc="/assets/images/ring.webp"
              imageAlt="Low set ring"
              mobileTabs={[
                {
                  key: 'images',
                  label: 'Images',
                  iconSrc: '/assets/images/icons/image.svg',
                },
                {
                  key: 'videos',
                  label: 'Videos',
                  iconSrc: '/assets/images/icons/image.svg',
                },
                {
                  key: '360',
                  label: '360',
                  iconSrc: '/assets/images/icons/image.svg',
                },
              ]}
            />
            <ProductImagesMobile/>
            {/* Image Tabs  */}
            <ImageTab />

            {/* Mobile Options Accordion */}
            <MobileOptionAccordion/>

            {/* <ProductOptionsAccordion/> */}

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

      <div className="!max-w-285 mx-auto">
        <UspIcons />
      </div>

      {/* Product Description And Review */}
      <section className="!max-w-285 mx-auto py-6 md:mb-6! border-t border-t-[#dee2e6]">
        <div className="flex justify-center flex-col md:flex-row gap-6">
          {/* Product description  */}
          <div className="flex-1 px-[15px]">
            {/* heading  */}
            <div className="flex justify-between flex-col md:flex-row  md:items-center gap-2">
              <h2 className="text-2xl capitalize font-medium leading-1.2 text-[#111]">Product Description</h2>
              <p className="text-sm leading-6">
                <span className="text-[#BF8F5F]! mr-1">Reference Code:</span>
                RINE3170-LBG
              </p>
            </div>

            <p className="text-[#626262] text-[12.8px] pt-2 leading-[1.5] pb-4">
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
              <div className="w-full flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
              <div className="w-full md:w-1/2">
                <ProductSpecs
                heading="Products Information"
                  specs={[
                    {key: 'style', label: 'Style', value: 'Classic Solitaire'},
                    {key: 'setting', label: 'Setting Type', value: 'Low Set'},
                    {key: 'metal', label: 'Metal', value: '9K White Gold'},
                    {key: 'ring-size', label: 'Ring Size', value: 'M'},
                    {key: 'setting-style', label: 'Setting Style', value: 'Plain'},
                    {key: 'band-style', label: 'Band Style', value: 'Plain'},
                    {key: 'shank-width', label: 'Shank Width', value: 'Standard'},
                    {key: 'stone-type', label: 'Stone Type', value: 'Lab Grown Diamond'},
                    {key:'shape', label: 'Shape', value: 'Round'},
                    {key:'carat', label: 'Carat', value: '0.20'},
                    {key:'clarity', label: 'Clarity', value: 'SI2'},
                    {key:'colour', label: 'Colour', value: 'I'},
                    {key:'cut', label: 'Cut', value: 'Good'},
                    {key:'certificate', label: 'Certificate', value: 'ABELINI'},
                  ]}
                />
              </div>

              <div className="w-full md:w-1/2">
                <ProductSpecs
                  heading="Product Dimension"
                  specs={[
                    {key: 'band', label: 'Band Thickness', value: '1.5mm', showInfoIcon: true},
                    {key: 'height', label: 'Setting Height', value: '4.8mm', showInfoIcon: true},
                    {key: 'shoulder', label: 'Shoulder Width', value: '0.9mm', showInfoIcon: true},
                    {key: 'shank', label: 'Shank Width', value: '2.1mm', showInfoIcon: true},
                  ]}
                />
              </div>
              </div>



              <div className="w-full">
              <p className='text-[#BF8F5F] capitalize text-[14px] my-2'>Similar Items</p>

                <div className="text-[12.8px]">
                  <a
                    className="hover:text-[#bf8f5f] underline"
                    href="/classic-solitaire-engagement-rings"
                  >
                    Classic Solitaire Engagement Rings
                  </a>
                  <span className="mx-1">|</span>
                  <a
                    className="hover:text-[#bf8f5f] underline"
                    href="/white-gold-engagement-rings"
                  >
                    White Gold Engagement Rings
                  </a>
                  <span className="mx-1">|</span>
                  <a
                    className="hover:text-[#bf8f5f] underline"
                    href="/lab-grown-diamond-engagement-rings"
                  >
                    Lab Grown Diamond Engagement Rings
                  </a>
                  <span className="mx-1">|</span>
                  <a
                    className="hover:text-[#bf8f5f] underline"
                    href="/round-engagement-rings"
                  >
                    Round Engagement Rings
                  </a>
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
      <ReviewBox />

      <RelatedMatchingProducts
      relatedProducts={[
        {id: "1", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "2", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "3", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "4", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},

      ]}
      matchingProducts={[
        {id: "1", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "2", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "3", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""},
        {id: "4", name: "4 Prong Round Diamond White Gold / Platinum Engagement Ring", price: "£377", image: "/assets/images/setpln_bandpln_shnkstd_none_med_ww_di_rnd_m0001.webp", href: ""}
        
      ]}
      />
      <SeenOn />
    </>
  );
};

export default ProductDetail;
