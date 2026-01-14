import { Image } from "@shopify/hydrogen";

interface Props {
};

const AbeliniFeatures = (props: Props) => {
    const features = [
        {
            name: "Free Resizing",
            image: "resize.svg"
        },
        {
            name: "Free Delivery",
            image: "free_delivery.svg"
        },
        {
            name: "60 Days Returns",
            image: "return.svg"
        },
        {
            name: "Authenticity Certificates",
            image: "certificate.svg"
        },
        {
            name: "Beautiful Packaging",
            image: "gifts.svg"
        },
        {
            name: "Lifetime Warranty",
            image: "warranty.svg"
        },

    ]
    return (
        <div className="py-4 mb-4 w-full overflow-hidden">
            <div className="overflow-auto mx-0 md:mx-14 flex gap-3 rounded-none md:rounded-[50rem] bg-white border-1 border-[#E4E4E4]">
                {features.map((feature, index) => {
                    return (
                        <div key={feature.name} className={`min-w-[150px] flex-1 flex justify-between items-center py-3 ${index > 0 ? "border-l-1 border-l-[#E4E4E4]" : ""} px-3`}>
                            <p className="text-[13px] text-[#878787]">{feature.name}</p>
                            <Image src={`/assets/images/icons/${feature.image}`} alt={feature.name} width={20} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AbeliniFeatures;
