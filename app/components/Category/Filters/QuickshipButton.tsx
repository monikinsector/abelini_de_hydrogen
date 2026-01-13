import { cn } from "~/lib/utils";

interface QuickshipButtonProps {
  isActive?: boolean;
  onClick?: () => void;
}

const QuickshipButton = ({ isActive, onClick }: QuickshipButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-filter-quickship-active text-filter-quickship-active-foreground"
          : "bg-filter-quickship text-filter-quickship-foreground hover:bg-filter-quickship-hover"
      )}
    >
      Quickship
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h13l4 8v4a1 1 0 01-1 1h-2M8 19h8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="19" r="2"/>
        <circle cx="17" cy="19" r="2"/>
        <path d="M5 6V4a1 1 0 011-1h9a1 1 0 011 1v2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export default QuickshipButton;
