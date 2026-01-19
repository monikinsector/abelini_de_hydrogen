import { useState } from "react";
 
const images = ['/assets/images/ring.webp', '/assets/images/bracelet.avif']; 
 
export default function ProductImagesMobile() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
 
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
 
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
 
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStart(null);
  };
 
  return (
    <div className="lg:hidden w-full">
      <div
        className="relative w-full aspect-square bg-[#fcfbf9] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image */}
        <img
          src={images[index]}
          alt="Product"
          className="absolute inset-0 m-auto max-w-full max-h-full mix-blend-multiply"
        />
 
        {/* ◀ Left Chevron */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6 text-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.891 17.418a.697.697 0 0 1 0 .979.68.68 0 0 1-.969 0l-7.83-7.908a.697.697 0 0 1 0-.979l7.83-7.908a.68.68 0 0 1 .969 0 .697.697 0 0 1 0 .979L6.75 10z" />
          </svg>
        </button>
 
        {/* ▶ Right Chevron */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6 text-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6.109 17.418a.697.697 0 0 1 0 .979.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L12.25 10 5.141 2.582a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979z" />
          </svg>
        </button>
 
        {/* ● Indicators */}
        <ol className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90%] overflow-x-auto no-scrollbar px-2">
          {images.map((_, i) => (
            <li key={`${_}`} className="list-none">
              <button
                onClick={() => setIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIndex(i);
                  }
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`
                  h-1.5 rounded-full cursor-pointer shrink-0 transition-all border-0 p-0 bg-transparent
                  ${i === index ? "bg-[#111] w-3" : "bg-[#111]/40 w-1.5"}
                `}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
 