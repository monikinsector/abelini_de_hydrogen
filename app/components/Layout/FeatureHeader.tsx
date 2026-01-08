import { Image } from "@shopify/hydrogen";

function FeatureHeader() {
    return (
      <div className="w-full bg-[#F3E7D7]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="w-full flex justify-between py-3">
            <p className="text-[#343a40] text-[14px] md:block hidden">100% money back guarantee</p>
            <Image src="/assets/images/icons/phone.svg" alt="Phone" width={18} className="block md:hidden"/>
            <p className="text-[#343a40] text-[14px] flex items-center gap-2">Excellent 4.9 out of 5 <Image src="/assets/images/icons/trustpilot.svg" alt="Trustpilot" className="!w-4"/> Trustpilot</p>
            <Image src="/assets/images/icons/location.svg" alt="Location" width={18} className="block md:hidden"/>
            <p className="text-[#343a40] text-[14px] md:block hidden">Fairly Priced Diamonds</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeatureHeader;
  
  