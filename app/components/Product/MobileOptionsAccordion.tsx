import { Image } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';

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

/* ---------------- OPTIONS ---------------- */

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

/* ---------------- COMPONENT ---------------- */

export default function SideAccordionSelector() {
  const [activeTab, setActiveTab] = useState<TabKey>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [metal, setMetal] = useState(METAL_OPTIONS[0]);
  const [stone, setStone] = useState(STONE_OPTIONS[0]);
  const [shape, setShape] = useState(SHAPE_OPTIONS[0]);
  const [carat, setCarat] = useState(1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [lockedWidth, setLockedWidth] = useState<number>();

  /* Lock width so it never shrinks */
  useEffect(() => {
    if (wrapperRef.current) {
      setLockedWidth(wrapperRef.current.offsetWidth);
    }
  }, []);

  /* ---------------- Animation Direction ---------------- */

  function getPanelAnimation() {
    if (activeIndex === 0) return 'translate-x-full';
    if (activeIndex === 3) return '-translate-x-full';
    return 'scale-95 opacity-0';
  }

  /* ---------------- TAB HEADER ---------------- */

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
        className={`flex flex-col items-center justify-center px-6 py-1 gap-1
        ${!isLast ? 'border-r border-gray-300' : ''}`}
      >
        {item.image && (
          <Image src={item.image} alt={item.label} width={28} height={28} />
        )}
        <span className="text-[10px] whitespace-nowrap">{item.label}</span>
      </button>
    );
  }

  /* ---------------- OPTION GRID ---------------- */

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
      <div className="flex gap-4 justify-center overflow-x-auto scrollbar-hide px-3">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => {
              onSelect(o);
              setActiveTab(null);
              setActiveIndex(null);
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

  /* ---------------- CARAT ---------------- */

  function CaratOption() {
    return (
      <div
        className="flex flex-col items-center gap-2 w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="range"
          min={0.2}
          max={10}
          step={0.1}
          value={carat}
          onChange={(e) => setCarat(Number(e.target.value))}
          className="w-full"
        />
        <span className="text-xs">{carat.toFixed(2)} ct</span>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div className="lg:hidden flex justify-center px-[15px]">
      <div
        ref={wrapperRef}
        style={{ width: lockedWidth }}
        className="relative rounded-3xl border border-[#ced4da] bg-[#faf6ef] overflow-hidden"
      >
        {/* CLOSED TABS */}
        <div
          className={`flex px-2 py-[6px] transition-transform duration-300 ease-out
          ${activeTab ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
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
            item={{ label: `${carat.toFixed(2)} ct` }}
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
          transition-all duration-300 ease-out
          ${
            activeTab
              ? 'translate-x-0 opacity-100'
              : `${getPanelAnimation()} opacity-0 pointer-events-none`
          }`}
          onClick={() => {
            setActiveTab(null);
            setActiveIndex(null);
          }}
        >
          <button
            onClick={() => {
              setActiveTab(null);
              setActiveIndex(null);
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
