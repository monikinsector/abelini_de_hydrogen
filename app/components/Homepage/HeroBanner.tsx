import { Image } from '@shopify/hydrogen';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router';

const HeroBanner = ({ data }: any) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getFieldValue = (fields: any, key: any) => {
    const field = fields?.find((f: any) => f.key === key);
    return field?.value || '';
  };

  const getFieldReference = (fields: any, key: any) => {
    const field = fields?.find((f: any) => f.key === key);
    return field?.reference || null;
  };

  if (!data?.heroBannerMetaobject?.fields) {
    return (
      <div className="grid grid-cols-1 pb-2 md:pb-0 md:grid-cols-5 min-h-[50vh] bg-[url('/assets/images/sale_background.webp')] bg-cover">

            <div className='col-span-2 flex justify-center'>
              {/* Desktop Image */}
              <Image src="/assets/images/hero_model.webp" alt="Hero Model" className="mx-auto md:block hidden"/>
            {/* Mobile Image */}
            <Image src="/assets/images/mobile/home/hero_model.webp" alt="Hero Model" className="h-[400px] mx-auto block md:hidden "/>
            </div>
    
            <div className="flex justify-center items-center w-full col-span-3">
                <div className="flex flex-col items-center">
                    <h3 className="text-red-500 mb-[-56px] text-[4rem] font-thin font-['Dancing_Script',serif]"><i>Sale</i></h3>
                    <h5 className="text-[4rem] font-regular font-['Cormorant_Garamond',serif]">New Year</h5>
    
                    <p className="text-muted font-thin tracking-wide text-center">Price Match Guarantee*</p>
                    <p className="text-muted font-thin tracking-wide text-center">Seen a better price? We will not just match it, we will beat it!</p>
    
                <div className="flex flex-wrap md:flex-row flex-col gap-4 mt-5">
                        <Link to="/sale" className="btn-black">Explore Offer</Link>
                        <Link to="/ready-to-deliver" className="btn-white">Quickship</Link>
                    </div>
                </div>
            </div>
          </div>
    )
  }

  const fields = data.heroBannerMetaobject.fields;
  
  const backgroundColor = getFieldValue(fields, 'background_color');
  const bannerImage = getFieldReference(fields, 'banner_image')?.image;
  const bannerLinkOnly = getFieldValue(fields, 'banner_link_only');
  const button1Link = getFieldValue(fields, 'button_1_link');
  const button1Text = getFieldValue(fields, 'button_1_text');
  const button2Link = getFieldValue(fields, 'button_2_link');
  const button2Text = getFieldValue(fields, 'button_2_text');
  const contentUnderTitle = getFieldValue(fields, 'content_under_title');
  const textColor = getFieldValue(fields, 'heading_and_text_color');
  const mainTitle = getFieldValue(fields, 'main_title');
  const saleFinishTime = getFieldValue(fields, 'sale_finish_time');
  const termsConditionsText = getFieldValue(fields, 'terms_conditions_text');

  const [guaranteeText, ...descriptionLines] = contentUnderTitle ? contentUnderTitle.split('\n') : ['Price Match Guarantee*', 'Seen a better price? We will not just match it, we will beat it!'];

  return (
    <section className="hero-banner-section">
      <div className="herobanner bgclr-light" style={{backgroundColor: backgroundColor}}>
        <div className="hero-row bg-hero-img">
          <div className="hero-image-section second-div">
            <a 
              href={bannerLinkOnly || "/ready-to-ship"} 
              className="banner-main-image-link"
              aria-label="View Ready to Ship Collection"
            >
              {bannerImage && (
                <img 
                  className="banner-main-image" 
                  src={bannerImage.url} 
                  alt={bannerImage.altText || "Sunday Sale - Wedding Collection"} 
                  width="1200" 
                  height="900"
                  loading="eager"
                />
              )}
            </a>
          </div>
          <div className="hero-content-section first-div home-div">
            <div className="slider-text-middle-main">
              <div className="slider-text-middle">
                <div className="hero-content-wrapper">
                  <h2 className="hero-main-title font-cormorant-garamond">
                    {mainTitle || "Sunday Sale"}
                  </h2>
                  <div className="hero-description-section">
                    <p className="hero-guarantee-text">
                      {guaranteeText}
                    </p>
                    <p className="hero-description-text">
                      {descriptionLines.join(' ')}
                    </p>
                  </div>
                  <div className="hero-button-container">
                    <a 
                      href={button1Link || "/sale"} 
                      className="btn btn-black btn-lg radius-24 btn-w-3"
                      aria-label={`Explore ${button1Text || "Sunday Sale Offer"}`}
                    >
                      {button1Text || "Explore Offer"}
                    </a>
                    <a 
                      href={button2Link || "/ready-to-deliver"} 
                      className="btn btn-white btn-lg radius-24 btn-w-3"
                      aria-label={`View ${button2Text || "Ready to Deliver Items"}`}
                    >
                      {button2Text || "Ready to Deliver"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-terms-container">
            <div className="hero-limited-offer">
              <a 
                href={button1Link || "/sale"} 
                className="hero-limited-text" 
                aria-label="View Limited Time Offer Details"
              >
                {termsConditionsText || "Limited Time Offer"}
              </a>
            </div>
            <a 
              href="/terms-of-use" 
              className="hero-terms-text" 
              aria-label="View Terms and Conditions"
            >
              * T&C's Applied
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;