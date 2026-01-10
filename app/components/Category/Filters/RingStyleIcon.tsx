import { cn } from "~/lib/utils";

interface RingStyleIconProps {
  name: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

const RingStyleIcon = ({ name, icon, isSelected, onClick }: RingStyleIconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 min-w-[80px] relative group",
        isSelected 
          ? "ring-2 ring-filter-ring-selected bg-filter-ring-selected-bg" 
          : "hover:bg-filter-ring-hover"
      )}
    >
      {isSelected && (
        <div className="absolute top-1 right-1 w-5 h-5 bg-filter-ring-check rounded-full flex items-center justify-center">
            Check Icons here
        </div>
      )}
      <div className="w-16 h-12 flex items-center justify-center text-filter-ring-icon">
        {icon}
      </div>
      <span className="text-xs text-filter-ring-text text-center leading-tight max-w-[70px]">
        {name}
      </span>
    </button>
  );
};

export default RingStyleIcon;
