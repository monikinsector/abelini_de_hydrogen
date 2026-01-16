import { useRef, useState, useEffect } from "react";
import type {
  HeaderData,
  HeaderTypes,
  HeaderItemData,
  HeaderItem,
  HeaderLink,
} from "./header.type";
import { dataForNavigation, menuItems } from "./header.data";
import { Link } from "react-router";
import { Image } from "@shopify/hydrogen";
import { SubMenuPanel } from "./SubMenuPanel";
import { cn } from "~/lib/utils";
import TopbarIconContent from "../Common/TopbarIconContent";


function MenuHeader({globalPhone}: Readonly<{globalPhone: string}>) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [hoverEntered, setHoverEntered] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarStuck, setIsNavbarStuck] = useState(false);

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

  // Detect when navbar becomes stuck (fixed to top)
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not visible (scrolled past), navbar is stuck
        setIsNavbarStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <>
      {/* Sentinel element to detect when navbar becomes stuck - placed just before nav */}
      <div 
        ref={sentinelRef} 
        className="md:block hidden h-px pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Desktop navigation */}
      <nav className='sticky top-8 z-99 md:block hidden relative bg-white border-t-1 border-t-gray-300'>
        <ul className='flex items-center justify-between relative bg-white md:px-10 lg:px-12'>

          {isNavbarStuck &&
            <li className="flex items-center gap-4">
              <TopbarIconContent data={["Phone", "Location", "Abelini"]} isDesktop={false} phone={globalPhone}/>
            </li>
          }
          {headerLinks.map((item, index) => {
            return (
              <div key={item} className="mx-auto group" onMouseLeave={() => setHoverEntered("")}>
                <li onMouseEnter={() => setHoverEntered(item)} className={
                  cn(
                    'px-4 h-full text-[1rem] py-5 text-wrap whitespace-nowrap  border-b-2 border-b-white hover:border-b-2 hover:border-b-yellow-500 tracking-wide cursor-pointer mb-0',
                    isNavbarStuck ? "px-2" : "px-3"
                  )
                }>{item}</li>
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
          {/* Icons shown when navbar is Sticked */}
          
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
          {isNavbarStuck && (
            <li className="flex items-center gap-4">
              <TopbarIconContent data={["Login", "Wish List", "Cart"]} isDesktop={false} />
            </li>
          )}
          
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

const iconBar = [
  { icon: "/assets/images/icons/user.svg", label: "Account" },
  { icon: "/assets/images/icons/heart.svg", label: "Wish List" },
  { icon: "/assets/images/icons/cart.svg", label: "My Cart" },
  { icon: "/assets/images/icons/search.svg", label: "Search" },
];

function MobileHeaderNav({
  headerLinks,
  isOpen,
  onToggle,
  onClose,
}: MobileHeaderNavProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<typeof menuItems[0] | null>(null);

  const handleClose = () => {
    setActiveSubmenu(null);
    onClose();
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position when menu closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);


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
            <Image
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
          className="fixed inset-0 z-100 bg-black/40"
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-110 w-[330px] max-w-[85vw] px-2
          bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex justify-between py-2 border-b border-gray-200">
          {/* Action Buttons */}
          {iconBar.map((item, index) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Image src={item.icon} alt={item.label} width={24} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="overflow-y-auto overscroll-contain h-[calc(100%-100px)]" style={{ WebkitOverflowScrolling: 'touch' }}>
          {menuItems.map((item) => {
            const link = (item as any).link;
            const isExternalLink =
              typeof link === "string" && link.startsWith("http");
            const shouldRenderLink = link && !item.hasSubmenu;

            const className =
              "w-full flex items-center justify-between px-2 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left";

            if (shouldRenderLink) {
              const linkProps = isExternalLink
                ? {
                  to: link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
                : {
                  to: link,
                };

              return (
                <div key={item.label}>
                  <Link {...linkProps} className={className}>
                    <span className="text-sm font-medium tracking-wide text-gray-800">
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            }

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (item.hasSubmenu) {
                      setActiveSubmenu(item);
                    }
                  }}
                  className={className}
                >
                  <span className="text-sm font-medium tracking-wide text-gray-800">
                    {item.label}
                  </span>
                  {item.hasSubmenu && (
                    <Image
                      src="/assets/images/icons/c_right.svg"
                      alt="Right"
                      width={20}
                    />
                  )}
                </button>
              </div>
            );
          })}


          {/* Contact Information Section */}
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-100">
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icons/phone.svg" alt="Phone" width={16} height={16} />
                <Link to="tel:+442038051270" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  +44 (0) 2038051270
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icons/email.svg" alt="Email" width={16} height={16} />
                <Link to="mailto:sales@abelini.com" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  sales@abelini.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/assets/images/icons/chat.svg" alt="Chat" width={16} height={16} />
                <button className="text-sm text-gray-800 hover:text-gray-600 transition-colors text-left">
                  LIVE CHAT
                </button>
              </div>
            </div>
            <button className="!font-normal !text-[12px] btn-black ">
              BOOK AN APPOINTMENT
            </button>
          </div>

          {/* Additional Links Section */}
          <div className="bg-white px-4 py-4 space-y-3 border-b border-gray-100">
            <Link to="/customer-reviews" className="block text-[12px] font-medium tracking-wide text-gray-800 hover:text-gray-600 transition-colors">
              INDEPENDENT CUSTOMER REVIEWS
            </Link>
            <Link to="/faq" className="block text-[12px] font-medium tracking-wide text-gray-800 hover:text-gray-600 transition-colors">
              FAQS
            </Link>
            <Link to="/free-shipping" className="block text-[12px] font-medium tracking-wide text-gray-800 hover:text-gray-600 transition-colors">
              FREE DELIVERY
            </Link>
            <Link to="/return-and-exchange" className="block text-[12px] font-medium tracking-wide text-gray-800 hover:text-gray-600 transition-colors">
              MONEY BACK GUARANTEE
            </Link>
          </div>
        </div>

        <SubMenuPanel
          isOpen={!!activeSubmenu}
          submenu={activeSubmenu?.submenu}
          onBack={() => setActiveSubmenu(null)}
          onClose={handleClose}
        />
      </div>
    </nav>
  );
}

type AdditionalMenuProps = HeaderData & {
  selectedLink: string
}
function MenuDropdown({ totalCols, data, leftBorderFromIndex, lastColDoubleSpace, selectedLink }: AdditionalMenuProps) {
  // const colors = ["red", "green", "blue", "yellow", "purple"];

  const returnAppropriateComponent = (
    type: HeaderTypes,
    data?: HeaderItemData,
  ) => {
    switch (type) {
      case "heading": {
        const { text } = data as { text: string };
        return <h3 className="text-p-14 font-semibold text-[#111111]">{text}</h3>;
      }

      case "links_with_image": {
        return (data?.links ?? []).map((d: HeaderLink, ixs: number) => {
          return (
            <Link key={d.name} to={d.link} className="flex items-center gap-2 py-[6px] ">
              <Image src={d.image} alt={d.name} width={25} />
              <h3 className="text-p-14 font-regular text-muted">{d.name}</h3>
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
        const { image } = data as { image: string };
        return (
          <div className="mr-4 h-full flex flex-col justify-center">
            <Image src={image} alt="image" className="max-w-full" />
          </div>
        )
      }
      case "image_with_button": {
        const { image, text } = data as { image: string, text: string };
        return (
          <div className="relative mr-4 h-full flex flex-col justify-center">
            <Image src={image} alt="image" className="max-w-full" />
            <button className="theme_button_hmenu absolute bottom-8 left-[50%] -translate-x-[50%]">{text}</button>
          </div>
        )
      }
      case "break":
        return (
          <div>
            <br />
            <br />
          </div>
        )
      case "button": {
        const { text, theme } = data as { text: string, theme: string };
        return <button className={`${theme} mt-2`}>{text}</button>;
      }
      default: {
        return "";
      }
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
            <div key={`${item}`} className={`mt-2  col-span-${colSpanValue} pl-4`} style={{
              borderLeft: index >= leftBorderFromIndex ? "1px solid #dee2e6" : ""
            }}>
              {data[item].map((d: HeaderItem, idx: number) => {
                const { type, data } = d;
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