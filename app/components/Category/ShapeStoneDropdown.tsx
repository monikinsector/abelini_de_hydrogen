import {memo, useState} from "react";
import {Image} from "@shopify/hydrogen";

type ShapeStoneDropdownProps = {
  shapeLabel?: string;
  stoneLabel?: string;
  onShapeChange?: (value: string) => void;
  onStoneChange?: (value: string) => void;
  shapeOptions?: string[];
  stoneOptions?: string[];
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
  "Radiant"
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
  "Black Diamond"
];

const SHAPE_CODES: Record<string, string> = {
  Round: "rnd",
  Princess: "prn",
  Emerald: "emr",
  Asscher: "asc",
  Oval: "ovl",
  Pear: "per",
  Heart: "hrt",
  Marquise: "mqs",
  Cushion: "cus",
  Radiant: "rdt",
};

const STONE_CODES: Record<string, string> = {
  "Lab Grown Diamond": "lbg",
  "Natural Diamond": "di",
  Moissanite: "msnt",
  "Blue Sapphire": "bs",
  Ruby: "rb",
  Emerald: "em",
  Tanzanite: "tz",
  Amethyst: "amethyst",
  Garnet: "gr",
  "Black Diamond": "bd"
};


function ShapeStoneDropdownBase({
  shapeLabel = "Round",
  stoneLabel = "Lab Grown Diamond",
  onShapeChange,
  onStoneChange,
  shapeOptions = SHAPE_OPTIONS,
  stoneOptions = STONE_OPTIONS,
}: Readonly<ShapeStoneDropdownProps>) {
  const [shapeOpen, setShapeOpen] = useState(false);
  const [stoneOpen, setStoneOpen] = useState(false);

  const handleShapeSelect = (value: string) => {
    setShapeOpen(false);
    onShapeChange?.(value);
  };

  const handleStoneSelect = (value: string) => {
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
            if (!shapeOpen) setStoneOpen(false);
          }}
          className="w-full flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-full bg-white hover:border-gray-300 transition-colors"
        >
          {(() => {
            const code = SHAPE_CODES[shapeLabel] || "rnd";
            const url = `https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${code}.svg`;
            return <Image src={url} alt={shapeLabel} width={16} />;
          })()}
          <span className="text-[10px] text-gray-700 flex-1 text-left truncate">
            {shapeLabel}
          </span>
          <Image
            src="/assets/images/icons/c_down.svg"
            alt="More"
            width={16}
          />
        </button>
        {shapeOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-gray-200 bg-white shadow-md max-h-48 overflow-auto">
            {shapeOptions.map((option) => {
              const code = SHAPE_CODES[option] || "rnd";
              const url = `https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${code}.svg`;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleShapeSelect(option)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-gray-700 hover:bg-gray-50"
                >
                  <Image src={url} alt={option} width={16} />
                  <span>{option}</span>
                </button>
              );
            })}
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
          {(() => {
            const code = STONE_CODES[stoneLabel] || "lbg";
            const url = `https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${code}.png`;
            return <Image src={url} alt={stoneLabel} width={16} />;
          })()}
          <span className="text-[10px] text-gray-700 flex-1 text-left truncate">
            {stoneLabel}
          </span>
          <Image
            src="/assets/images/icons/c_down.svg"
            alt="More"
            width={16}
          />
        </button>
        {stoneOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-gray-200 bg-white shadow-md max-h-48 overflow-auto">
            {stoneOptions.map((option) => {
              const code = STONE_CODES[option] || "lbg";
              const url = `https://cdn.shopify.com/s/files/1/0933/1789/0388/files/${code}.png`;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleStoneSelect(option)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-gray-700 hover:bg-gray-50"
                >
                  <Image src={url} alt={option} width={16} />
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const ShapeStoneDropdown = memo(ShapeStoneDropdownBase);

