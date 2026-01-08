import React from 'react'

export type ProductReviewPanelProps = {
  iframeSrc: string
  height?: number
}

const ProductReviewPanel: React.FC<ProductReviewPanelProps> = ({iframeSrc, height = 500}) => {
  return (
    <div className="w-full mt-4">
      <div className="h-['500px']" />
      <div className='h-[500px] overflow-auto border rounded-md'>
        <iframe
          title="Customer reviews powered by Trustpilot"
          loading="auto"
          src={iframeSrc}
          style={{position: 'relative', height: `${height}px`, width: '100%', borderStyle: 'none', display: 'block', overflow: 'hidden'}}
        />
      </div>
    </div>
  )
}

export default ProductReviewPanel
