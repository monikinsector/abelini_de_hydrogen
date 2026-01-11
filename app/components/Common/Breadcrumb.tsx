import React from 'react'

export type BreadcrumbItem = {
  label: string
  href?: string
  className?: string
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  /** Separator node between items (default: `/`) */
  separator?: React.ReactNode
  className?: string
  containerClassName?: string
  listClassName?: string
  forcePlainLast?: boolean
  renderItem?: (item: BreadcrumbItem, isLast: boolean, index: number) => React.ReactNode
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = 'py-2 breadcrumb-bar px-[15px] font-medium',
  containerClassName = 'container mx-auto',
  listClassName = 'breadcrumb',
  forcePlainLast = true,
  renderItem,
}) => {
  if (!items || items.length === 0) return null

  const lastIndex = items.length - 1

  return (
    <section className={className}>
      <div className={containerClassName}>
        <nav aria-label="Breadcrumb">
          <ol className={listClassName}>
            {items.map((item, idx) => {
              const isLast = idx === lastIndex

              if (renderItem) {
                return (
                  <li key={idx} className={`${item.className ?? ''} inline-flex items-center`}>
                    {renderItem(item, isLast, idx)}
                    {!isLast && (
                      <span className="mx-2 text-[11.2px] text-[#6c757d]! leading-1.5" aria-hidden>
                        {separator}
                      </span>
                    )}
                  </li>
                )
              }

              const shouldRenderLink = !!item.href && (!isLast || !forcePlainLast)

              return (
                <li key={idx} className={`${item.className ?? ''} inline-flex items-center`}>
                  {shouldRenderLink ? (
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      onClick={item.onClick}
                      className="text-[11.2px]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span aria-current={isLast ? 'page' : undefined} className="text-[11.2px] font-medium ">
                      {item.label}
                    </span>
                  )}
                  {!isLast && (
                    <span className="mx-2 text-[11.2px] text-[#6c757d]! leading-1.5]" aria-hidden>
                      {separator}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </section>
  )
}

export default Breadcrumb