import { useState } from "react";
import FilterBar from "./Filters/FilterBar";
import { cn } from "~/lib/utils";
import ProductCard from "./ProductCard";

const a = Array(100).fill("1");
const sampleRings = [
    {
      id: 1,
      title: "Low Set Round Platinum Lab Grown Diamond Classic Solitaire Engagement Rings",
      price: 600,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 2,
      title: "Halo Round Yellow Gold Natural Diamond Engagement Rings",
      price: 850,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 3,
      title: "Three Stone Princess Cut Rose Gold Diamond Ring",
      price: 1200,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 4,
      title: "Oval Cut Platinum Moissanite Vintage Style Ring",
      price: 720,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
  ];

const ProductsArea = () => {
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  return (
    <>
        {viewMode == "grid" &&
            <FilterBar viewMode={viewMode} setViewMode={setViewMode}/>
        }

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-white border-t border-t-gray-300 py-6 px-4">
            {viewMode == "list" &&
                <div className="hidden md:block">  
                    <FilterBar viewMode={viewMode} setViewMode={setViewMode}/>  
                </div>
            }
            <div className={cn(" gap-3 grid grid-cols-2 ", viewMode == "grid" ? "col-span-4 md:grid-cols-4" : "col-span-3 md:grid-cols-3 overflow-scroll")}>
            {sampleRings.map((ring) => (
            <ProductCard
              {...ring}
              onQuickView={() => console.log("Quick view:", ring.id)}
              onWishlist={() => console.log("Wishlist:", ring.id)}
            />
          ))}
            </div>
        </div>
        {/* {a.length} */}
    </>
  );
};

export default ProductsArea;
