import { Image } from '@shopify/hydrogen';
import React, { useState } from 'react';
import InfoText from '../Common/InfoText';

type Props = {
  onChange?: (selection: {
    settingStyle: string;
    bandStyle: string;
    shankWidth: string;
  }) => void;
};

const ProductOptions = ({ onChange }: Props) => {
  const groups = [
    {
      key: 'setting',
      label: 'Setting Style',
      name: 'option[119219]',
      options: [
        {
          id: 'optval_526',
          title: 'Plain',
          img: '/assets/images/icons/setpln_ww.svg',
          inputValue: '826942',
        },
        {
          id: 'optval_527',
          title: 'Hidden Halo',
          img: '/assets/images/icons/setpln_ww.svg',
          inputValue: '826944',
        },
      ],
    },
    {
      key: 'band',
      label: 'Band Style',
      name: 'option[119220]',
      options: [
        {
          id: 'optval_528',
          title: 'Plain',
          img: '/assets/images/icons/bandpln_ww.svg',
          inputValue: '826794',
        },
        {
          id: 'optval_529',
          title: 'Pave',
          img: '/assets/images/icons/bandpln_ww.svg',
          inputValue: '826948',
        },
      ],
    },
    {
      key: 'shank',
      label: 'Shank Width',
      name: 'option[119221]',
      info: {
        href: 'https://www.abelini.com/index.php?route=information/information|popUp&name=shank_width_popup',
        text: 'How to Choose?',
      },
      options: [
        {
          id: 'optval_530',
          title: 'Standard',
          img: '/assets/images/icons/shnkstd_ww.svg',
          inputValue: '826796',
        },
        {
          id: 'optval_531',
          title: 'Large',
          img: '/assets/images/icons/shnkstd_ww.svg',
          inputValue: '826797',
        },
      ],
    },
  ];

  const initialSelected: Record<string, string> = {};
  groups.forEach((g) => {
    initialSelected[g.key] = g.options[0].id;
  });

  const [selected, setSelected] =
    useState<Record<string, string>>(initialSelected);

  const emitChange = () => {
    onChange?.({
      settingStyle: selected.setting,
      bandStyle: selected.band,
      shankWidth: selected.shank,
    });
  };

  const select = (groupKey: string, id: string) => {
    setSelected((prev) => {
      const next = { ...prev, [groupKey]: id };
      setTimeout(emitChange, 0);
      return next;
    });
  };

  return (
    <div className="flex flex-nowrap m-0 vertical-scroll-mobile my-4">
      {/* <!-- Setting Style --> */}
      <div
        id="div_setting_style"
        className="pr-2 lg:pr-3 customize-detail-block product-option-block flex "
      >
        {groups.map((group) => {
          let spacingClass = 'pl-2 lg:pl-3';

          if (group.key === 'setting') {
            spacingClass = 'pr-2 lg:pr-3';
          } else if (group.key === 'band') {
            spacingClass = 'px-2 lg:px-3 border-l border-r border-[#d3d2d2]';
          }

          return (
            <div
              key={group.key}
              id={`div_${group.key}`}
              className={`${spacingClass} customize-detail-block product-option-block flex-1`}
            >
              <span className="text-black option_text text-sm leading-4">
                <span>{group.label}</span>
                {group.info && (
                  <InfoText text="How to Choose?" href="/ring-size-guide" />
                )}
              </span>

              <ul className="flex m-0 mt-2">
                {group.options.map((opt) => (
                  <li
                    key={opt.id}
                    className="w-auto px-1 md:inline-block customizeoption-label optvaluer"
                    id={opt.id}
                  >
                    <button
                      type="button"
                      title={opt.title}
                      onClick={() => select(group.key, opt.id)}
                      className={`rounded-full option_square text-center flex items-center justify-center transition-transform duration-150 focus:outline-none ${selected[group.key] === opt.id
                          ? 'ring-1 ring-[#ef9000] bg-[#f8f4ef] cursor-pointer scale-105'
                          : ''
                        }`}
                    >
                      <Image
                        src={opt.img}
                        alt={opt.title}
                        className="max-w-full h-auto m-auto option_img_45"
                        width={45}
                        height={45}
                        loading="lazy"
                      />
                    </button>
                    <span className="block text-center option_name text-xs leading-4">
                      {opt.title}
                    </span>
                  </li>
                ))}
              </ul>

              <input
                type="hidden"
                name={group.name}
                value={
                  group.options.find((s) => s.id === selected[group.key])
                    ?.inputValue ?? ''
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
