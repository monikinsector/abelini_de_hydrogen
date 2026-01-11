import {Image} from '@shopify/hydrogen';
import {useState} from 'react';

export type TabOption = {id: string; label: string; icon?: string};

export const TabOptions: React.FC<{
  options: TabOption[];
  initialSelected?: number;
  onChange?: (option: TabOption) => void;
  columns?: number;
  className?: string;
  labelClassName?: string;
}> = ({
  options,
  initialSelected = 0,
  onChange,
  columns = 4,
  className = '',
  labelClassName = '',
}) => {
  const [selected, setSelected] = useState<number>(initialSelected);

  const handle = (idx: number) => {
    setSelected(idx);
    onChange?.(options[idx]);
  };

  // use flex-wrap on desktop, overflow-x-auto on mobile for horizontal scroll
  return (
    <div
      className={`flex gap-1 overflow-x-auto md:flex-wrap md:overflow-visible ${className} p-[1px]`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {options.map((opt, idx) => (
        <button
          key={opt.id}
          onClick={() => handle(idx)}
          className={`flex-shrink-0 max-w-[100px]
flex flex-col items-center
px-[15px] py-[8px]
rounded-[12px]
border  text-[#111]
text-[12px]  leading-[14px]
bg-white${
            idx === selected
              ? 'ring-1 ring-[#ef9000] border-[#ef9000] bg-[#f8f4ef] cursor-pointer'
              : 'border bg-white border-[#b7b7b7] hover:bg-[#f8f4ef]  cursor-pointer hover:ring-[#ef9000]'
          }`}
        >
          {opt.icon && (
            <Image
              src={opt.icon}
              alt={opt.label}
              height={30}
              width={30}
              className=""
            />
          )}
          <div className={labelClassName}>{opt.label}</div>
        </button>
      ))}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
