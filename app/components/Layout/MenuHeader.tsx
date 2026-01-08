import { useState } from "react";
import type {
  HeaderData,
  HeaderTypes,
  HeaderItemData,
  HeaderItem,
  HeaderLink,
} from "./header.type";
import { dataForNavigation } from "./header.data";
import { Link } from "react-router";
import { Image } from "@shopify/hydrogen";
import SaleBar from "./Sale";
import FeatureHeader from "./FeatureHeader";


function MenuHeader() {
    const [hoverEntered, setHoverEntered] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const headerLinks = [
        "Engagement Rings",
        "Wedding & Eternity Rings",
        "Diamond Rings",
        "Earrings",
        "Necklaces",
        "Bracelets",
        "QuickShip",
        "Inspiration"
      ]
    
  return (
    <>
      {/* Desktop navigation */}
      <nav className='sticky top-8 z-99 md:block hidden relative bg-white border-t-1 border-t-gray-300'>
        <ul className='flex items-center justify-between relative bg-white md:px-10 lg:px-12'>
        
        {headerLinks.map((item, index) => {
          return (
            <div key={index} className="mx-auto group" onMouseLeave={() => setHoverEntered("")}>
              <li   onMouseEnter={() => setHoverEntered(item)} className='px-4 h-full text-[1rem] py-5 px-3 border-b-2 border-b-white hover:border-b-2 hover:border-b-yellow-500 tracking-wide cursor-pointer mb-0'>{item}</li>
              {hoverEntered == item &&
              <div
                className={`
                  absolute z-30 left-0 top-full w-full min-h-[50vh]
                  -translate-y-2 pointer-events-none
                  group-hover:opacity-100 invisible group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                  transition-all duration-100 ease-in bg-white flex justify-center items-center
                `}
              >
              <MenuDropdown
                {...dataForNavigation[item]}
                selectedLink={hoverEntered}
              />
            </div>
          }
            </div>
          )
        })}
        <li className="">

        <div className="relative ml-6 mr-4 min-w-[220px] max-w-sm">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 pr-10 py-2 text-sm text-[#111111] placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <Image
              src="/assets/images/icons/search.svg"
              alt="Search"
              className="h-4 w-4 opacity-70"
            />
          </span>
        </div>
        </li>
        </ul>

        {/* {hoverEntered && ( */}
          
          
        {/* )} */}
      </nav>

      {/* Mobile navigation */}
      <MobileHeaderNav
        headerLinks={headerLinks}
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

type MobileHeaderNavProps = {
  headerLinks: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

function MobileHeaderNav({
  headerLinks,
  isOpen,
  onToggle,
  onClose,
}: MobileHeaderNavProps) {
  return (
    <nav className="md:hidden block bg-white border-t-2 border-t-gray-300 relative">
      <div className="flex items-center px-4 py-3">
        <button
          type="button"
          className="inline-flex flex-col justify-center gap-[5px] p-1 rounded focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={onToggle}
        >
          <Image
            src="/assets/images/icons/menu.svg"
            alt="Abelini"
            className="mx-auto h-6 w-auto"
          />
        </button>

        <div className="flex-1 text-center">
          <Image
            src="/assets/images/abelini_logo_dark.svg"
            alt="Abelini"
            className="mx-auto h-6 w-auto"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="p-1"
          >
            <Image
              src="/assets/images/icons/search.svg"
              alt="Search"
              className="h-5 w-5"
            />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="p-1"
          >
            <Image
              src="/assets/images/icons/heart.svg"
              alt="Wishlist"
              className="h-5 w-5"
            />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="p-1"
          >
            <img
              src="/assets/images/icons/cart.svg"
              alt="Cart"
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 max-w-[75vw]
          bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-base font-semibold tracking-wide">
            Browse
          </span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="text-sm text-gray-500"
          >
            Close
          </button>
        </div>
        <ul className="flex flex-col px-4 py-3 space-y-2">
          {headerLinks.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="w-full text-left py-2 text-[15px] tracking-wide text-[#111111]"
                // Later this can drive a mobile version of the mega menu
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

type AdditionalMenuProps = HeaderData & {
  selectedLink: string
}
function MenuDropdown({totalCols, data, leftBorderFromIndex, lastColDoubleSpace, selectedLink}: AdditionalMenuProps) {
  // const colors = ["red", "green", "blue", "yellow", "purple"];

  const returnAppropriateComponent = (
    type: HeaderTypes,
    data?: HeaderItemData,
  ) => {
      switch (type) {
          case "heading": {
            const {text} = data as {text: string};
            return <h3 className="text-p-14 font-semibold text-[#111111]">{text}</h3>;
          }
      
          case "links_with_image": {
            return (data?.links ?? []).map((d: HeaderLink, ixs: number) => {
              return (
                <Link to={d.link} className="flex gap-2"> 
                  <Image src={d.image} alt={d.name} className="!w-8 !h-auto"/>
                  <h3 className="text-p-14 font-regular py-[6px] text-muted">{d.name}</h3>
                </Link>
              )
            })
          }
          case "links_wo_image": {
            return (data?.links ?? []).map((d: HeaderLink, ixs: number) => {
              return (
                <Link to={d.link} className="flex"> 
                  <h3 className="text-p-14 font-regular py-[6px] text-[#626262]">{d.name}</h3>
                </Link>
              )
            })
          }
          case "image_only": {
            const {image} = data as {image: string};
            return (
              <div className="mr-4 h-full flex flex-col justify-center">
                <Image src={image} alt="image" className="max-w-full"/>
              </div>
            )
          }
          case "image_with_button": {
            const {image, text} = data as {image: string, text: string};
            return (
              <div className="relative mr-4 h-full flex flex-col justify-center">
                <Image src={image} alt="image" className="max-w-full"/>
                <button className="theme_button_hmenu absolute bottom-8 left-[50%] -translate-x-[50%]">{text}</button>
              </div>
            )
          }
          case "break":
            return (
              <div>
                <br/>
                <br/>
              </div>
            )
          case "button": {
            const {text, theme} = data as {text: string, theme: string};
            return <button className={`${theme} mt-2`}>{text}</button>;
          }
          default:
            return <h5>Error Here</h5>;
        }
              
  }
return (
  <div className='w-full'>
      <div className={`w-full min-h-[50vh] px-8 py-4 grid border-t-1 border-t-gray-300 shadow-[0_0_30px_rgba(127,137,161,0.25)]`} style={{
              gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
      }}>
          {Object.keys(data).map((item, index) => {
              const columnNumber = +(item.split("-")[1]);
              const colSpanValue = (lastColDoubleSpace && index == (Object.keys(data).length - 1)) ? 2 : columnNumber;
              return (
                  <div key={index} className={`mt-2  col-span-${colSpanValue} pl-4`} style={{
                    borderLeft: index >= leftBorderFromIndex ? "1px solid #dee2e6" : ""
                  }}>
                      {data[item].map((d: HeaderItem, idx: number) => {
                          const {type, data} = d;
                          return returnAppropriateComponent(type, data);
                      })}
                  </div>
              )
          })}
      </div>
  </div>
);
}

export default MenuHeader;