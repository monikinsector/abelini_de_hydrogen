import { Image } from "@shopify/hydrogen";
import TopbarIconContent from "../Common/TopbarIconContent";

function Header({globalPhone}: Readonly<{globalPhone: string}>) {
  return (
    <>
      {/* Desktop navigation */}
      <nav className='md:block hidden relative bg-white py-3'>
        <div className="flex justify-between container mx-auto">
          <div className="flex gap-6">
            <div className="flex items-center gap-4">
              <TopbarIconContent data={["Phone"]} isDesktop={true} phone={globalPhone}/>
              <div className="bg-[#F3E7D7] rounded-[24px] px-3 py-0 text-[1rem]">24/7</div>
            </div>

            <div className="flex items-center gap-4">
              <TopbarIconContent data={["Location"]} isDesktop={true}/>
            </div>
          </div>
          <div>
            <Image src="/assets/images/abelini_logo_dark.svg" alt="Abelini Logo" className="max-w-60"/>
          </div>
          <div className="flex gap-6">
            <TopbarIconContent data={["Login", "Wish List", "Cart"]} isDesktop={true}/>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Header;