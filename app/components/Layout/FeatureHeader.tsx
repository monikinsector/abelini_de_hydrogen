import { Image } from "@shopify/hydrogen";

function FeatureHeader() {
    return (
      <div className="w-full bg-[#F3E7D7]">
        <div className="mx-auto max-w-5xl">
          <div className="w-full flex justify-between py-3">
            <p className="text-[#343a40] text-[14px]">100% money back guarantee</p>
            <p className="text-[#343a40] text-[14px] flex items-center gap-2">Excellent 4.9 out of 5 <Image src="/assets/images/icons/trustpilot.svg" alt="Trustpilot" className="!w-4"/> Trustpilot</p>
            <p className="text-[#343a40] text-[14px]">Fairly Priced Diamonds</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeatureHeader;
  
  