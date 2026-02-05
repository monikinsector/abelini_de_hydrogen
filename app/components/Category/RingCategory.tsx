import { Image } from "@shopify/hydrogen"
import Carousel from "../Common/Carousel"
import { Link } from "react-router"


function RingCategoryItem({ name, code }: Readonly<{ name: string; code: string }>) {
    const codeLower = code ? code.toLowerCase() : '';
    return (
        <Link to="#" className="group">
            <div className="w-20 md:w-auto rounded-full md:rounded-xl overflow-hidden border-1 border-[#e3e3e3] group-hover:border-black">
                <Image
                    src={codeLower ? `https://cdn.shopify.com/s/files/1/0963/0410/3712/files/${codeLower}-icon.avif` : ''}
                    alt={name}
                    className="rounded-xl "
                    loading="lazy"
                    width={176}
                    height={176}
                />
            </div>
            <p className="text-center text-[12px] color-[#111111] font-thin group-hover:font-normal">{name}</p>
        </Link>
    );
}


type RingCategoryType = {
    name: string;
    [key: string]: any;
};

function RingCategory({ categories }: { categories: RingCategoryType[] }) {
    if (!categories || categories.length === 0) return null;
    // Only show categories with a non-blank code
    const filtered = categories.filter(item => item.code && item.code.trim() !== '');
    if (filtered.length === 0) return null;
    return (
        <div className="mx-6 my-4 mb-12">
            <Carousel slidesPerView={9} slidesToScroll={4} scrollDuration={60} >
                {filtered.map((item, index) => (
                    <RingCategoryItem name={item.name} code={item.code} key={`${item.name}-${index}`}/>
                ))}
            </Carousel>
        </div>
    );
}

export default RingCategory