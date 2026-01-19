import { Image } from "@shopify/hydrogen";
import React, { useState } from "react";

type Diamond = {
  id: string;
  shapeImage: string;
  carat: string;
  color: string;
  clarity: string;
  cut: string;
  cert: string;
  price: string;
};

const baseDiamond: Omit<Diamond, "id"> = {
  shapeImage: "/assets/images/round.jpg",
  carat: "0.30 ct",
  color: "H",
  clarity: "SI1",
  cut: "GD",
  cert: "GIA",
  price: "£212",
};

/** repeat same item 30 times */
const diamonds: Diamond[] = Array.from({ length: 30 }, (_, i) => ({
  id: `diamond-${i + 1}`,
  ...baseDiamond,
}));

export default function DiamondSearch() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
        <p className="text-[12.8px] text-[#626262]">
          298,243 diamonds found matching
          your criteria
        </p>

        <div className="relative w-full lg:w-72 ">
          <input
            type="text"
            placeholder="Search by Code"
            className="w-full rounded-full border border-gray-300 py-1.5 px-3  text-sm h-7.5 leading-1.5 focus:outline-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {/* <span class="icon-search-diamond"> */}
																			<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-icon="bx:bx-search" data-inline="false" style={{transform: "rotate(360deg)"}}><path fill="currentColor" d="M10 18a7.95 7.95 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.95 7.95 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8m0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6"></path></svg>
									{/* </span> */}
          </span>
        </div>
      </div>

      {/* Listing */}
<div className="shadow-xl overflow-hidden">
  {/* Desktop: fixed height + scroll | Mobile: auto height */}
  <div className="h-[400px] overflow-y-auto overflow-x-hidden">
    {diamonds.map((diamond) => {
      const isSelected = selectedId === diamond.id;

      return (
        <button
  key={diamond.id}
  type="button"
  onClick={() => setSelectedId(diamond.id)}
  className={`grid grid-cols-[40px_1fr_1fr_1fr_auto]
    lg:grid-cols-[60px_repeat(5,1fr)_auto_auto]
    gap-2 p-[5px] text-sm transition
    cursor-pointer text-left
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9000] w-full
    ${
      isSelected
        ? "bg-[#f8f4ef] border-b border-[#ef9000]"
        : "border-b border-[#ccc] hover:bg-[#fafafa]"
    }
  `}
>

          {/* Shape */}
          <Image
            src={diamond.shapeImage}
            alt="shape"
            width={17}
            height={17}
            className="w-4.25 h-4.25 self-start mx-auto mt-1"
          />

          {/* Carat */}
          <div>
            <div className="text-xs text-[#878787]">Carat</div>
            <div className="text-p-10">{diamond.carat}</div>

            <div className="lg:hidden mt-2 text-xs text-[#878787]">
              Clarity
            </div>
            <div className="lg:hidden text-p-10">{diamond.clarity}</div>
          </div>

          {/* Color */}
          <div>
            <div className="text-xs text-[#878787]">Color</div>
            <div className="text-p-10">{diamond.color}</div>

            <div className="lg:hidden mt-2 text-xs text-[#878787]">
              Cert
            </div>
            <div className="lg:hidden text-p-10">{diamond.cert}</div>
          </div>

          {/* Clarity (desktop) */}
          <div className="hidden lg:block">
            <div className="text-xs text-[#878787]">Clarity</div>
            <div className="text-p-10">{diamond.clarity}</div>
          </div>

          {/* Cut */}
          <div>
            <div className="text-xs text-[#878787]">Cut</div>
            <div className="text-p-10">{diamond.cut}</div>

            <div className="lg:hidden mt-2 text-xs text-[#878787]">
              Price
            </div>
            <div className="lg:hidden font-medium text-p-10">
              {diamond.price}
            </div>
          </div>

          {/* Cert (desktop) */}
          <div className="hidden lg:block">
            <div className="text-xs text-[#878787]">Cert</div>
            <div className="text-p-10">{diamond.cert}</div>
          </div>

          {/* Price (desktop) */}
          <div className="hidden lg:block">
            <div className="text-xs text-[#878787]">Price</div>
            <div className="text-p-10">{diamond.price}</div>
          </div>

          {/* Actions */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 justify-center lg:justify-end lg:ml-6">
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-full lg:w-auto rounded-full border border-black px-6 lg:px-4 py-1 text-xs text-center hover:bg-black hover:text-white cursor-pointer"
            >
              More
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="w-full lg:w-auto rounded-full bg-black px-6 lg:px-4 py-1 text-sm text-white hover:opacity-90 hover:bg-white hover:text-black border border-black cursor-pointer"
            >
              Select
            </button>
          </div>
        </button>
      );
    })}
  </div>
</div>


      {/* Pagination */}
      <div className="flex items-center lg:justify-end gap-2 mt-6 text-sm">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`px-3 py-1  ${
              currentPage === n ? "bg-black text-white" : "hover:bg-black hover:text-white cursor-pointer hover:ml-2 transition ease-in"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, 9))}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          &gt;
        </button>
        <button
          onClick={() => setCurrentPage(9)}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          &gt;|
        </button>
      </div>
    </div>
  );
}
