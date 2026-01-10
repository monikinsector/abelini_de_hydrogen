import { useState } from 'react';
import { TabOptions } from './TabOptions';
import RangeSlider from '../Common/RangeSlider';
import InfoText from '../Common/InfoText';

export const CustomizationPanel: React.FC<{
  initialTab?: 'custom' | 'specific';
}> = ({ initialTab = 'custom' }) => {
  const [tab, setTab] = useState<'custom' | 'specific'>(initialTab);
  // --- TabOptions component -------------------------------------------------------

  return (
    <div className="mt-4 rounded-md overflow-hidden ">
      <div className="flex">
        <button
          onClick={() => setTab('custom')}
          className={`flex-1 py-1.5 px-3 cursor-pointer rounded-tl-[14px] ${tab === 'custom' ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]' : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'}`}
        >
          Diamond Customisation
        </button>
        <button
          onClick={() => setTab('specific')}
          className={`flex-1 py-3 cursor-pointer ${tab === 'specific' ? 'bg-[#ef90001a] border-b-4 border-b-[#ef9000]' : 'bg-[#f4f4f4] border-b-2 border-b-[#cfcfcf]'}`}
        >
          Choose Specific Diamond
        </button>
      </div>

      <div className="p-4 bg-[#f4f4f4] flex flex-col gap-8 rounded-b-xl">
        {/* Stone type (replaced with TabOptions) */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Stone Type</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <TabOptions
            className="mt-3"
            columns={4}
            options={[
              {
                id: 'lab',
                label: 'Lab Grown Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'natural',
                label: 'Natural Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'moissanite',
                label: 'Moissanite',
                icon: '/assets/images/icons/di.svg',
              },
              {
                id: 'black',
                label: 'Black Diamond',
                icon: '/assets/images/icons/di.svg',
              },
              { id: 'ruby', label: 'Ruby', icon: '/assets/images/icons/di.svg' },
              {
                id: 'emerald',
                label: 'Emerald',
                icon: '/assets/images/icons/di.svg',
              },
            ]}
            initialSelected={0}
          />
        </div>

        {/* Shape */}
        <div className="">
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Shape</span>
            </div>
          </div>
          <TabOptions
            className="mt-3"
            columns={5}
            options={[
              {
                id: 'round',
                label: 'Round',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'princess',
                label: 'Princess',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'emerald',
                label: 'Emerald',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'asscher',
                label: 'Asscher',
                icon: '/assets/images/icons/rnd.svg',
              },
              { id: 'oval', label: 'Oval', icon: '/assets/images/icons/rnd.svg' },
              { id: 'pear', label: 'Pear', icon: '/assets/images/icons/rnd.svg' },
              {
                id: 'heart',
                label: 'Heart',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'marquise',
                label: 'Marquise',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'cushion',
                label: 'Cushion',
                icon: '/assets/images/icons/rnd.svg',
              },
              {
                id: 'radiant',
                label: 'Radiant',
                icon: '/assets/images/icons/rnd.svg',
              },
            ]}
            initialSelected={0}
          />
        </div>

        {/* Carat slider (visual) */}
        <div className="">
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Carat</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <RangeSlider />
        </div>

        {/* Clarity / Colour / Cut etc. (use TabOptions) */}
        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Clarity</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[
              { id: 'if', label: 'IF' },
              { id: 'vvs1', label: 'VVS1' },
              { id: 'vvs2', label: 'VVS2' },
              { id: 'vs1', label: 'VS1' },
              { id: 'vs2', label: 'VS2' },
              { id: 'si1', label: 'SI1' },
              { id: 'si2', label: 'SI2' },
              { id: 'i1', label: 'I1' },
            ]}
            initialSelected={1}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Colour</span>
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[
              { id: 'D', label: 'D' },
              { id: 'E', label: 'E' },
              { id: 'F', label: 'F' },
              { id: 'G', label: 'G' },
              { id: 'H', label: 'H' },
              { id: 'I', label: 'I' },
            ]}
            initialSelected={3}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Cut</span>
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[
              { id: 'excellent', label: 'Excellent' },
              { id: 'verygood', label: 'Very Good' },
              { id: 'good', label: 'Good' },
            ]}
            initialSelected={2}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Certificate</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[{ id: 'abelini', label: 'ABELINI' }]}
            initialSelected={0}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Engraving</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[{ id: 'addengraving', label: 'Add Engraving' }]}
            initialSelected={0}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-4 flex gap-2 items-center">
              <span>Certificate</span>
              <InfoText text="How to Choose?" href="/ring-size-guide" />
            </div>
          </div>
          <TabOptions
            className="mt-2"
            labelClassName="text-sm!"
            options={[{ id: 'abelini', label: 'ABELINI' }]}
            initialSelected={0}
          />
        </div>



      </div>
    </div>
  );
};
