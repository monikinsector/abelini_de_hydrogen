import { Image } from "@shopify/hydrogen"
import "../../styles/ringcategory.css"
import Carousel from "../Common/Carousel"
import { Link } from "react-router"
import React from 'react';

function RingCategoryItem({ name, code, url, selected }: Readonly<{ name: string; code: string; url?: string; selected?: boolean }>) {
    const codeLower = code ? code.toLowerCase() : '';
    return (
        <Link to={url || '#'} className={`group${selected ? ' ring-category-selected' : ''}`}>
            <div className={`w-20 md:w-auto rounded-full md:rounded-xl overflow-hidden border-1 border-[#e3e3e3] group-hover:border-black${selected ? ' border-[#ef9000] border-2' : ''}`}>
                <Image
                    src={codeLower ? `https://cdn.shopify.com/s/files/1/0963/0410/3712/files/${codeLower}-icon.avif` : ''}
                    alt={name}
                    className="rounded-xl "
                    loading="lazy"
                    width={176}
                    height={176}
                />
            </div>
            <p className={`text-center text-[12px] color-[#111111] font-thin group-hover:font-normal${selected ? ' font-bold text-[#ef9000]' : ''}`}>{name}</p>
        </Link>
    );
}


type RingCategoryType = {
    name: string;
    [key: string]: any;
};

function RingCategory({ categories, urls, activeFilterIds }: { categories: RingCategoryType[]; urls: string[]; activeFilterIds?: string[] }) {
    // console.log(activeFilterIds);
    if (!categories || categories.length === 0) return null;
    const filtered = categories.filter(item => item.code && item.code.trim() !== '');
    if (filtered.length === 0) return null;
    // Defensive: ensure urls is an array of correct length
    const safeUrls = Array.isArray(urls) ? urls : [];
    // Get active filter keys (groupId.filterId)
    const activeKeys = Array.isArray(activeFilterIds) ? activeFilterIds.map(String) : [];
    return (
        <div className="mx-6 my-4 mb-12">
            <Carousel slidesPerView={9} slidesToScroll={4} scrollDuration={60} >
                {filtered.map((item, index) => {
                    // Mark as selected if this item's groupId.filter_id is in activeKeys
                    const groupId = '5';
                    const filterId = item.filter_id;
                    const key = `${groupId}.${filterId}`;
                    const selected = activeKeys.includes(key);
                    return (
                        <RingCategoryItem name={item.name} code={item.code} url={safeUrls[index] || '#'} selected={selected} key={`${item.name}-${index}`}/>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default RingCategory