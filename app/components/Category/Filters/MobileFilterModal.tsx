import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/utils";
import { mobileFilterStyles } from "./filteroption.data";

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
}

const MobileFilterModal = ({
  isOpen,
  onClose,
  selections,
  onOptionToggle,
  onApply,
}: MobileFilterModalProps) => {
  const totalSelections = Object.values(selections).flat().length;

  const categories = mobileFilterStyles;


  const renderOption = (category: any, option: any) => {

    return (
        <div key={option.label}>
            <div className="h-14 w-14 rounded-full border-1 border-gray-200 flex justify-center items-center p-2">
                <Image src={option.image} alt={option.label}/>
            </div>
                <p className="text-center text-[12px] text-[#111111]">{option.label}</p>
        </div>
    )
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
          {Object.keys(categories).map((category, index) => (
            <div key={index} className="border-b border-filter-border">
              <h3 className="px-5 pt-5 pb-3 text-[12px] font-regular text-[#111111] tracking-wider uppercase">
                {category}
              </h3>
              <div className="px-5 pb-5 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2">
                  {categories[category].map((option) =>
                    renderOption(category, option)
                  )}
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
