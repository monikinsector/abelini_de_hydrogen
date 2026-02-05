import { Image } from "@shopify/hydrogen";
import type { StyleTypes } from "./filteroption.types";
import { styles } from "./filteroption.data";

interface StylePanelProps {
  onClose: () => void;
  activeFilter: string | null;
}


const StylePanel = ({ onClose, activeFilter }: StylePanelProps) => {
  // Only show panel if activeFilter is a known key in styles
  const hasOptions = activeFilter && styles[activeFilter] && styles[activeFilter].length > 0;
  return (
    <div className="bg-filter-panel animate-slide-down">
      <div className="px-5 py-6">
        <div className="flex flex-wrap gap-2">
          {hasOptions ?
            styles[activeFilter!].map((style, index) => {
              return (
                <div className="max-w-[90px] group mt-2 px-2 relative flex flex-col items-center cursor-pointer" key={style.label}>
                  {style.icon ? 
                  <>
                  <div className="group-hover:border-[0.7px] group-hover:border-[#E07A5F] border-[0.7px] border-white p-4 rounded-2xl">
                    <Image src="/assets/images/solitaire.avif" alt={style.label} width={60}/>
                  </div>
                  {/* <Image src="/assets/images/icons/checkbox.svg" alt="Checkbox" width={12} className="absolute top-1 right-4"/> */}
                  <p className="text-[12px] mt-1 text-[#111111] text-thin text-center leading-[13px]">{style.label}</p>
                  </>
                  :
                  <div className="group-hover:border-[0.7px] group-hover:border-[#E07A5F] border-[0.7px] border-white p-4 rounded-2xl">
                      <p className="text-[12px] mt-1 text-[#111111] text-thin text-center leading-[13px]">{style.label}</p>
                  </div>
                }
                </div>
              )
            })
            :
            <div className="bg-filter-panel p-6">
              <div className="max-w-7xl mx-auto">
                <p className="text-filter-placeholder text-sm text-center">
                  No Options Available Right Now
                </p>
              </div>
            </div>
          }
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-filter-close-hover transition-colors cursor-pointer"
      >
        <Image src="/assets/images/icons/x_white.svg" alt="Close" className="text-white" width={16}/>
      </button>
    </div>
  );
};

export default StylePanel;
