import {Image} from '@shopify/hydrogen';
import React from 'react';

type Props = {};

const Alert = (props: Props) => {
  return (
    <div className="flex justify-center items-center bg-[#e4644533] rounded-[14px] p-3.5">
      <div className="flex justify-center gap-2 items-center">
        <div className='flex justify-center items-center'>
          <Image
            src="/assets/images/icons/clock-light.svg"
            alt="clock-icon"
            height={23}
            width={23}
          />
          <span className="ml-2 text-sm text-[#E46445] text-[18px]">
            0-1d : 0-4h : 0-57m : 0-44s
          </span>
        </div>
        <span className="ml-2 text-sm text-[#E46445] text-[10px] bold">Sale</span>
      </div>
    </div>
  );
};

export default Alert;
