import React, { useState, useEffect } from 'react';
import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';

const SHOP_DOMAIN = 'abelini-australia';

const Instagram: React.FC = ()  => {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagram() {
      const url = `https://instafeed.nfcube.com/feed/v6?limit=8&account=${SHOP_DOMAIN}.myshopify.com&fu=0&fid=0&hash=b235df62bfcaa704aee14a1f3712c19d`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        const data = result?.data || result?.previous_response?.data || [];
        
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
              <div className="flex flex-nowrap lg:gap-1 gap-2 items-center justify-around overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                  {feed.map((item, index) => (
                    <Link key={index} to={item.link || item.permalink} target='_blank' className='flex lg:w-[250px] w-[200px] flex-shrink-0'>

                      <Image  
                      src={item.display_url} 
                      alt={item.alt} 
                      width={250}
                      className="rounded-lg object-cover lg:h-[250px] lg:w-[250px] h-[255px] w-[198px]"
                      />
                      </Link>
                  ))}
             </div>
          )}
      </div>
    </section>
  );
};


export default Instagram;