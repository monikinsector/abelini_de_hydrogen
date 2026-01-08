function SaleBar() {
  return (
    <div className="sticky top-0 z-99 w-full bg-[#E07A5F]">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-8 items-center justify-center tracking-wide gap-3 text-[12px] text-white">
          <span className="whitespace-nowrap">
            Up To 20% Off Sale Ends In
          </span>

          <span className="h-4 w-px bg-white/70" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap text-[12px] font-bold">00D</span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />
            <span className="whitespace-nowrap text-[12px] font-bold">08H</span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />
            <span className="whitespace-nowrap text-[12px] font-bold">37M</span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />
            <span className="whitespace-nowrap text-[12px] font-bold">25S</span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleBar;

