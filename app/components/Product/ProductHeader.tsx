import React from 'react'
import Ratings from '~/components/Common/Ratings'

export type ProductHeaderProps = {
  title: string
  sku?: string
  reviewsText?: string
  rating?: number
}

const ProductHeader: React.FC<ProductHeaderProps> = ({title, sku, reviewsText, rating = 0}) => {
  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-2">
          <Ratings value={rating} text={reviewsText} />
        </div>

        {sku && (
          <div className="hidden md:block">
            <p className="text-[14px] text-[#BF8F5F]">SKU: <span className="productSKU">{sku}</span></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductHeader
