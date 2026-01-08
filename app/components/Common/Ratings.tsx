import React from 'react'

export type RatingsProps = {
  value: number
  max?: number
  size?: number
  color?: string
  emptyColor?: string
  className?: string
  text?: React.ReactNode
}

const STAR_PATH =
  'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'

const Star: React.FC<{
  size: number
  fillPercent: number // 0..100
  color: string
  emptyColor: string
  id: string
}> = ({size, fillPercent, color, emptyColor, id}) => {
  const gradId = `g-${id}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable={false}
      className="inline-block"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" x2="100%">
          <stop offset={`${fillPercent}%`} stopColor={color} />
          <stop offset={`${fillPercent}%`} stopColor={emptyColor} />
        </linearGradient>
      </defs>

      <path d={STAR_PATH} fill={emptyColor} />

      <path d={STAR_PATH} fill={`url(#${gradId})`} />
    </svg>
  )
}

const Ratings: React.FC<RatingsProps> = ({
  value,
  max = 5,
  size = 20,
  color = '#F6C451',
  emptyColor = '#E5E7EB',
  className = '',
  text,
}) => {
  const normalized = Math.max(0, Math.min(value, max))
  const uid = Math.random().toString(36).slice(2, 9)

  const stars = [] as React.ReactNode[]
  for (let i = 0; i < max; i++) {
    const starIndex = i + 1
    let fill = 0
    if (normalized >= starIndex) fill = 100
    else if (normalized + 1 > starIndex) {
      fill = Math.round((normalized - i) * 100)
      fill = Math.max(0, Math.min(100, fill))
    }

    stars.push(
      <span key={i} className="inline-flex items-center">
        <Star size={size} fillPercent={fill} color={color} emptyColor={emptyColor} id={`${uid}-${i}`} />
      </span>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label={`Rating: ${value} out of ${max}`}>
      <div className="flex items-center gap-1">{stars}</div>
      {text && <div className="text-sm text-gray-600">{text}</div>}
    </div>
  )
}

export default Ratings
