import {Image} from "@shopify/hydrogen";
import {memo, useState} from "react";
import {Link} from "react-router";
import {cn} from "~/lib/utils";
import {ShapeStoneDropdown} from "./ShapeStoneDropdown";

interface MetalOption {
  name: string;
  color: string;
}

interface RingCardProps {
  title: string;
  price: number;
  currency?: string;
  image: string;
  thumbnails?: string[];
  metals: MetalOption[];
  selectedMetal?: string;
  shapeLabel?: string;
  stoneLabel?: string;
  onQuickView?: () => void;
  onWishlist?: () => void;
}

const ProductCard = ({
  title,
  price,
  currency = "£",
  image,
  thumbnails = [],
  metals,
  selectedMetal,
  shapeLabel = "Round",
  stoneLabel = "Lab Grown Diamond",
  onQuickView,
  onWishlist,
}: Readonly<RingCardProps>) => {
  const [activeMetal, setActiveMetal] = useState(selectedMetal || metals[0]?.name);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.();
  };

  return (
    <div
      className={
        "group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_#0000,0_0_#0000,0px_8px_16px_rgba(49,63,78,0.1)]"}
    >
      {/* Image Container */}
      <div className="relative bg-[#fcfbf9] aspect-square m-2 overflow-hidden">
        {/* Clickable image link */}
        <Link to="#" className="block w-full h-full">
          <Image
            src={image}
            alt={title}
            className="mix-blend-multiply"
          />
        </Link>

        {/* Wishlist Heart - visible on hover, not part of image link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          className={
            "absolute top-2 right-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          }
        >
          <Image src="/assets/images/icons/heart_gold.svg" alt="Like" width={20}/>
        </button>

        {/* Quick View Button - not part of image link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.();
          }}
          className="absolute bottom-4 right-4 z-10 text-[10px] bg-white border-black border-1 py-1 px-2 rounded-xl"
        >
          Quick View
        </button>
      </div>

      {/* Metal Color Swatches */}
      <div className="flex justify-center gap-3 py-3">
        {metals.map((metal) => (
          <button
            key={metal.name}
            onMouseEnter={() => setActiveMetal(metal.name)}
            className={cn(
              "w-4 h-4 rounded-full transition-all cursor-pointer",
              activeMetal === metal.name
                ? "ring-1 ring-[#c9a96e] ring-offset-1"
                : "border-gray-200 hover:border-gray-400"
            )}
						style={{
							background: metal.color
						}}
            title={metal.name}
          />
        ))}
      </div>

      {/* Shape & Stone Dropdowns */}
      <ShapeStoneDropdown
        shapeLabel={shapeLabel}
        stoneLabel={stoneLabel}
      />

      {/* Title & Thumbnails - toggle on hover, fixed height container */}
      <div className="md:h-12 h-auto px-4">
        {/* {isHovered && thumbnails.length > 0 ? ( */}
          <div className="hidden group-hover:flex justify-center gap-2 animate-fade-in">
            {thumbnails.slice(0, 4).map((thumb, index) => (
              <div
                key={thumb}
                className={
                  "w-10 h-10 rounded-lg border-1 overflow-hidden cursor-pointer transition-colors hover:border-[#c9a96e] border-gray-200"}
              >
                <Image
                  src={thumb}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        {/* ) : ( */}
          <h3 className="block group-hover:hidden text-center text-[13px] text-[#111111] tracking-wide text-gray-700 leading-tight pt-2">
            {title}
          </h3>
        {/* )} */}
      </div>

      {/* Price */}
      <p className="text-center pb-4">
        <span className="text-[14px] text-[#898989]">From </span>
        <span className="font-regular text-[#111111]">
          {currency}{price.toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default memo(ProductCard);
