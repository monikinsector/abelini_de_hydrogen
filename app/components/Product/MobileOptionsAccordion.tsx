import { Image } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';
import RangeSlider from '../Common/RangeSlider';

type TabKey = 'metal' | 'stone' | 'shape' | 'carat' | null;

type OptionItem = {
  label: string;
  value: string;
  image: string;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'metal', label: 'Metal' },
  { key: 'stone', label: 'Stone' },
  { key: 'shape', label: 'Shape' },
  { key: 'carat', label: 'Carat' },
];


const METAL_OPTIONS: OptionItem[] = [
  { label: 'White Gold', value: 'white', image: '/assets/images/icons/white-gold.svg' },
  { label: 'Yellow Gold', value: 'yellow', image: '/assets/images/icons/white-gold.svg' },
  { label: 'Rose Gold', value: 'rose', image: '/assets/images/icons/rose-gold.svg' },
];

const STONE_OPTIONS: OptionItem[] = [
  { label: 'Moissanite', value: 'moissanite', image: '/assets/images/icons/di.svg' },
  { label: 'Lab Diamond', value: 'lab', image: '/assets/images/icons/di.svg' },
  { label: 'Natural Diamond', value: 'natural', image: '/assets/images/icons/di.svg' },
];

const SHAPE_OPTIONS: OptionItem[] = [
  { label: 'Round', value: 'round', image: '/assets/images/icons/rnd.svg' },
  { label: 'Oval', value: 'oval', image: '/assets/images/icons/rnd.svg' },
  { label: 'Pear', value: 'pear', image: '/assets/images/icons/rnd.svg' },
  { label: 'Heart', value: 'heart', image: '/assets/images/icons/rnd.svg' },
];


export default function SideAccordionSelector() {
  const [activeTab, setActiveTab] = useState<TabKey>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [metal, setMetal] = useState(METAL_OPTIONS[0]);
  const [stone, setStone] = useState(STONE_OPTIONS[0]);
  const [shape, setShape] = useState(SHAPE_OPTIONS[0]);
  const [carat, setCarat] = useState(1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  
  function getPanelInitialState() {
    if (activeIndex === 0) return '-translate-x-full opacity-0'; 
    if (activeIndex === 3) return 'translate-x-full opacity-0'; 
    return 'scale-95 opacity-0'; // Center Zoom
  }

  function getHeaderExitState() {
    if (activeIndex === 0) return 'translate-x-full opacity-0'; 
    if (activeIndex === 3) return '-translate-x-full opacity-0'; 
    return 'scale-110 opacity-0'; // Center Fade
  }

  

  function TabItem({
    item,
    onClick,
    isLast,
  }: {
    item: OptionItem | { label: string; image?: string };
    onClick: () => void;
    isLast?: boolean;
  }) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 px-1 py-1 gap-1
        ${!isLast ? 'border-r border-gray-300' : ''}`}
      >
        {item.image && (
          <Image src={item.image} alt={item.label} width={28} height={28} />
        )}
        <span className="text-[10px] whitespace-nowrap">{item.label}</span>
      </button>
    );
  }


  function OptionGrid({
    options,
    selected,
    onSelect,
  }: {
    options: OptionItem[];
    selected: OptionItem;
    onSelect: (o: OptionItem) => void;
  }) {
    return (
      <div 
        className="flex gap-4 justify-center overflow-x-auto scrollbar-hide px-3 w-full p-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => {
              onSelect(o);
              setActiveTab(null);
              // setActiveIndex(null); // Keep index for exit animation
            }}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
              ${selected.value === o.value ? 'ring-2 ring-[#bf8f5f]' : ''}`}
            >
              <Image src={o.image} alt={o.label} width={28} height={28} />
            </div>
            <span className="text-[10px] whitespace-nowrap">{o.label}</span>
          </button>
        ))}
      </div>
    );
  }


  function CaratOption() {
    return (
      <div
        className="flex flex-col items-center gap-2 w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <RangeSlider
          min={0.2}
          max={10}
          step={0.1}
          value={carat}
          onChange={(newVal) => setCarat(newVal)}
        />
      </div>
    );
  }


  return (
    <div className="lg:hidden flex justify-center px-[15px] w-full">
      <div
        ref={wrapperRef}
        className="relative w-full rounded-3xl border border-[#ced4da] bg-[#faf6ef] overflow-hidden"
      >
        {/* CLOSED TABS */}
        <div
          className={`flex px-2 py-[6px] transition-transform duration-500 ease-out
          ${activeTab ? getHeaderExitState() : 'translate-x-0 opacity-100'}`}
        >
          <TabItem
            item={metal}
            onClick={() => {
              setActiveTab('metal');
              setActiveIndex(0);
            }}
          />
          <TabItem
            item={stone}
            onClick={() => {
              setActiveTab('stone');
              setActiveIndex(1);
            }}
          />
          <TabItem
            item={shape}
            onClick={() => {
              setActiveTab('shape');
              setActiveIndex(2);
            }}
          />
          <TabItem
            item={{ label: `${carat.toFixed(2)} ct`, image: '/assets/images/icons/carat-slider.svg' }}
            onClick={() => {
              setActiveTab('carat');
              setActiveIndex(3);
            }}
            isLast
          />
        </div>

        {/* OPEN PANEL */}
        <div
          className={`absolute inset-0 flex items-center justify-center
          transition-all duration-500 ease-out
          ${
            activeTab
              ? 'translate-x-0 opacity-100'
              : `${getPanelInitialState()} pointer-events-none`
          }`}
          onClick={() => {
            setActiveTab(null);
            // setActiveIndex(null); // Keep index for exit animation
          }}
        >
          <button
            onClick={() => {
              setActiveTab(null);
              // setActiveIndex(null); // Keep index for exit animation
            }}
            className="absolute hidden right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400"
          >
            ×
          </button>

          {activeTab === 'metal' && (
            <OptionGrid options={METAL_OPTIONS} selected={metal} onSelect={setMetal} />
          )}

          {activeTab === 'stone' && (
            <OptionGrid options={STONE_OPTIONS} selected={stone} onSelect={setStone} />
          )}

          {activeTab === 'shape' && (
            <OptionGrid options={SHAPE_OPTIONS} selected={shape} onSelect={setShape} />
          )}

          {activeTab === 'carat' && <CaratOption />}
        </div>
      </div>
    </div>
  );
}
