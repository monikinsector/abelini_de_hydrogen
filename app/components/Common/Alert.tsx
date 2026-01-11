import {Image} from '@shopify/hydrogen';
import React from 'react';

type Props = {};

const Alert = (props: Props) => {
  return (
    <div className="flex justify-start md:justify-center items-center bg-[#e4644533] rounded-[14px] p-3.5">
      <div className="flex justify-between md:justify-center gap-2 items-center">
        <div className='flex md:justify-between justify-center items-center'>
          <Image
            src="/assets/images/icons/clock-light.svg"
            alt="clock-icon"
            height={23}
            width={23}
          />
          <span className="ml-2 text-[22px] text-[#E46445] md:text-[18px] leading-1.5">
            10<span className='text-[18px]'>d</span>:
            16<span className='text-[18px]'>h</span>:
            20<span className='text-[18px]'>m</span>:
            10<span className='text-[18px]'>s</span>
          </span>
        </div>
        <span className="ml-2 text-[#E46445] text-[22px] uppercase md:text-[10px] font-bold! md:font-normal leading-1.5">Sale</span>
      </div>
    </div>
  );
};

export default Alert;
