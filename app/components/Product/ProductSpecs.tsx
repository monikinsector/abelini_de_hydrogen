import React from 'react'

export type Spec = { 
  key: string
  label: string
  value: React.ReactNode
  showInfoIcon?: boolean
  onInfoClick?: () => void
}

export type ProductSpecsProps = {
  specs: Spec[]
  leftColWidth?: string // Tailwind width class e.g. 'w-36'
  heading: string
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({specs, leftColWidth = 'w-36', heading}) => {
  if (!specs || specs.length === 0) return null

  const handleInfoClick = (spec: Spec) => {
    if (spec.onInfoClick) {
      spec.onInfoClick()
    } else {
      // Default handler - can be used for modal in the future
      // TODO: Implement modal logic here
      console.log('Info icon clicked for:', spec.key)
    }
  }

  return (
    <div>
      <p className='text-[#BF8F5F] capitalize text-[14px] my-2'>{heading}</p>
      <div>
        <table className="w-full table-auto">
          <tbody>
            {specs.map((s) => (
              <tr key={s.key} className='text-[#212529] align-top text-left py-2'>
                <th className={`text-[14px] text-[#111111] pr-0  text-left font-bold`}>{s.label}:</th>
                <td className='font-normal pl-0 text-[14px] '>
                  <span className="inline-flex items-center gap-1">
                    {s.value}
                    {s.showInfoIcon && (
                      <button
                        onClick={() => handleInfoClick(s)}
                        className="inline-flex items-center cursor-pointer hover:text-black ml-1 text-[#878787] leading-4 text-[12px]"
                        aria-label="More information"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 20 20"
                          className="iconify"
                          data-icon="entypo:info-with-circle"
                          data-inline="false"
                          style={{transform: 'rotate(360deg)'}}
                        >
                          <path
                            fill="currentColor"
                            d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601c0-5.302-4.299-9.6-9.6-9.6m.896 3.466c.936 0 1.211.543 1.211 1.164c0 .775-.62 1.492-1.679 1.492c-.886 0-1.308-.445-1.282-1.182c0-.621.519-1.474 1.75-1.474M8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678c-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061c.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756c.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094"
                          ></path>
                        </svg>
                      </button>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductSpecs
