import React, {memo, useState} from "react";
import {Image} from "@shopify/hydrogen";
import {Link} from "react-router";
import {cn} from "~/lib/utils";
import {ShapeStoneDropdown} from "../Category/ShapeStoneDropdown";

interface MetalOption {
  name: string;
  color: string;
}

interface ProductCardCollectionProps {
  product: any;
}

const defaultMetals: MetalOption[] = [
  { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
  { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
  { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
  { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
];

const ProductCardCollection = memo(({ product }: ProductCardCollectionProps) => {
  // Extract dynamic options from product.variants or product.options
  const metals = (product.options?.find(o => o.name.toLowerCase() === 'metal')?.values || []).filter((m: string) => [
    '9K White Gold', '9K Yellow Gold', '9K Rose Gold', 'Platinum'
  ].includes(m));
  const shapes = product.options?.find(o => o.name.toLowerCase() === 'shape')?.values || [];
  const stones = product.options?.find(o => o.name.toLowerCase() === 'stone type' || o.name.toLowerCase() === 'stonetype')?.values || [];

  // Defensive: avoid undefined state if arrays are empty
  const initialShape = Array.isArray(shapes) && shapes.length > 0 ? shapes[0] : '';
  const initialStone = Array.isArray(stones) && stones.length > 0 ? stones[0] : '';
  const initialMetal = Array.isArray(metals) && metals.length > 0 ? metals[0] : '';

  const [selectedShape, setSelectedShape] = useState(initialShape);
  const [selectedStone, setSelectedStone] = useState(initialStone);
  const [activeMetal, setActiveMetal] = useState(initialMetal);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const variants = product.variants?.nodes || [];

  // Helper: get available metals for selected shape and stone
  const getAvailableMetals = (shape: string, stone: string) => {
    const metalSet = new Set<string>();
    variants.forEach((variant: any) => {
      const vMetal = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'metal')?.value;
      const vShape = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'shape')?.value;
      const vStone = variant.selectedOptions?.find((o: any) => (o.name.toLowerCase() === 'stone type' || o.name.toLowerCase() === 'stonetype'))?.value;
      if (vShape === shape && vStone === stone && vMetal) {
        metalSet.add(vMetal);
      }
    });
    return metals.filter(m => metalSet.has(m));
  };

  // Linked option logic: filter metal options based on selected shape and stone
  const linkedMetalOptions = getAvailableMetals(selectedShape, selectedStone);

  // When selectedShape or selectedStone changes, auto-select first available metal if current is not valid
  React.useEffect(() => {
    if (!linkedMetalOptions.includes(activeMetal)) {
      setActiveMetal(linkedMetalOptions[0] || '');
    }
  }, [selectedShape, selectedStone, variants.length]);

  // Helper: get available shapes for selected metal and stone
  const getAvailableShapes = (metal: string, stone: string) => {
    const shapeSet = new Set<string>();
    variants.forEach((variant: any) => {
      const vMetal = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'metal')?.value;
      const vStone = variant.selectedOptions?.find((o: any) => (o.name.toLowerCase() === 'stone type' || o.name.toLowerCase() === 'stonetype'))?.value;
      const vShape = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'shape')?.value;
      if (vMetal === metal && vStone === stone && vShape) {
        shapeSet.add(vShape);
      }
    });
    return shapes.filter(s => shapeSet.has(s));
  };

  // Helper: get available stones for selected metal and shape
  const getAvailableStones = (metal: string, shape: string) => {
    const stoneSet = new Set<string>();
    variants.forEach((variant: any) => {
      const vMetal = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'metal')?.value;
      const vShape = variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'shape')?.value;
      const vStone = variant.selectedOptions?.find((o: any) => (o.name.toLowerCase() === 'stone type' || o.name.toLowerCase() === 'stonetype'))?.value;
      if (vMetal === metal && vShape === shape && vStone) {
        stoneSet.add(vStone);
      }
    });
    return stones.filter(st => stoneSet.has(st));
  };

  // Linked option logic: filter shape options based on selected metal and stone
  const linkedShapeOptions = getAvailableShapes(activeMetal, selectedStone);
  // Linked option logic: filter stone options based on selected metal and shape
  const linkedStoneOptions = getAvailableStones(activeMetal, selectedShape);

  // When selectedStone changes, auto-select first available shape for that stone
  React.useEffect(() => {
    const availableShapes = getAvailableShapes(activeMetal, selectedStone);
    if (!availableShapes.includes(selectedShape)) {
      setSelectedShape(availableShapes[0] || '');
    }
  }, [selectedStone, activeMetal, variants.length]);

  // When selectedShape changes, auto-select first available stone for that shape
  React.useEffect(() => {
    const availableStones = getAvailableStones(activeMetal, selectedShape);
    if (!availableStones.includes(selectedStone)) {
      setSelectedStone(availableStones[0] || '');
    }
  }, [selectedShape, activeMetal, variants.length]);

  // Find variant matching selected options (recompute on every render)
  const selectedVariant = variants.find((variant: any) => {
    return (
      (!activeMetal || variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'metal')?.value === activeMetal) &&
      (!selectedShape || variant.selectedOptions?.find((o: any) => o.name.toLowerCase() === 'shape')?.value === selectedShape) &&
      (!selectedStone || variant.selectedOptions?.find((o: any) => (o.name.toLowerCase() === 'stone type' || o.name.toLowerCase() === 'stonetype'))?.value === selectedStone)
    );
  }) || variants[0];

  // Use custom keyword metafield for product URL if available
  const keyword = product.keywordMetafield?.value;
  const productUrl = keyword ? `/product/${keyword}` : `/products/${product.handle}`;


  // --- DYNAMIC IMAGE LOGIC ---
  // Get metafields (from GraphQL: product.metafield_image, product.metafield_category_image_counter)
  const imageMetafield = product.metafield_image?.value || "";
  const categoryImageCounterMetafield = product.metafield_category_image_counter?.value || "";

  // Helper: get metal code
  const getMetalCode = (metal: string) => {
    switch (metal) {
      case "9K White Gold": return "ww";
      case "9K Yellow Gold": return "yy";
      case "9K Rose Gold": return "rr";
      case "Platinum": return "ww";
      default: return "ww";
    }
  };

  // Helper: get shape/stone code
  const SHAPE_CODES = {
    Round: "rnd", Princess: "prn", Emerald: "emr", Asscher: "asc", Oval: "ovl", Pear: "per", Heart: "hrt", Marquise: "mqs", Cushion: "cus", Radiant: "rdt"
  };
  const STONE_CODES = {
    "Lab Grown Diamond": "di", "Natural Diamond": "di", Moissanite: "di", "Blue Sapphire": "bs", Ruby: "rb", Emerald: "em", Tanzanite: "tz", Amethyst: "amethyst", Garnet: "gr", "Black Diamond": "bd"
  };

  // Build image filenames for selected variant
  let baseParts = imageMetafield.split("_");
  if (baseParts.length < 13) baseParts = ["product","images","default","setpln","bandpln","shnkstd","none","med","ww","di","rnd","300","0001.jpg"];

  // Replace metal, stone, shape
  baseParts[8] = getMetalCode(activeMetal);
  baseParts[9] = STONE_CODES[selectedStone] || baseParts[9];
  baseParts[10] = SHAPE_CODES[selectedShape] || baseParts[10];
  // Force position 11 to '300' always
  baseParts[11] = '300';

  // Build 3 main images
  const CDN_BASE = "https://cdn.shopify.com/s/files/1/0933/1789/0388/files/";
  const images = [1,2,3].map(i => {
    const parts = [...baseParts];
    parts[12] = `000${i}.jpg`;
    let filename = parts.join("_");
    filename = filename.replace("product_images", "product_avif_images").replace(/\.jpg$/, "_500x500.avif");
    return CDN_BASE + filename;
  });

  // 4th image logic
  let showFourth = false;
  let fourthImage = "";
  let counters = [];
  let variantIndex = -1;
  if (categoryImageCounterMetafield && variants.length) {
    counters = categoryImageCounterMetafield.split(",").map(v => parseInt(v.trim(),10));
    variantIndex = variants.findIndex((variant: any) => variant.id === selectedVariant.id);
    if (variantIndex >= 0 && counters[variantIndex] > 0) {
      showFourth = true;
      let parts = [...baseParts];
      // Remove the 11th key (index 11) for the 4th image
      parts.splice(11, 1);
      parts[11] = `m0001.jpg`;
      let filename = parts.join("_");
      filename = filename.replace("product_images", "product_avif_images").replace(/\.jpg$/, "_500x500.avif");
      fourthImage = CDN_BASE + filename;
    }
  }
  // Debug logging for 4th image logic (always runs)
  // eslint-disable-next-line no-console
  // console.log('[4th image debug]', {
  //   categoryImageCounterMetafield,
  //   counters,
  //   variantIndex,
  //   selectedVariantId: selectedVariant?.id,
  //   countersAtIndex: counters[variantIndex],
  //   showFourth,
  //   fourthImage,
  // });

  const thumbnails = showFourth ? [...images, fourthImage] : images;

  // State for main image index
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // When variant/option changes, reset main image to first thumb
  // Use selectedVariant, selectedShape, selectedStone, activeMetal as dependencies
  // (We use a stringified key to avoid unnecessary resets)
  const variantKey = `${activeMetal}|${selectedShape}|${selectedStone}`;
  React.useEffect(() => {
    setMainImageIndex(0);
  }, [variantKey]);

  const image = thumbnails[mainImageIndex] || thumbnails[0];
  const price = selectedVariant?.price?.amount ? Number(selectedVariant.price.amount) : 0;
  const currency = selectedVariant?.price?.currencyCode || "£";

  const handleWishlist = () => setIsWishlisted(!isWishlisted);

  // Only show selectors if there are multiple options/variants
  const showSelectors = (metals.length > 1 || shapes.length > 1 || stones.length > 1) && variants.length > 1;

  // --- UI/UX RESTORED TO DESIGNER'S ORIGINAL ---
  return (
    <div
      className={"group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_#0000,0_0_#0000,0px_8px_16px_rgba(49,63,78,0.1)]"}
      data-product-id={product.id}
    >
      <div className="relative bg-[#fcfbf9] aspect-square m-2 overflow-hidden">
        <Link to={productUrl} className="block w-full h-full">
          <Image
            src={image}
            alt={product.title}
            className="mix-blend-multiply"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 25vw"
            // Only add width/crop params for non-AVIF images
            {...(!image.endsWith('.avif') ? {src: image + '?width=500&crop=center'} : {})}
          />
        </Link>
        <button
          onClick={e => { e.stopPropagation(); handleWishlist(); }}
          className={"absolute top-2 right-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100"}
        >
          <Image src="/assets/images/icons/heart_gold.svg" alt="Like" width={20} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); }}
          className="absolute bottom-4 right-4 z-10 text-[10px] bg-white border-black border-1 py-1 px-2 rounded-xl"
        >
          Quick View
        </button>
      </div>
      {/* Metal radios (designer style) */}
      {showSelectors && (
        <div className="flex justify-center gap-2 py-3">
          {linkedMetalOptions.map((metal) => (
            <button
              key={metal}
              onMouseEnter={() => setActiveMetal(metal)}
              onFocus={() => setActiveMetal(metal)}
              className={cn(
                "w-4 h-4 rounded-full border border-[1.5px] transition-all duration-200 cursor-pointer",
                activeMetal === metal
                  ? "border-[#c9a96e] ring-1 ring-[#c9a96e] ring-offset-[1.5px]"
                  : "border-gray-200 hover:border-[#c9a96e] focus:border-[#c9a96e] hover:ring-1 hover:ring-[#c9a96e] hover:ring-offset-[1.5px] focus:ring-1 focus:ring-[#c9a96e] focus:ring-offset-[1.5px]"
              )}
              style={{ background: getMetalColor(metal) }}
              title={metal}
              type="button"
              tabIndex={0}
            />
          ))}
        </div>
      )}
      {/* Shape and Stone dropdowns (designer style) */}
      {showSelectors && (
        <ShapeStoneDropdown
          shapeLabel={selectedShape}
          stoneLabel={selectedStone}
          onShapeChange={setSelectedShape}
          onStoneChange={setSelectedStone}
          shapeOptions={linkedShapeOptions}
          stoneOptions={linkedStoneOptions}
        />
      )}
      <div className="md:h-12 h-auto px-4">
        <div className="hidden group-hover:flex justify-center gap-2 animate-fade-in">
          {thumbnails.slice(0, 4).map((thumb, index) => {
            const isActive = index === mainImageIndex;
            return (
              <div
                key={thumb}
                className={cn(
                  "w-10 h-10 rounded-lg border overflow-hidden cursor-pointer transition-colors",
                  isActive ? "border-2 border-[#c9a96e]" : "border border-gray-200 hover:border-[#c9a96e]"
                )}
                onMouseEnter={() => setMainImageIndex(index)}
                onFocus={() => setMainImageIndex(index)}
                tabIndex={0}
              >
                <Image
                  src={thumb}
                  alt={`Image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 20vw, 5vw"
                  {...(!thumb.endsWith('.avif') ? {src: thumb + '?width=100&crop=center'} : {})}
                />
              </div>
            );
          })}
        </div>
        <h3 className="block group-hover:hidden text-center text-[13px] text-[#111111] tracking-wide text-gray-700 leading-tight pt-2">
          {product.title}
        </h3>
      </div>
      <p className="text-center pb-4">
        <span className="text-[14px] text-[#898989]">From </span>
        <span className="font-regular text-[#111111]">
          {currency === "GBP" ? "£" : currency}{price.toLocaleString()}
        </span>
      </p>
    </div>
  );
});

function getMetalColor(metal: string) {
  switch (metal) {
    case '9K White Gold': return 'radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)';
    case '9K Yellow Gold': return 'radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)';
    case '9K Rose Gold': return 'radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)';
    case 'Platinum': return 'radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)';
    default: return '#eee';
  }
}

export default ProductCardCollection;
