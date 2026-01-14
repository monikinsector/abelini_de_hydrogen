import { useState } from 'react';
interface Props {
    title: string,
    description: string,
    length?: number
};

const Hero = ({ title, description, length }: Props) => {
    const [dContent, setDContent] = useState(length ? description.slice(0, length) : description)
    const [readMore, setReadMore] = useState(false);
    return (
        <div className='py-4'>
            <h1 className='text-[1.25rem] text-[#111111] text-center tracking-[1px]'>{title}</h1>
            <p className='px-3 text-[14px] spacing-[24px] tracking-[1px] font-thin max-w-3xl mx-auto text-center mt-3'>{dContent}
                {length ?
                    <button className='cursor-pointer tracking-[1px] font-medium pl-1' onClick={() => {
                        setReadMore(!readMore);
                        if (readMore) {
                            setDContent(description.slice(0, length));
                        } else {
                            setDContent(description)
                        }
                    }}>
                        {readMore ? "Read Less" : "Read More"} &gt;&gt;
                    </button> : ""
                }
            </p>
        </div>
    );
};

export default Hero;
