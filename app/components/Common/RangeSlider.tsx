import { useEffect, useState } from 'react';

type RangeSliderProps = {
  variant?: 'single' | 'double';

  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  /** Single slider */
  value?: number;
  onChange?: (value: number) => void;

  /** Double slider */
  rangeValue?: [number, number];
  onRangeChange?: (value: [number, number]) => void;
};

const RangeSlider = ({
  variant = 'single',
  min = 0.2,
  max = 10,
  step = 0.05,
  unit = 'ct',
  value: controlledValue,
  onChange,
  rangeValue,
  onRangeChange,
}: RangeSliderProps) => {
  if (variant === 'single') {
    const [value, setValue] = useState(controlledValue ?? min);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setValue(newValue);
      onChange?.(newValue);
    };

    return (
      <div className="flex w-full mt-4 items-center gap-3">
        <span className="text-p-13 text-[#626262] whitespace-nowrap">
          {min.toFixed(2)} {unit}
        </span>

        <div className="relative flex-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            style={{ touchAction: 'pan-x' }}
            className="
              relative w-full h-1 bg-[#878787] rounded-full appearance-none cursor-pointer m-0 p-0
              focus:outline-none

              [&::-webkit-slider-runnable-track]:h-1
              [&::-webkit-slider-runnable-track]:bg-[#878787]
              [&::-webkit-slider-runnable-track]:rounded-full

              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-black
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:shadow
              [&::-webkit-slider-thumb]:mt-[-10px]

              [&::-moz-range-track]:h-1
              [&::-moz-range-track]:bg-[#878787]
              [&::-moz-range-track]:rounded-full

              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border
              [&::-moz-range-thumb]:border-gray-400
            "
          />

          <div
            className="absolute -top-5 text-sm text-gray-700 whitespace-nowrap pointer-events-none"
            style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
          >
{/* Tooltip */}
<div
  className="absolute -top-0 pointer-events-none"
  style={{
    left: `calc(${percentage}% + 12px - ${percentage * 0.24}px)`,
    transform: 'translateX(-50%)',
  }}
>
  <div className="relative bg-[#1f1f1f] text-white text-xs px-[2px] py-[1px] rounded rounded-b-none flex items-center justify-center">
    {value.toFixed(2)}
    {unit}

    {/* Arrow */}
    <span className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1f1f1f] rotate-45" />
  </div>
</div>

          </div>
        </div>

        <span className="text-p-13 text-[#626262] whitespace-nowrap">
          {max.toFixed(2)} {unit}
        </span>
      </div>
    );
  }

  // Double Slider 
  const [range, setRange] = useState<[number, number]>(
    rangeValue ?? [min, max]
  );

  useEffect(() => {
    if (rangeValue) setRange(rangeValue);
  }, [rangeValue]);

  const [minVal, maxVal] = range;

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  const handleMinChange = (value: number) => {
    const newVal = Math.min(value, maxVal - step);
    const updated: [number, number] = [newVal, maxVal];
    setRange(updated);
    onRangeChange?.(updated);
  };

  const handleMaxChange = (value: number) => {
    const newVal = Math.max(value, minVal + step);
    const updated: [number, number] = [minVal, newVal];
    setRange(updated);
    onRangeChange?.(updated);
  };

  return (
    <div className="flex w-full mt-4 items-center gap-3">
      <span className="text-p-13 text-[#626262] whitespace-nowrap">
        {minVal.toFixed(2)}
        {unit}
      </span>

      <div className="relative flex-1 h-6">
        {/* Base track */}
        <div className="absolute top-1/2 h-1 w-full bg-[#878787] rounded-full -translate-y-1/2" />

        {/* Selected range */}
        <div
          className="absolute top-1/2 h-1 bg-[#F59E0B] rounded-full -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />



        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="
            absolute w-full appearance-none bg-transparent z-20 pointer-events-none
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:shadow
          "
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="
            absolute w-full appearance-none bg-transparent z-10 pointer-events-none
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:shadow
          "
        />
      </div>

      <span className="text-p-13 text-[#626262] whitespace-nowrap">
        {maxVal.toFixed(2)}
        {unit}
      </span>
    </div>
  );
};

export default RangeSlider;
