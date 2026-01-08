import React, {useState} from 'react'

export type MediaTab = {
  key: string
  label: string
  count?: number
  icon?: React.ReactNode
}

export type ProductMediaTabsProps = {
  tabs: MediaTab[]
  defaultIndex?: number
  onChange?: (index: number) => void
}

const ProductMediaTabs: React.FC<ProductMediaTabsProps> = ({tabs, defaultIndex = 0, onChange}) => {
  const [active, setActive] = useState<number>(defaultIndex)

  const handleClick = (index: number) => {
    setActive(index)
    onChange?.(index)
  }

  return (
    <div className="mt-4">
      <div role="tablist" aria-label="Product media tabs" className="flex items-end gap-6">
        {tabs.map((t, i) => {
          const isActive = i === active
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t.key}`}
              onClick={() => handleClick(i)}
              className={`inline-flex flex-col items-center gap-1 pb-2 focus:outline-none ${isActive ? 'text-amber-500' : 'text-gray-600'}`}
            >
              <div className="flex items-center gap-2">
                {t.icon && <span className="text-lg">{t.icon}</span>}
                <span className="text-[12px] leading-none">{t.label}</span>
                {typeof t.count === 'number' && (
                  <span className="ml-1 text-[11px] text-gray-400">{t.count}</span>
                )}
              </div>
              <span
                className={`block h-0.5 w-6 mt-1 ${isActive ? 'bg-amber-500' : 'bg-transparent'}`}
                aria-hidden
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductMediaTabs
