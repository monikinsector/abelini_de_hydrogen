import React, { useState, lazy } from "react";
import FilterDropdown from "./FilterDropdown";
// import StylePanel from "./StylePanel";
import { cn } from "~/lib/utils";
import { Image } from "@shopify/hydrogen";
import { Link } from "react-router";
import SortDropdown from "./SortDropdown";
import FilterStyleListAccordion from "./FilterStyleListAccordion";
import type { StyleTypes } from "./filteroption.types";
const MobileFilterModal = lazy(() => import('./MobileFilterModal'))


interface FilterProps {
  viewMode: "list" | "grid";
  setViewMode: (type: "list" | "grid") => void;
  isMobile: boolean;
  filters?: any[];
  selectedFilters?: any[];
  onFilterChange?: (filterId: string, value: string) => void;
  sortParam?: string;
  onSortChange?: (sort: string) => void;
  totalCount?: number;
}



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

const FilterBar = ({ viewMode, setViewMode, isMobile, filters, selectedFilters, onFilterChange, sortParam, onSortChange, totalCount }: FilterProps) => {
  const [diamondType, setDiamondType] = useState(["Diamond"]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeFilterObj, setActiveFilterObj] = useState<any | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Classic Solitaire"]);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  // State for mobile filter selections
  const [mobileSelections, setMobileSelections] = useState<Record<string, string[]>>({});

  // Sync mobileSelections with selectedFilters when modal opens
  React.useEffect(() => {
    if (mobileModalOpen) {
      const initial: Record<string, string[]> = {};
      (selectedFilters || []).forEach(f => {
        if (!initial[f.id]) initial[f.id] = [];
        initial[f.id].push(f.value);
      });
      setMobileSelections(initial);
    }
  }, [mobileModalOpen, selectedFilters]);

  // Handler for toggling filter value in mobile modal
  const handleMobileOptionToggle = (filterId: string, value: string) => {
    // Single-select for Style, Metal, Stone Type, Shape
    const singleSelectLabels = ["style", "metal", "stone_type", "shape"];
    const isSingleSelect = singleSelectLabels.some(label => filterId.toLowerCase().includes(label));
    setMobileSelections(prev => {
      if (isSingleSelect) {
        // Only one value allowed
        return { ...prev, [filterId]: [value] };
      } else {
        // Multi-select allowed
        const current = prev[filterId] || [];
        const exists = current.includes(value);
        const updated = exists ? current.filter(v => v !== value) : [...current, value];
        return { ...prev, [filterId]: updated };
      }
    });
  };

  // Handler for applying mobile filter selections
  const handleMobileApply = () => {
    // Flatten mobileSelections to array of {id, value}
    const newSelected: any[] = [];
    Object.entries(mobileSelections).forEach(([id, values]) => {
      values.forEach(value => newSelected.push({ id, value }));
    });
    // Call onFilterChange for each selected filter
    if (onFilterChange) {
      // Clear all first
      (selectedFilters || []).forEach(f => onFilterChange(f.id, ''));
      // Then apply new
      newSelected.forEach(f => onFilterChange(f.id, f.value));
    }
    setMobileModalOpen(false);
  };


  const handleFilterClick = (filterLabel: string) => {
    if (activeFilter === filterLabel) {
      setActiveFilter(null);
      setActiveFilterObj(null);
    } else {
      setActiveFilter(filterLabel);
      const found = dynamicFilters.find(f => f.label === filterLabel);
      setActiveFilterObj(found || null);
    }
  };

  // Handler for selecting a filter value
  const handleSelectFilterValue = (filterId: string, value: string, metaobjectId?: string) => {
    const singleSelectLabels = ["style", "metal", "stone_type", "shape"];
    const isSingleSelect = singleSelectLabels.some(label => filterId.toLowerCase().includes(label));
    if (onFilterChange) {
      if (isSingleSelect) {
        // Clear previous selection for this filter before setting new one
        onFilterChange(filterId, '');
      }
      // Pass metaobjectId if available, otherwise fallback to value
      onFilterChange(filterId, metaobjectId || value);
    }
    setActiveFilter(null);
    setActiveFilterObj(null);
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const toggleDiamondType = (toggleOption: string) => {
    setDiamondType((prev) =>
      prev.includes(toggleOption)
        ? prev.filter((item) => item !== toggleOption)
        : [...prev, toggleOption]
    )
  }
  


  // Only show dynamic filters of type LIST with values
  const dynamicFilters = (filters || []).filter(f => f.type === 'LIST' && Array.isArray(f.values) && f.values.length > 0 && f.label.toLowerCase() !== 'availability');

  if (isMobile) {
    // Calculate selected filter count from selectedFilters (not mobileSelections)
        const selectedCount = (selectedFilters || []).length;
    return (
      <>
        <div className="flex justify-between w-full">
          <button className="flex items-center gap-2 cursor-pointer" onClick={() => setMobileModalOpen(true)}>
            <Image src="/assets/images/icons/filter_icon.svg" alt="Filter Icon" width={16}/>
            <p className="text-[#111111] text-[14px]">Filters ({selectedCount})</p>
          </button>
          <div className="flex items-center gap-2">
                <p className="text-[#111111] text-[14px]">{typeof totalCount === 'number' ? totalCount : ''} Results</p>
            <Image src="/assets/images/icons/sorting.svg" alt="Sorting Icon" width={16}/>
          </div>
        </div>
        <div>
          <MobileFilterModal
            isOpen={mobileModalOpen}
            onClose={() => setMobileModalOpen(false)}
            selections={mobileSelections}
            onOptionToggle={handleMobileOptionToggle}
            onApply={handleMobileApply}
            dynamicFilters={dynamicFilters}
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
                    key={vType.type}
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
              key={toggleOption}
              onClick={() => toggleDiamondType(toggleOption)}
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

        <FilterStyleListAccordion dynamicFilters={dynamicFilters} selectedFilters={selectedFilters as any[]} onFilterChange={onFilterChange ?? (() => {})} />
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
                key={toggleOption}
                onClick={() => toggleDiamondType(toggleOption)}
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
                  key={vType.type}
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
            {dynamicFilters.map((filter) => (
              <FilterDropdown
                key={filter.id}
                label={filter.label}
                count={filter.values?.reduce((acc: number, v: any) => acc + (typeof v.count === 'number' ? v.count : 0), 0)}
                isOpen={activeFilter === filter.label}
                onClick={() => handleFilterClick(filter.label)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={"/"} className="flex items-center gap-2 text-[14px] bg-white rounded-2xl px-2 py-0 border-1 border-[#ef9000]">Quickship <Image src="/assets/images/icons/quickship_icon.svg" alt="Quickship" width={20} /></Link>
          <SortDropdown
            options={[
              { label: 'Manual', value: 'MANUAL' },
              { label: 'Best Seller', value: 'BEST_SELLING' },
              { label: 'Price (Low > High)', value: 'PRICE_ASC' },
              { label: 'Price (High > Low)', value: 'PRICE_DESC' },
              { label: 'New Arrivals', value: 'CREATED_DESC' },
            ]}
            onChange={onSortChange}
            value={sortParam}
          />
        </div>
      </div>

      {/* Expandable Panel */}
      {activeFilter && activeFilterObj && (
        <div className="absolute bg-white z-99 w-full border-1 border-[#dee2e6] left-0">
          <div className="px-5 py-6">
            <div className="flex flex-wrap gap-2">
              {activeFilterObj.values && activeFilterObj.values.length > 0 ? (
                activeFilterObj.values
                  .filter((option: any) => {
                    if (
                      activeFilterObj.label &&
                      activeFilterObj.label.toLowerCase() === "metal"
                    ) {
                      const name = option.metaobject.name?.toLowerCase() || "";
                      // console.log("name active", name);
                      return (
                        name.includes("9k") ||
                        name.includes("silver") ||
                        name.includes("platinum")
                      );
                    }
                    return option.metaobject && option.metaobject.code && option.metaobject.code.trim() !== "";
                  })
                  .map((option: any) => {
                    const code = option.metaobject.code.toLowerCase();
                    const label = activeFilterObj.label ? activeFilterObj.label.toLowerCase() : "";
                    const isShapeOrSettingType = ["shape", "setting type"].includes(label);
                    const isMetalOrStoneType = ["metal", "stonetype", "stone type"].includes(label);
                    const imageName = isShapeOrSettingType ? `${code}.svg` : `${code}_100x50.png`;
                    // Set image size: 40x40 for metal/stone type, 60x30 for others
                    const imgWidth = isMetalOrStoneType ? 40 : 60;
                    const imgHeight = isMetalOrStoneType ? 40 : 30;
                    // Add all metaobject fields as data attributes
                    const metaAttrs = Object.entries(option.metaobject)
                      .filter(([k]) => k !== 'code')
                      .reduce((acc, [k, v]) => {
                        acc[`data-${k.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = v;
                        return acc;
                      }, {} as Record<string, any>);
                    // Check if this value is selected
                    const isSelected = Array.isArray(selectedFilters) && (selectedFilters as any[]).some(f => f.id === activeFilterObj.id && (f.value === option.label || f.value === option.metaobject?.id));
                    // Add required attributes for filter_param logic
                    const groupId = option.metaobject?.filter_group_id || option.metaobject?.group_id || option.metaobject?.groupId;
                    const filterIdAttr = option.metaobject?.filter_id || option.metaobject?.id || option.metaobject?.filterId;
                    return (
                      <div
                        className="max-w-[90px] group mt-2 px-2 relative flex flex-col items-center cursor-pointer"
                        key={option.id}
                        data-code={code}
                        data-metaobject-id={option.metaobject?.id || ''}
                        data-label={option.label}
                        data-filter_group_id={groupId || ''}
                        data-filter_id={filterIdAttr || ''}
                        {...metaAttrs}
                        onClick={() => handleSelectFilterValue(activeFilterObj.id, option.label, option.metaobject?.id)}
                      >
                        <a href={option.url || ''}>
                          <div className={cn(
                            "p-2 rounded-2xl border-[0.7px]",
                            isSelected ? "border-[#E07A5F]" : "border-white",
                            "group-hover:border-[#E07A5F]"
                          )}>
                            <Image src={`https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${imageName}`} alt={option.label} width={imgWidth} height={imgHeight}/>
                          </div>
                          <p className={cn(
                            "text-[12px] mt-1 text-[#111111] text-thin text-center leading-[13px]"
                          )}>
                          {option.label}
                          {typeof option.count === 'number' && (
                            <span className="ml-1 text-gray-500">({option.count})</span>
                          )}
                          </p>
                        </a>
                      </div>
                    );
                  })
              ) : (
                <div className="bg-filter-panel p-6">
                  <div className="max-w-7xl mx-auto">
                    <p className="text-filter-placeholder text-sm text-center">
                      No Options Available Right Now
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => { setActiveFilter(null); setActiveFilterObj(null); }}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-filter-close-hover transition-colors cursor-pointer"
          >
            <Image src="/assets/images/icons/x_white.svg" alt="Close" className="text-white" width={16}/>
          </button>
        </div>
      )}

    </>
  );
};

export default FilterBar;
