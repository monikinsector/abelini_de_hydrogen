import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { cn } from '~/lib/utils';

const HeroBanner = ({ data }: any) => {
  console.log("data", data)
  if (!data) return null;
  const { background_image, main_title, content_under_title, button_1_text, button_1_link, button_2_text, button_2_link, desktop_banner_image, mobile_banner_image, terms_conditions_text, banner_link_only, background_color } = data;
  return (
    <div className={cn("relative grid grid-cols-1 pb-2 md:pb-0 md:grid-cols-5 min-h-[50vh] bg-cover")} style={{
      backgroundImage: `url(${background_image.url})`,
      backgroundColor: background_color,
    }}>
          <div className='col-span-2 flex justify-center'>
            {/* Desktop Image */}
            <Link to={banner_link_only} className='block h-full w-full flex'>
              <Image src={desktop_banner_image.url} alt={desktop_banner_image.altText} className="mx-auto md:block hidden object-bottom"/>
            </Link>
          {/* Mobile Image */}
          <Image src={mobile_banner_image.url} alt={mobile_banner_image.altText} className="h-[400px] mx-auto block md:hidden "/>
          </div>
  
          <div className="flex justify-center items-center w-full col-span-3">
              <div className="flex flex-col items-center">
                  <h3 className="text-red-500 mb-[-36px] md:mb-[-56px]  text-[4rem] font-thin font-['Dancing_Script',serif]"><i>Sale</i></h3>
                  <h5 className="text-[3rem] md:text-[4rem] font-regular font-['Cormorant_Garamond',serif] text-center">{main_title}</h5>
  
                  <p className="text-muted font-thin tracking-wide text-center whitespace-pre-line">{content_under_title}</p>
                  {/* <p className="text-muted font-thin tracking-wide text-center">Seen a better price? We will not just match it, we will beat it!</p> */}
  
              <div className="flex flex-wrap md:flex-row flex-col gap-4 mt-5">
                      <Link to={button_1_link} className="btn-black">{button_1_text}</Link>
                      {button_2_link && <Link to={button_2_link} className="btn-white">{button_2_text}</Link>}
              </div>
              {terms_conditions_text && <p className="absolute bottom-2 right-2 text-muted font-thin tracking-wide text-[12px] whitespace-pre-line">{terms_conditions_text}</p>}
              </div>
          </div>
        </div>
  )
}

export default HeroBanner;