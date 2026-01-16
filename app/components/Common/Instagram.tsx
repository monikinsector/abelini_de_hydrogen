import React, { useState, useEffect } from 'react';
import {Image} from '@shopify/hydrogen';

const INSTAGRAM_DOMAIN = 'abelini-australia';

const Instagram: React.FC = ()  => {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagram() {
      const url = `https://instafeed.nfcube.com/feed/v6?limit=8&account=${INSTAGRAM_DOMAIN}.myshopify.com&fu=0&fid=0&hash=b235df62bfcaa704aee14a1f3712c19d`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        const data = result?.data || [];
        
        const excludedIds = ["18166609282334512"];
        const filtered = data
          .filter((item: any) => !excludedIds.includes(item.id))
          .map((item: any) => {
            const rawUrl = item.images?.standard_resolution?.url || item.media_url || item.thumbnail_url;
            const proxiedUrl = rawUrl 
              ? `https://images.weserv.nl/?url=${encodeURIComponent(rawUrl)}&w=500&h=500&fit=cover` 
              : null;
            return { ...item, display_url: proxiedUrl };
          })
          .slice(0, 6);

        setFeed(filtered);
      } catch (err) {
        console.error("Instagram load error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInstagram();
  }, []);

  if (!loading && feed.length === 0) return null;

  return (
   <section className="overflow-x-hidden flex flex-col">
      <div className="flex flex-col container-fluid lg:px-10 px-4 my-6">
        <h2 className="text-h3 font-bold text-primary my-6 tracking-wider text-center flex items-center justify-center gap-3">
          <Image
            src="/assets/images/icons/instagram.svg"
            alt="Instagram"
            width={30}
          />
          @abelinijewellery
        </h2>

          {loading ? (
            <div className="flex h-64 items-center justify-center text-gray-400">Loading Feed...</div>
          ) : (
            <div className="flex gap-2 lg:gap-1 items-center overflow-x-auto md:overflow-x-visible px-2 md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"  >
                  {feed.map((item, index) => (
                    <a href={item.link || item.permalink} target='_blank' className="flex-none basis-1/2 md:basis-1/6">
                       <Image
                        src={item.display_url}
                        alt={item.alt}
                        width={250}
                        className="w-full rounded-lg object-cover"
                      />
                    </a>
                  ))}
                </div>
          )}
      </div>
    </section>
  );
};


export default Instagram;