import {memo, useState} from "react";
import {Image} from "@shopify/hydrogen";

type ShapeStoneDropdownProps = {
  shapeLabel?: string;
  stoneLabel?: string;
  onShapeChange?: (value: string) => void;
  onStoneChange?: (value: string) => void;
};

const SHAPE_OPTIONS: string[] = [
  "Round",
  "Princess",
  "Emerald",
  "Asscher",
  "Oval",
  "Pear",
  "Heart",
  "Marquise",
  "Cushion",
];

const STONE_OPTIONS: string[] = [
  "Lab Grown Diamond",
  "Natural Diamond",
  "Moissanite",
  "Blue Sapphire",
  "Ruby",
  "Emerald",
  "Tanzanite",
  "Amethyst",
  "Garnet",
];

function ShapeStoneDropdownBase({
  shapeLabel = "Round",
  stoneLabel = "Lab Grown Diamond",
  onShapeChange,
  onStoneChange,
}: Readonly<ShapeStoneDropdownProps>) {
  const [shapeOpen, setShapeOpen] = useState(false);
  const [stoneOpen, setStoneOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(shapeLabel);
  const [selectedStone, setSelectedStone] = useState(stoneLabel);

  const handleShapeSelect = (value: string) => {
    setSelectedShape(value);
    setShapeOpen(false);
    onShapeChange?.(value);
  };

  const handleStoneSelect = (value: string) => {
    setSelectedStone(value);
    setStoneOpen(false);
    onStoneChange?.(value);
  };

  return (
    <div className="flex-wrap md:flex-nowrap flex gap-2 px-4 pb-3">
      {/* Shape dropdown */}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => {
            setShapeOpen((prev) => !prev);
            // ensure only one dropdown open at a time
            if (!shapeOpen) setStoneOpen(false);
          }}
          className="w-full flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-full bg-white hover:border-gray-300 transition-colors"
        >
          <Image
            src="/assets/images/icons/rnd.svg"
            alt={selectedShape}
            width={16}
          />
          <span className="text-[10px] text-gray-700 flex-1 text-left truncate">
            {selectedShape}
          </span>
          <Image
            src="/assets/images/icons/c_down.svg"
            alt="More"
            width={16}
          />
        </button>
        {shapeOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-gray-200 bg-white shadow-md max-h-48 overflow-auto">
            {SHAPE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleShapeSelect(option)}
                className="w-full px-3 py-1.5 text-left text-[11px] text-gray-700 hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stone dropdown */}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => {
            setStoneOpen((prev) => !prev);
            if (!stoneOpen) setShapeOpen(false);
          }}
          className="w-full flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-full bg-white hover:border-gray-300 transition-colors"
        >
          <Image src="/assets/images/lbg.png" alt={selectedStone} width={16} />
          <span className="text-[10px] text-gray-700 flex-1 text-left truncate">
            {selectedStone}
          </span>
          <Image
            src="/assets/images/icons/c_down.svg"
            alt="More"
            width={16}
          />
        </button>
        {stoneOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-gray-200 bg-white shadow-md max-h-48 overflow-auto">
            {STONE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleStoneSelect(option)}
                className="w-full px-3 py-1.5 text-left text-[11px] text-gray-700 hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const ShapeStoneDropdown = memo(ShapeStoneDropdownBase);

