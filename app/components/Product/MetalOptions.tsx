import { useState } from "react";
export type MetalOption = {
  label: string;
  gradientColor?: string;
};

const Badge: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  gradientColor?: string;
}> = ({
  children,
  active,
  gradientColor = 'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
}) => (
  <button
    type="button"
    className={`
      h-[35px] w-[35px]
      text-[12px]
      flex items-center justify-center
      rounded-full
      text-sm font-normal cursor-pointer
      transition-all leai
      ${
        active
          ? ' border-4 border-[#ef900080]'
          : 'text-black hover:bg-[#dcdcdc]'
      }
    `}
    style={{
      background: gradientColor,
    }}
  >
    {children}
  </button>
);

export const MetalOptions: React.FC<{
  metals?: MetalOption[];
  activeIndex?: number;
  label?: string;
  onMetalChange?: (index: number, metal: MetalOption) => void;
}> = ({
  metals = [
    {
      label: '9k',
      gradientColor:
        'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
    },
    {
      label: '18k',
      gradientColor:
        'linear-gradient(to bottom, #f4f4f4 0, #ccc 99%, #ccc 100%)',
    },
    {
      label: '9k',
      gradientColor:
        'linear-gradient(to bottom, #e6c17e 0, #c7a369 99%, #c7a369 100%)',
    },
    {
      label: '18k',
      gradientColor:
        'linear-gradient(to bottom, #e6c17e 0, #c7a369 99%, #c7a369 100%)',
    },
    {
      label: '9k',
      gradientColor: 'linear-gradient(to bottom, #e3b591 0, #c99d81 100%)',
    },
    {
      label: '18k',
      gradientColor: 'linear-gradient(to bottom, #e3b591 0, #c99d81 100%)',
    },
    {
      label: 'plt',
      gradientColor:
        'linear-gradient(to bottom, #c7c7c7 0, #9e9e9e 99%, #9e9e9e 100%)',
    },
  ],
  activeIndex: initialActiveIndex = 0,
  label = '9K White Gold',
  onMetalChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleMetalClick = (index: number) => {
    setActiveIndex(index);
    onMetalChange?.(index, metals[index]);
  };

  return (
    <div>
      <div className="text-sm text-black mb-2 leading-4">
        Metal: <span className="">{label}</span>
      </div>

      <div className="flex items-center gap-[10px] pt-[5px]">
        {metals.map((m, i) => (
          <button
            key={`${m.label}-${i}`}
            onClick={() => handleMetalClick(i)}
            className="cursor-pointer"
          >
            <Badge active={i === activeIndex} gradientColor={m.gradientColor}>
              {m.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};



