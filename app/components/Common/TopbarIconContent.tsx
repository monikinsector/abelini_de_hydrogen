import { topbarIconContent } from './common.data';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';

type TopbarIconContentProps = {
    data: ("Phone" | "Location" | "Abelini" | "Login" | "Wish List" | "Cart")[];
    isDesktop: boolean;
    phone?: string;
};

function TopbarIconContent({data, isDesktop, phone}: Readonly<TopbarIconContentProps>) {
    
  return (
        data.map((item) => {
            const {name, icon, mobileIcon, href, id} = topbarIconContent[item];
            const isPhone = item == "Phone";
            return (
                <Link key={id} to={isPhone  ? `tel:${phone}` : href} className="flex items-center gap-1">
                    <Image src={isDesktop ? icon : mobileIcon} alt={name} className="!w-5"/>
                    {isDesktop &&
                        <p>{isPhone ? phone : name}</p>
                    }
                </Link>
            )
        })
  )
}

export default TopbarIconContent