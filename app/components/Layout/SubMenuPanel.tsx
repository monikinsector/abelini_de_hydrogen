import { Image } from "@shopify/hydrogen";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface SubmenuItem {
  label: string;
  type: string;
  children?: { label: string; icon: string }[];
}

interface SubMenuPanelProps {
  isOpen: boolean;
  submenu?: {
    title: string;
    items: SubmenuItem[];
  };
  onBack: () => void;
  onClose: () => void;
}

export function SubMenuPanel({ isOpen, submenu, onBack, onClose }: SubMenuPanelProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleDropdown = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const handleBack = () => {
    setExpandedItems(new Set());
    onBack();
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full w-full max-w-md bg-white z-[60] transform transition-transform duration-300 ease-out overflow-hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Image src="/assets/images/icons/c_left.svg" alt="Back" width={20}/>
          <span className="text-sm font-medium text-gray-800">BACK</span>
        </button>
      </div>

      {/* Submenu Content */}
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {submenu?.items.map((item, index) => (
          <div key={index} className="border-b border-gray-100">
            {item.type === "link" ? (
              <a
                href="#"
                className="block px-6 py-5 text-sm font-medium tracking-wide text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-sm font-medium tracking-wide text-gray-800">
                    {item.label}
                  </span>
                  <div
                    className={cn(
                      "transition-transform duration-200",
                      expandedItems.has(item.label) ? "rotate-180" : ""
                    )}
                  >
                    <Image src="/assets/images/c_down.svg" alt="Down" width={20}/>
                  </div>
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-out bg-gray-50",
                    expandedItems.has(item.label) 
                      ? "max-h-[1000px] opacity-100" 
                      : "max-h-0 opacity-0"
                  )}
                >
                  {item.children?.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href="#"
                      className="flex items-center gap-3 px-8 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-lg">{child.icon}</span>
                      <span className="text-sm text-gray-700">{child.label}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
