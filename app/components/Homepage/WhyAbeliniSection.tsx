import { Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { supportIcons } from './Data/homepage.data';


const SupportIcons = () => {

  return (
    <div className="my-6 w-full flex justify-center">
      <div className="w-full grid px-6 gap-x-6 gap-y-8 grid-cols-6 lg:grid-cols-5 justify-items-center items-center">

        {supportIcons.map((icon, index) => (
          <div
            key={icon.id}
            className={`flex justify-center items-center col-span-2 
              ${index === 3 ? 'col-start-2' : ''} 
              lg:col-span-1 lg:col-start-auto
            `}
          >
            <Image
              src={icon.image}
              alt={icon.name}
              width={230}
              height={90}
              className="object-contain"
              loading="lazy"
            />
          </div>
        ))}

      </div>
    </div>



  );
};



export default function RichText() {
    return (
          <section className="flex flex-col">
            <div className="flex flex-col container-fluid px-4 my-6">
              <div className="text-center flex flex-col items-center">
                  <h2 className="flex capitalize lg:text-h2 text-h2-m lg:leading-h2 leading-h2-m font-bold text-primary my-4 tracking-wider flex justify-center lg:w-[50%] w-full">Why Abelini</h2>
                  <p className="mb-4 text-p-14 font-light text-primary tracking-wider lg:w-[50%] w-full">It's easy to lose sight of what value really means. If your opinion of value is like ours and is about getting more and paying less, then you're in the right place. By buying directly from manufacturers online, it can save up to 70% compare to high street jewellers. We pride ourselves on offering enduring quality at fair prices; shopping is just better that way, isn't it?
                  </p>
                  <Link to="/about-us" className="flex items-center">
                      <p className="text-p-14 font-light text-primary tracking-wider mb-4">Learn more</p>
                      <Image src="/assets/images/icons/arrow-right.svg" alt="Arrow Right" width={22} height={22} className="ml-2" />
                  </Link>
              </div>
              <SupportIcons />
            </div>
        </section>
    )
}