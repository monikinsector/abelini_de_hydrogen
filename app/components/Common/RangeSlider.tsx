import { useEffect, useState } from 'react';

type RangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  unit?: string;
  onChange?: (value: number) => void;
};

const RangeSlider = ({
  min = 0.2,
  max = 10,
  step = 0.05,
  value: controlledValue,
  unit = 'ct',
  onChange,
}: RangeSliderProps) => {
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
      <span className="text-p-13 text-[#626262] whitespace-nowrap">{min.toFixed(2)} {unit}</span>

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
            relative w-full h-1 bg-[#878787] rounded-full appearance-none cursor-pointer
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

            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-gray-400
          "
        />

        <div
          className="absolute -top-6 text-xs text-gray-700 whitespace-nowrap pointer-events-none"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          {value.toFixed(2)}{unit}
        </div>
      </div>

      <span className="text-p-13 text-[#626262] whitespace-nowrap">{max.toFixed(2)} {unit}</span>
    </div>
  );
};

export default RangeSlider;
