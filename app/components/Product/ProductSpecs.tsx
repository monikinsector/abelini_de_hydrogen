import React from 'react'

export type Spec = { key: string; label: string; value: React.ReactNode }

export type ProductSpecsProps = {
  specs: Spec[]
  leftColWidth?: string // Tailwind width class e.g. 'w-36'
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({specs, leftColWidth = 'w-36'}) => {
  if (!specs || specs.length === 0) return null

  return (
    <div>
      <p className='text-[#BF8F5F] capitalize text-[14px] my-2'>Products Information</p>
      <div>
        <table className="w-full table-auto">
          <tbody>
            {specs.map((s) => (
              <tr key={s.key} className='text-[#212529] align-top text-left py-2'>
                <th className={`text-[14px] text-[#111111] pr-6 ${leftColWidth} text-left`}><strong>{s.label}</strong>:</th>
                <td className='font-normal pl-4'>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductSpecs
