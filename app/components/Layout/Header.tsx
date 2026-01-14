import { Image } from "@shopify/hydrogen";
import { Link } from "react-router";

function Header({globalPhone}: Readonly<{globalPhone: string}>) {
  return (
    <>
      {/* Desktop navigation */}
      <nav className='md:block hidden relative bg-white py-3'>
        <div className="flex justify-between container mx-auto">
          <div className="flex gap-6">
            <div className="flex items-center gap-4">
            <Link to={`tel:${globalPhone}`} className="flex items-center gap-1">
                <Image src="/assets/images/icons/phone.svg" alt="Phone" className="!w-5"/>
                <p>{globalPhone}</p>
              </Link>
              <div className="bg-[#F3E7D7] rounded-[24px] px-3 py-0 text-[1rem]">24/7</div>
            </div>

            <div className="flex items-center gap-4">
              <Link to={"/"} className="flex items-center gap-1">
                <Image src="/assets/images/icons/location.svg" alt="Location" className="!w-5"/>
                <p>Visit Us</p>
              </Link>
            </div>
          </div>
          <div>
            <Image src="/assets/images/abelini_logo_dark.svg" alt="Abelini Logo" className="max-w-60"/>
          </div>
          <div className="flex gap-6">
          <Link to={"/"} className="flex items-center gap-1">
                <Image src="/assets/images/icons/user.svg" alt="User" className="!w-5"/>
                <p>Login</p>
              </Link>
          <Link to={"/"} className="flex items-center gap-1">
                <Image src="/assets/images/icons/heart.svg" alt="User" className="!w-5"/>
                <p>Wish List</p>
              </Link>
          <Link to={"/"} className="flex items-center gap-1">
                <Image src="/assets/images/icons/cart.svg" alt="User" className="!w-5"/>
                <p>Cart (0)</p>
              </Link>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
     
    </>
  );
}

export default Header;