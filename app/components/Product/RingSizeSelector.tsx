import React from 'react';

export type RingSizeOption = {
  value: string;
  name: string;
  code: string;
};

const RING_SIZE_OPTIONS: RingSizeOption[] = [
//   { value: '418793', name: "I dont know", code: 'RING-IDK' },
  { value: '73261', name: 'H', code: 'RING-H' },
  { value: '75916', name: 'H 1/2', code: 'RING-H-5' },
  { value: '73262', name: 'I', code: 'RING-I' },
  { value: '75917', name: 'I 1/2', code: 'RING-I-5' },
  { value: '73263', name: 'J', code: 'RING-J' },
  { value: '75918', name: 'J 1/2', code: 'RING-J-5' },
  { value: '73264', name: 'K', code: 'RING-K' },
  { value: '75919', name: 'K 1/2', code: 'RING-K-5' },
  { value: '73265', name: 'L', code: 'RING-L' },
  { value: '75920', name: 'L 1/2', code: 'RING-L-5' },
  { value: '73266', name: 'M', code: 'RING-M' },
  { value: '75921', name: 'M 1/2', code: 'RING-M-5' },
  { value: '73267', name: 'N', code: 'RING-N' },
  { value: '75922', name: 'N 1/2', code: 'RING-N-5' },
  { value: '73268', name: 'O', code: 'RING-O' },
  { value: '75923', name: 'O 1/2', code: 'RING-O-5' },
  { value: '73269', name: 'P', code: 'RING-P' },
  { value: '75924', name: 'P 1/2', code: 'RING-P-5' },
  { value: '73270', name: 'Q', code: 'RING-Q' },
  { value: '75925', name: 'Q 1/2', code: 'RING-Q-5' },
  { value: '73271', name: 'R', code: 'RING-R' },
  { value: '75926', name: 'R 1/2', code: 'RING-R-5' },
  { value: '73272', name: 'S', code: 'RING-S' },
  { value: '75927', name: 'S 1/2', code: 'RING-S-5' },
  { value: '679621', name: 'T', code: 'RING-T' },
  { value: '679622', name: 'T 1/2', code: 'RING-T-5' },
  { value: '679623', name: 'U', code: 'RING-U' },
  { value: '679624', name: 'U 1/2', code: 'RING-U-5' },
  { value: '679625', name: 'V', code: 'RING-V' },
  { value: '679626', name: 'V 1/2', code: 'RING-V-5' },
  { value: '679627', name: 'W', code: 'RING-W' },
  { value: '679628', name: 'W 1/2', code: 'RING-W-5' },
  { value: '679629', name: 'X', code: 'RING-X' },
  { value: '679630', name: 'X 1/2', code: 'RING-X-5' },
  { value: '679631', name: 'Y', code: 'RING-Y' },
  { value: '679632', name: 'Y 1/2', code: 'RING-Y-5' },
  { value: '679633', name: 'Z', code: 'RING-Z' },
  { value: '679634', name: 'Z 1/2', code: 'RING-Z-5' },
];

export type RingSizeSelectorProps = {
  onChange?: (option: RingSizeOption) => void;
  defaultValue?: string;
  options?: RingSizeOption[];
};

const RingSizeSelector: React.FC<RingSizeSelectorProps> = ({
  onChange,
  defaultValue = '73266',
  options = RING_SIZE_OPTIONS,
}) => {
  return (
    <div className="w-1/2 lg:w-1/4 text-center p-0">
      <div className="mb-1 mx-1 relative">
        <select
          id="ring_size_select"
          name="option[11766]"
          defaultValue={defaultValue}
          onChange={(e) => {
            const selected = options.find((opt) => opt.value === e.target.value);
            if (selected && onChange) {
              onChange(selected);
            }
          }}
          className="text-[#495057] mt-1 pt-4.5 pr-4 pb-1.5 pl-3 h-13 rounded-[14px] w-full border border-[#ced4da] bg-white px-3 py-2 text-[15px] focus:border-gray-500 focus:outline-none focus:ring-0 ringdropdown appearance-none"
        >
          <option value="418793" data-name="I dont know" data-code="RING-IDK">
            I dont know
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              data-name={option.name}
              data-code={option.code}
            >
              {option.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="ring_size_select"
          className="absolute left-3 top-2 text-[#878787] text-[15px] pointer-events-none leading-4"
        >
          Ring size
        </label>
      </div>

      <a
        href="/ring-size-guide"
        target="_blank"
        className="inline-flex items-center justify-center gap-1 float-left text-xs text-[#878787] hover:text-black leading-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601c0-5.302-4.299-9.6-9.6-9.6m.896 3.466c.936 0 1.211.543 1.211 1.164c0 .775-.62 1.492-1.679 1.492c-.886 0-1.308-.445-1.282-1.182c0-.621.519-1.474 1.75-1.474M8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678c-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061c.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756c.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094" />
        </svg>
        <u>Ring Size Guide</u>
      </a>
    </div>
  );
};

export default RingSizeSelector;
