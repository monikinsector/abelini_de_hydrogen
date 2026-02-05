import React, { memo, useState } from 'react';
// For rendering HTML safely

import FilterBar from '~/components/Category/Filters/FilterBar';
import ProductCardCollection from './ProductCardCollection';
import { cn } from '~/lib/utils';


interface ProductsAreaCollectionProps {
  products: any[];
  filters: any[];
  selectedFilters: any[];
  sortParam?: string;
  onFilterChange: (filterId: string, value: string) => void;
  onSortChange?: (sort: string) => void;
  totalCount: number;
  onLoadMore?: () => void;
  endCursor?: string;
  banners?: Record<string, any>;
  renderActiveFilters?: () => React.ReactNode;
  loadingMore?: boolean;
}

const ProductsAreaCollection = ({
  products,
  filters: filtersProp,
  selectedFilters,
  sortParam,
  onFilterChange,
  onSortChange,
  onLoadMore,
  endCursor: endCursorProp,
  totalCount,
  banners,
  renderActiveFilters,
  loadingMore = false,
}: ProductsAreaCollectionProps) => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const currentCount = products.length;

  // Prepare banner positions (keys as numbers)
  const bannerPositions = banners ? Object.keys(banners).map(Number) : [];
  // Helper to render banner HTML
  // WARNING: This directly injects HTML from metafields. Ensure the source is trusted to avoid XSS.
  const renderBanner = (banner: any, key: string) => {
    if (!banner || !banner.html_code) return null;
    return (
      <div key={`banner-${key}`} className="collection-banner" dangerouslySetInnerHTML={{ __html: banner.html_code }} />
    );
  };

  const handleSortChange = (sort: string) => {
    if (typeof sort === 'string') {
      if (onSortChange) onSortChange(sort);
    }
  };

  return (
    <>
      {viewMode == "grid" && (
        <div className="hidden md:block">
          <FilterBar
            viewMode={viewMode}
            setViewMode={setViewMode}
            isMobile={false}
            filters={filtersProp}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            sortParam={sortParam}
            onSortChange={handleSortChange}
            totalCount={totalCount}
          />
          {renderActiveFilters && renderActiveFilters()}
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-white border-t border-t-gray-300 py-6 px-4">
        <div className="col-span-3 block md:hidden">
          <FilterBar
            viewMode={"list"}
            setViewMode={() => {}}
            isMobile={true}
            filters={filtersProp}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            sortParam={sortParam}
            onSortChange={handleSortChange}
            totalCount={totalCount}
          />
        </div>
        {viewMode == "list" && (
          <div className="hidden md:block">
            <FilterBar
              viewMode={viewMode}
              setViewMode={setViewMode}
              isMobile={false}
              filters={filtersProp}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
              sortParam={sortParam}
              onSortChange={handleSortChange}
            />
          </div>
        )}
        <div className={cn("gap-3 grid grid-cols-2", viewMode === "grid" ? "col-span-4 md:grid-cols-4" : "col-span-3 md:grid-cols-3 overflow-scroll")}> 
          {/* Interleave products and banners in correct order */}
          {(() => {
            const bannerPositions = banners ? Object.keys(banners).map(Number).sort((a, b) => a - b) : [];
            let maxGridSlot = products.length;
            let bannersToShow = bannerPositions.filter(pos => pos <= maxGridSlot);
            for (let i = 0; i < bannersToShow.length; i++) {
              maxGridSlot++;
              bannersToShow = bannerPositions.filter(pos => pos <= maxGridSlot);
            }
            const combined: Array<{ type: 'product' | 'banner'; data: any; key: string }> = [];
            let productIdx = 0;
            let nextBannerIdx = 0;
            for (let slot = 1; productIdx < products.length || nextBannerIdx < bannersToShow.length; slot++) {
              if (nextBannerIdx < bannersToShow.length && bannersToShow[nextBannerIdx] === slot) {
                combined.push({ type: 'banner', data: (banners ? banners[bannersToShow[nextBannerIdx]] : undefined), key: `banner-${bannersToShow[nextBannerIdx]}` });
                nextBannerIdx++;
              } else if (productIdx < products.length) {
                combined.push({ type: 'product', data: products[productIdx], key: `product-${products[productIdx].id}` });
                productIdx++;
              }
            }
            return combined.map((item) => {
              if (item.type === 'banner') {
                return renderBanner(item.data, item.key);
              } else {
                return <ProductCardCollection key={item.key} product={item.data} />;
              }
            });
          })()}
        </div>
      </div>
      {/* Product count and load more button */}
      <div className="flex flex-col items-center justify-center py-8 relative">
        <div className="text-gray-600 text-sm mb-2">
          {`You've viewed ${currentCount}${totalCount ? ` of ${totalCount}` : ''} Products`}
        </div>
        {onLoadMore && (
          <button
            className="bg-[#ef9000] text-white font-bold py-3 px-8 rounded-full text-lg shadow hover:bg-[#d87c00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onLoadMore}
            data-cursor={endCursorProp || ""}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'LOAD MORE PRODUCTS...'}
          </button>
        )}
      </div>
      <style>{`
        .loader {
          border-top-color: #ef9000;
          animation: spinner 1s linear infinite;
        }
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default memo(ProductsAreaCollection);
