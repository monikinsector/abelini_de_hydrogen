import { Image } from '@shopify/hydrogen';
import {useState, useRef, useEffect} from 'react';
import { cn } from '~/lib/utils';

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
};

function SortDropdown({
  options,
  placeholder = 'Select an option',
  onChange,
}: Readonly<DropdownProps>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>({label: "Best Seller", value: "best_seller"});
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectOption = (option: DropdownOption) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option.value);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[14px] bg-white rounded-2xl px-2 py-0 border-1 border-white hover:border-black cursor-pointer"
      >
        <span>{selected?.label ?? placeholder}</span>
        <Image src='/assets/images/icons/c_down.svg' alt='Down' className={cn(
                "transition-transform",
                open ? "rotate-180" : ""
        )} width={20}/>
      </button>
      <div
        className={`absolute z-20 z-[99999] mt-2 -left-[60px] rounded-lg border border-gray-200 bg-white shadow-lg transition-all ${
          open
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-1'
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => selectOption(option)}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}


export default SortDropdown;