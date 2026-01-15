import { Image } from "@shopify/hydrogen"
import Carousel from "../Common/Carousel"
import { Link } from "react-router"
import { ringCategories } from "./Data/category.data"

function RingCategoryItem({name}: Readonly<{name: string}>) {
    return (
        <Link to="#" className="group">
            <div className="w-20 md:w-auto rounded-full md:rounded-xl overflow-hidden border-1 border-[#e3e3e3] group-hover:border-black">
                <Image src="/assets/images/solitaire-ring.avif" alt={name} className="rounded-xl "/>
            </div>
            <p className="text-center text-[12px] color-[#111111] font-thin group-hover:font-normal">{name}</p>
        </Link>
    )
}

function RingCategory() {
  return (
    <div className="mx-6 my-4 mb-12">
        <Carousel slidesPerView={9} slidesToScroll={4} scrollDuration={60} >
            {ringCategories.map((item, index) => {
                return (
                    <RingCategoryItem name={item.name} key={`${item.name}-${index}`}/>
                )
            })}
        </Carousel>
    </div>
  )
}

export default RingCategory