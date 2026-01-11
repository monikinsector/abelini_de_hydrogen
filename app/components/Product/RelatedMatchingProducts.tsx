import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  zoomImage?: string;
  href: string;
};
function ProductCard({ product }: { product: any }) {
  return (
    <div className="min-w-[200px] bg-white snap-start rounded-lg overflow-hidden">
      <a href={product.href} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto"
          loading="lazy"
        />

        {product.zoomImage && (
          <div className="absolute bottom-1 left-1 w-20 h-20 rounded-full overflow-hidden">
            <img
              src={product.zoomImage}
              alt="Zoom"
              className="absolute top-0 left-0 w-full scale-200 origin-top"
              loading="lazy"
            />
          </div>
        )}
      </a>

      <div className="p-2 text-center">
        <p className="text-[12px] leading-[18px] tracking-wide text-[#575757] line-clamp-2">
          {product.name}
        </p>
        <p className="text-[14px] font-medium text-black mt-1">
          From {product.price}
        </p>
      </div>
    </div>
  );
}

const tabs = ['Related Product', 'Matching Product'];

export default function RelatedMatchingProducts({
  relatedProducts,
  matchingProducts,
}: {
  relatedProducts: Product[];
  matchingProducts: Product[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const products = activeTab === 0 ? relatedProducts : matchingProducts;

  return (
    <section className="bg-[#f5f5f5] py-6 ">
      <div className="max-w-[1140px] mx-auto px-4">
        {/* Tabs */}
      {/* Tabs */}
<div className="grid grid-cols-12 mb-6">
  {/* Tabs container: centered (col 5 → col 8) */}
  <div className="md:col-span-6 md:col-start-4 flex justify-center col-span-12 ">
    <div className="flex w-full max-w-md">
      {tabs.map((tab, i) => {
        const isActive = activeTab === i;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`
              flex-1
              cursor-pointer
              px-4
              py-2
              text-sm font-medium
              text-black
              transition-all
              ${
                isActive
                  ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]'
                  : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'
              }
              ${i === 0 ? 'rounded-tl-[14px]' : 'rounded-tr-[14px]'}
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  </div>
</div>





        {/* Slider */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
