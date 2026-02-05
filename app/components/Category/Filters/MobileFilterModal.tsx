import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/utils";

interface FilterCategory {
  key: string;
  title: string;
  options: any[];
  variant: "icon" | "color" | "shape" | "text";
}

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selections: Record<string, string[]>;
  onOptionToggle: (category: string, value: string) => void;
  onApply: () => void;
  dynamicFilters: any[];
}

const MobileFilterModal = ({
  isOpen,
  onClose,
  selections,
  onOptionToggle,
  onApply,
  dynamicFilters,
}: MobileFilterModalProps) => {
  const totalSelections = Object.values(selections).flat().length;

  const categories = dynamicFilters;

  const renderOption = (filter: any, option: any) => {
    // Determine if this option is selected from selections
    const filterId = filter.id || filter.label;
    const optionValue = option.metaobject?.id || option.label;
    const isSelected = selections[filterId]?.includes(optionValue);
    const code = option.metaobject?.code?.toLowerCase?.() || option.label.toLowerCase();
    if (!option.metaobject || !option.metaobject.code || option.metaobject.code.trim() === "") return null;
    const label = filter.label ? filter.label.toLowerCase() : "";
    let imgWidth = 40, imgHeight = 40, imageName = '';
    let showImage = true;
    if (label === "style") {
      imgWidth = 60;
      imgHeight = 60;
      imageName = `${code}-icon_200x200.avif`;
      showImage = true;
    } else if (["metal", "stonetype", "stone type"].includes(label)) {
      imgWidth = 40;
      imgHeight = 40;
      imageName = ["shape", "setting type"].includes(label)
        ? `${code}.svg`
        : `${code}_100x50.png`;
    } else if (["shape", "setting type"].includes(label)) {
      imgWidth = 30;
      imgHeight = 30;
      imageName = `${code}.svg`;
    } else if (label === "by recipient") {
      showImage = false;
    } else {
      // fallback for any other filter
      imgWidth = 40;
      imgHeight = 40;
      imageName = `${code}_100x50.png`;
    }
    let borderClass = "border-1 border-gray-200 ";
    let borderRadius = "rounded-full";
    let imageBorderRadius = undefined;
    if (label === "style") {
      imageBorderRadius = "50%";
    }
    if (["style", "metal", "stonetype", "stone type"].includes(label)) {
      borderClass = "";
    } else if (["shape", "setting type"].includes(label)) {
      borderClass = "border-1 border-gray-200 ";
      borderRadius = "rounded-[12px]";
    } else if (label === "by recipient") {
      borderClass = "border-1 border-gray-200 ";
      borderRadius = "rounded-[12px]";
    }
    return (
      <div
        key={option.id || option.label}
        className={label === "style" ? "flex flex-col items-center" : "flex flex-col items-center"}
        style={label === "style" ? { width: 65, minWidth: 65 } : {}}
        onClick={() => onOptionToggle(filterId, optionValue)}
      >
        <div className={`h-14 w-14 flex justify-center items-center ${borderRadius} ${isSelected ? 'border-[#ef9000] border-2' : borderClass}`} style={label === "style" ? { width: 58, minWidth: 58, maxWidth: 58, height: 60, minHeight: 60, maxHeight: 60 } : {}}>
          {showImage ? (
            <Image
              src={label === "style"
                ? `https://cdn.shopify.com/s/files/1/0963/0410/3712/files/${imageName}`
                : `https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${imageName}`}
              alt={option.label}
              width={imgWidth}
              height={imgHeight}
              style={{ width: imgWidth, height: imgHeight, display: "block", padding: 0, borderRadius: imageBorderRadius, objectFit: label === "style" ? "cover" : undefined }}
            />
          ) : (
            <span className="text-center text-[12px] text-[#111111] w-full">{option.label}</span>
          )}
        </div>
        {showImage && <p className="text-center text-[12px] text-[#111111]">{option.label}</p>}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <button
        className={cn(
          "fixed inset-0 bg-black/50 z-100 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-110 bg-white rounded-t-3xl transition-transform duration-300 ease-out flex flex-col",
          "max-h-[85vh]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl">
          <button
            className="text-sm font-thin underline"
          >
            Clear ({totalSelections})
          </button>
          <h2 className="text-base font-regular text-filter-dropdown-foreground tracking-wider">
            FILTER
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white"
          >
            X
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {categories.map((filter, index) => (
            <div key={filter.label} className="border-b border-filter-border">
              <h3 className="px-5 pt-5 pb-3 text-[12px] font-regular text-[#111111] tracking-wider uppercase">
                {filter.label}
              </h3>
              <div className="px-5 pb-5 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2">
                  {filter.values
                    .filter((option: any) => option.metaobject && option.metaobject.code && option.metaobject.code.trim() !== "")
                    .map((option: any) => renderOption(filter, option))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Apply Button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-filter-border">
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="w-full py-4 bg-black text-white font-semibold rounded-full text-base"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterModal;
