import { memo, useState } from "react";
import FilterBar from "./Filters/FilterBar";
import { cn } from "~/lib/utils";
import ProductCard from "./ProductCard";
import { sampleRings } from "./Data/category.data";

interface ProductsGridProps {
  products: typeof sampleRings;
  viewMode: "grid" | "list";
}

const ProductsGrid = memo(
  ({ products, viewMode }: ProductsGridProps) => {
    return (
      <div
        className={cn(
          "grid gap-3 grid-cols-2",
          viewMode === "grid"
            ? "col-span-4 md:grid-cols-4"
            : "col-span-3 md:grid-cols-3 overflow-scroll"
        )}
      >
        {products.map((ring) => (
          <ProductCard
            key={ring.id}
            {...ring}
          />
        ))}
      </div>
    );
  }
);


const ProductsArea = () => {
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  return (
    <>
        {viewMode == "grid" &&
            <div className="hidden md:block">
                <FilterBar isMobile={false} viewMode={viewMode} setViewMode={setViewMode}/>
            </div>
        }

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-white border-t border-t-gray-300 py-6 px-4">

            <div className="col-span-3 block md:hidden">
                <FilterBar isMobile={true}  viewMode={"list"} setViewMode={() => {}}/>  
            </div>
            {viewMode == "list" &&
                <div className="hidden md:block">  
                    <FilterBar isMobile={false}  viewMode={viewMode} setViewMode={setViewMode}/>  
                </div>
            }
            <div className={cn(" gap-3 grid grid-cols-2 ", viewMode == "grid" ? "col-span-4 md:grid-cols-4" : "col-span-3 md:grid-cols-3 overflow-scroll")}>
              <ProductsGrid products={sampleRings} viewMode={viewMode} />
            </div>
        </div>
    </>
  );
};

export default ProductsArea;
