import { useState } from "react";

interface Option {
  title: string;
  icon: string;
  code: string;
}

interface AccordionCardProps {
  title: string;
  icon: string;
  options: Option[];
  activeCode?: string;
  onSelect?: (code: string) => void;
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  title,
  icon,
  options,
  activeCode,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border-b">
      {/* Header */}
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2 w-full p-2 focus:outline-none"
      >
        <img
          src={icon}
          alt={title}
          className="w-7 h-7 object-contain"
          loading="lazy"
        />
        <small className="font-normal text-gray-900">{title}</small>
        <span className="ml-auto">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Collapsible body */}
      {isOpen && (
        <div className="p-2">
          <ul className="flex gap-2 overflow-x-auto py-2">
            {options.map((option) => (
              <li key={option.code} className="flex-shrink-0 text-center">
                <button
                  onClick={() => onSelect?.(option.code)}
                  title={option.title}
                  className={`flex flex-col items-center rounded-full p-1 ${
                    activeCode === option.code
                      ? "border-2 border-orange-500"
                      : "border border-gray-300"
                  }`}
                >
                  <img
                    src={option.icon}
                    alt={option.title}
                    className="w-7 h-7 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs mt-1">{option.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Example usage
const ProductOptionsAccordion = () => {
  const [selectedMetal, setSelectedMetal] = useState("GL_9K_W");
  const [selectedStoneType, setSelectedStoneType] = useState("LBG");
  const [selectedShape, setSelectedShape] = useState("RND");

  const metals: Option[] = [
    { title: "White Gold", icon: "/img/vector_icon/metal/white-gold.svg", code: "GL_9K_W" },
    { title: "Yellow Gold", icon: "/img/vector_icon/metal/yellow-gold.svg", code: "GL_9K_Y" },
    { title: "Rose Gold", icon: "/img/vector_icon/metal/rose-gold.svg", code: "GL_9K_R" },
  ];

  const stoneTypes: Option[] = [
    { title: "Lab Grown Diamond", icon: "/img/vector_icon/stonetype/di.svg", code: "LBG" },
    { title: "Naturally Mined", icon: "/img/vector_icon/stonetype/di.svg", code: "DI" },
    { title: "Moissanite", icon: "/img/vector_icon/stonetype/di.svg", code: "MSNT" },
    { title: "Black Diamond", icon: "/img/vector_icon/stonetype/bd.svg", code: "BD" },
    { title: "Amethyst", icon: "/img/vector_icon/stonetype/am.svg", code: "AM" },
    // add other stone types...
  ];

  const shapes: Option[] = [
    { title: "Round", icon: "/img/vector_icon/shapes-svg/rnd.svg", code: "RND" },
    { title: "Princess", icon: "/img/vector_icon/shapes-svg/pri.svg", code: "PRN" },
    { title: "Emerald", icon: "/img/vector_icon/shapes-svg/emr.svg", code: "EMR" },
    // add other shapes...
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <AccordionCard
        title="Metal"
        icon="/img/vector_icon/metal/white-gold.svg"
        options={metals}
        activeCode={selectedMetal}
        onSelect={setSelectedMetal}
      />
      <AccordionCard
        title="Stone Type"
        icon="/img/vector_icon/stonetype/di.svg"
        options={stoneTypes}
        activeCode={selectedStoneType}
        onSelect={setSelectedStoneType}
      />
      <AccordionCard
        title="Shape"
        icon="/img/vector_icon/shapes-svg/rnd.svg"
        options={shapes}
        activeCode={selectedShape}
        onSelect={setSelectedShape}
      />
      {/* Carat slider can be added as a separate component below */}
    </div>
  );
};

export default ProductOptionsAccordion;
