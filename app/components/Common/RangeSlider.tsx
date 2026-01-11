import {useEffect, useState} from 'react';

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

  // Sync controlled value
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
      {/* Min */}
      <span className="text-p-13 text-[#626262] whitespace-nowrap">
        {min.toFixed(2)} {unit}
      </span>

      {/* Slider */}
      <div className="relative flex-1">
        {/* Filled track */}
        <div
          className="absolute top-1/2 h-2 rounded-full pointer-events-none"
          style={{
            width: `${percentage}%`,
            transform: 'translateY(-50%)',
          }}
        />

        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="
    relative w-full h-1 bg-[#878787] rounded-full appearance-none cursor-pointer
    focus:outline-none

    /* WebKit track */
    [&::-webkit-slider-runnable-track]:h-1
    [&::-webkit-slider-runnable-track]:bg-[#878787]
    [&::-webkit-slider-runnable-track]:rounded-full

    /* WebKit thumb (keep same) */
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-6
    [&::-webkit-slider-thumb]:w-6
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
    [&::-webkit-slider-thumb]:border-black
    [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:shadow
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:mt-[-10px] /* center thumb on thinner track */

    /* Firefox track */
    [&::-moz-range-track]:h-1
    [&::-moz-range-track]:bg-[#878787]
    [&::-moz-range-track]:rounded-full

    /* Firefox thumb (keep same) */
    [&::-moz-range-thumb]:h-5
    [&::-moz-range-thumb]:w-5
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-white
    [&::-moz-range-thumb]:border
    [&::-moz-range-thumb]:border-gray-400
    [&::-moz-range-thumb]:shadow
  "
        />

        

        {/* Tooltip */}
        <div
          className="absolute -top-6 text-xs text-gray-700 whitespace-nowrap pointer-events-none"
          style={{
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {value.toFixed(2)}
          {unit}
        </div>
      </div>

      {/* Max */}
      <span className="text-p-13 text-[#626262] whitespace-nowrap">
        {max.toFixed(2)} {unit}
      </span>
    </div>
  );
};

export default RangeSlider;
