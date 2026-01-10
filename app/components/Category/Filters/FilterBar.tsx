import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import StylePanel from "./StylePanel";
import { cn } from "~/lib/utils";
import { Image } from "@shopify/hydrogen";
import { Link } from "react-router";
import SortDropdown from "./SortDropdown";
import FilterStyleListAccordion from "./FilterStyleListAccordion";
import type { StyleTypes } from "./filteroption.types";
import { lazy } from 'react'
const MobileFilterModal = lazy(() => import('./MobileFilterModal'))


interface FilterProps {
  viewMode: "list" | "grid",
  setViewMode: (type: "list" | "grid") => void;
  isMobile: boolean
}

const filterOptions: StyleTypes[] = [
  "Style",
  "Metal",
  "Stonetype",
  "Shape",
  "Setting Type",
  "By Recipient",
  "Carat",
];

const filterToggleOptions = [
  "Lab Grown Diamond",
  "Diamond"
]

const viewTypes: Array<{ type: "list" | "grid", isVertical: boolean }> = [
  {
    type: "grid",
    isVertical: false
  },
  {
    type: "list",
    isVertical: true
  },
]

const FilterBar = ({ viewMode, setViewMode, isMobile }: FilterProps) => {
  const [diamondType, setDiamondType] = useState(["Diamond"]);
  const [activeFilter, setActiveFilter] = useState<StyleTypes | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Classic Solitaire"]);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);


  const handleFilterClick = (filter: StyleTypes) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  if (isMobile) {
    return (
      <>
        <div className="flex justify-between w-full">
          <button className="flex items-center gap-2 cursor-pointer" onClick={() => setMobileModalOpen(true)}>
            <Image src="/assets/images/icons/filter_icon.svg" alt="Filter Icon" width={16}/>
            <p className="text-[#111111] text-[14px]">Filters (1)</p>
          </button>
          <div className="flex items-center gap-2">
            <p className="text-[#111111] text-[14px]">304 Results</p>
            <Image src="/assets/images/icons/sorting.svg" alt="Sorting Icon" width={16}/>
          </div>
        </div>
        <div>
          <MobileFilterModal
            isOpen={mobileModalOpen}
            onClose={() => setMobileModalOpen(false)}
            selections={{}}
            onOptionToggle={() => { }}
            onApply={() => { }}
          />
        </div>
      </>

    )
  }
  if (viewMode == "list") {
    return (
      <div className="px-2 overflow-auto max-h-[90vh] py-10" style={{
        position: "sticky",
        top: "92px"
      }}>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-[20px] font-semibold tracking-[1px]">Filters</h2>
            <div>
              {viewTypes.map((vType, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setViewMode(vType.type)}
                    className={cn(
                      "p-1 transition-colors duration-200 cursor-pointer rounded-lg",
                      vType.isVertical ? "rotate-90" : "",
                      "",
                      viewMode === vType.type ? "border-1 border-black" : ""
                    )}
                  >
                    <Image src="/assets/images/icons/menu.svg" alt={vType.type} width={12} />
                  </button>
                )
              })}

            </div>
          </div>
          <button className="uppercase text-[13px] underline">Clear All</button>
        </div>

        <div className="flex justify-between gap-2 mt-3">
          {filterToggleOptions.map((toggleOption, index) => (
            <button
              key={index}
              onClick={() => setDiamondType((prev) => {
                if (prev.includes(toggleOption)) {
                  return prev.filter((item) => item != toggleOption)
                } else {
                  return [...prev, toggleOption]
                }
              })}
              className={cn(
                "px-6 py-1 md:min-w-[48%] rounded-full text-sm font-thin cursor-pointer transition-all duration-200",
                diamondType.includes(toggleOption)
                  ? "text-[12px] border-black border-1 "
                  : "text-[12px] bg-black text-white border-black border-1"
              )}
            >
              {toggleOption}
            </button>
          ))}
        </div>

        <FilterStyleListAccordion />
      </div>
    )
  }
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center py-4 flex-wrap bg-[#F8F4EF]">
          <div className="flex items-center gap-2 flex-wrap">
            {filterToggleOptions.map((toggleOption, index) => (
              <button
                key={index}
                onClick={() => setDiamondType((prev) => {
                  if (prev.includes(toggleOption)) {
                    return prev.filter((item) => item != toggleOption)
                  } else {
                    return [...prev, toggleOption]
                  }
                })}
                className={cn(
                  "px-6 py-1 rounded-full text-sm font-thin cursor-pointer transition-all duration-200",
                  diamondType.includes(toggleOption)
                    ? "text-[12px] border-black border-1 "
                    : "text-[12px] bg-black text-white border-black border-1"
                )}
              >
                {toggleOption}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
      </div>
      <div className="bg-[#F8F4EF] py-4 flex items-center flex-wrap justify-between px-6 sticky top-[110px] z-40">
        <div className="flex items-center flex-wrap gap-4 ">
          <span className="text-[13px] font-regular text-[#878787]">Filters:</span>
          <div className="flex items-center flex-wrap overflow-hidden gap-2">
            {viewTypes.map((vType, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setViewMode(vType.type)}
                  className={cn(
                    "p-1 transition-colors duration-200 cursor-pointer rounded-lg",
                    vType.isVertical ? "rotate-90" : "",
                    "",
                    viewMode === vType.type ? "border-1 border-black" : ""
                  )}
                >
                  <Image src="/assets/images/icons/menu.svg" alt={vType.type} width={16} />
                </button>
              )
            })}
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <FilterDropdown
                key={filter}
                label={filter}
                isOpen={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={"/"} className="flex items-center gap-2 text-[14px] bg-white rounded-2xl px-2 py-0 border-1 border-[#ef9000]">Quickship <Image src="/assets/images/icons/quickship_icon.svg" alt="Quickship" width={20} /></Link>
          <SortDropdown
            options={[
              { label: 'Price (Low > High)', value: 'low_high' },
              { label: 'Best Seller', value: 'best_seller' },
              { label: 'Most Recommended', value: 'most_recommended' },
              { label: 'Most Viewed', value: 'most_viewed' },
              { label: 'New Arrivals', value: 'new_arrivals' },
              { label: 'Price (High > Low)', value: 'high_low' },
            ]}
            onChange={(value) => console.log(value)}
          />
        </div>
      </div>

      {/* Expandable Panel */}
      {activeFilter && (
        <div className="absolute bg-white z-99 w-full border-1 border-[#dee2e6]">
          {/* {activeFilter === "Style" && ( */}
          <StylePanel
            activeFilter={activeFilter}
            selectedStyles={selectedStyles}
            onStyleToggle={handleStyleToggle}
            onClose={() => setActiveFilter(null)}
          />
          {/* )} */}
          {/* {activeFilter !== "Style" && (
            <div className="bg-filter-panel p-6">
              <div className="max-w-7xl mx-auto">
                <p className="text-filter-placeholder text-sm">
                  {activeFilter} options would appear here...
                </p>
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-filter-close-hover transition-colors"
              >
                <svg className="w-5 h-5 text-filter-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )} */}
        </div>
      )}

    </>
  );
};

export default FilterBar;
