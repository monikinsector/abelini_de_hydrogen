import { useMemo, useState, memo } from 'react';
interface Props {
    title: string,
    description: string,
    length?: number
};

const Hero = ({ title, description, length }: Props) => {
    const [readMore, setReadMore] = useState(false);

    const content = useMemo(() => {
        if (!length) return description;
        return readMore ? description : description.slice(0, length);
      }, [description, length, readMore]);
    

    return (
        <div className='py-4'>
            <h1 className='text-[1.25rem] text-[#111111] text-center tracking-[1px]'>{title}</h1>
            <p className='px-3 text-[14px] spacing-[24px] tracking-[1px] font-thin max-w-3xl mx-auto text-center mt-3'>{content}
            {length && (
                <button
                    className="cursor-pointer tracking-[1px] font-medium pl-1"
                    onClick={() => setReadMore(prev => !prev)}
                >
                    {readMore ? 'Read Less' : 'Read More'} &gt;&gt;
                </button>
            )}
            </p>
        </div>
    );
};

export default memo(Hero);
