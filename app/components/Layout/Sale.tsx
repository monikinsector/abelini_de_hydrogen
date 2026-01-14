import {Link} from "react-router";
import {memo, useEffect, useMemo, useState} from "react";

type SaleBarProps = {
  text: string;
  saleEndTime: string;
  link: string;
};

const ONE_SECOND = 1000;

function SaleBar({text, saleEndTime, link}: SaleBarProps) {
  const endTimestamp = useMemo(
    () => new Date(saleEndTime).getTime(),
    [saleEndTime]
  );

  const [remainingMs, setRemainingMs] = useState(() =>
    Math.max(endTimestamp - Date.now(), 0)
  );

  useEffect(() => {
    if (remainingMs <= 0) return;

    const interval = setInterval(() => {
      setRemainingMs(() => {
        const diff = endTimestamp - Date.now();
        return diff > 0 ? diff : 0;
      });
    }, ONE_SECOND);

    return () => clearInterval(interval);
  }, [endTimestamp, remainingMs]);

  const {days, hours, minutes, seconds} = useMemo(() => {
    const totalSeconds = Math.floor(remainingMs / 1000);

    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }, [remainingMs]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <Link to={link} className="sticky top-0 z-99 w-full !bg-[#E07A5F] inline-block">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-8 items-center justify-center tracking-wide gap-3 text-[12px] text-white">
          <span className="whitespace-nowrap">
            {text}
          </span>

          <span className="h-4 w-px bg-white/70" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap text-[12px] font-bold">
              {pad(days)}D
            </span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />

            <span className="whitespace-nowrap text-[12px] font-bold">
              {pad(hours)}H
            </span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />

            <span className="whitespace-nowrap text-[12px] font-bold">
              {pad(minutes)}M
            </span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />

            <span className="whitespace-nowrap text-[12px] font-bold">
              {pad(seconds)}S
            </span>
            <span className="h-4 w-px bg-white/70" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(SaleBar);
