import { Image } from "@shopify/hydrogen";
import { useState } from "react";

const ImageTabs = () => {
  const [activeTab, setActiveTab] = useState("images");

  const tabs = [
    {
      id: "images",
      label: "Images",
      icon: "/assets/images/icons/image.svg",
    },
    {
      id: "videos",
      label: "Videos",
      icon: "/assets/images/icons/video.svg",
    },
    {
      id: "360",
      label: "360",
      icon: "/assets/images/icons/360.svg",
    },
  ];

  return (
    <div className="w-full p-0 block md:hidden">
      <ul className="flex my-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex w-full items-center justify-center py-2 text-[12.8px] leading-1.5 text-center
                  text-[#111111] border-b transition-colors duration-200
                  ${isActive ? "border-[#ef9000]" : "border-[#d9d9d9]"}
                `}
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  loading="lazy"
                  width={20}
                  height={20}
                />
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageTabs;
