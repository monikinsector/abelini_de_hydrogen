import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/utils";

interface FilterDropdownProps {
  label: string;
  isOpen?: boolean;
  onClick?: () => void;
}

const FilterDropdown = ({ label, isOpen, onClick }: FilterDropdownProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-[#626262] flex items-center gap-1.5 px-2 py-0 rounded-full text-[14px] font-regular bg-white border-1 hover:border-black cursor-pointer",
        isOpen
          ? "border-black"
          : "border-[#e3e3e3]"
      )}
    >
      {label}
      <Image src="/assets/images/icons/c_down.svg" alt="Down" width={14}/>
    </button>
  );
};

export default FilterDropdown;
