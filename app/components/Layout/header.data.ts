import type { HeaderData, HeaderTypes } from "./header.type";

type DataForNavigation = {
  [key: string]: HeaderData
}

const sendMainCompData = (totalCols: number, leftBorderFromIndex: number, lastColDoubleSpace: boolean) => {
  return {
    totalCols,
    leftBorderFromIndex,
    lastColDoubleSpace,
  }
}
const returnHeading = (text: string): {type: HeaderTypes, data: {text: string}} => {
  return {
    type: "heading",
    data: {
      text: text
    }
  }
}

const giveShapeDataForLinks = (shapes: string[], link: string) => {
  return shapes.map((shape) => {
    const lowercaseShape = shape.toLowerCase();
    return {
      link: `/${link}/${lowercaseShape}`,
      image: `/assets/images/header/shapes/${lowercaseShape}.svg`,
      name: shape,
    }
  })
}

const giveMetalDataForLinks = (metals: string[], link: string) => {
  return metals.map((metal) => {
    const lowercaseMetal = metal.toLowerCase().replace(" ", "-");
    // assets/images/header/metals/rose-gold.avif
    return {
      link: `/${link}/${lowercaseMetal}`,
      image: `/assets/images/header/metals/${lowercaseMetal}.avif`,
      name: metal,
    }
  })
}

const diamondTypeMap = {
  "Diamond": "di",
  "Lab Grown": "di",
  "Moissanite": "di",
  "Black Diamond": "bd",
  "Blue Sapphire": "bs",
  "Ruby": "rb",
  "Emerald": "em",
  "Tanzanite": "tz",
  "Aquamarine": "aq",
  "Amethyst": "am",
  "Garnet": "gr",
  "Citrine": "ct",
  "Peridot": "pd",
  "Topaz": "tp",
}

const giveDiamondDataForLinks = (diamonds: string[], link: string) => {
  return diamonds.map((diamond) => {
    const lowercaseDiamond = diamond.toLowerCase().replace(" ", "-");
    const image = `/assets/images/header/stoneType/${diamondTypeMap[diamond as keyof typeof diamondTypeMap]}.avif`;
    return {
      link: `/${link}/${lowercaseDiamond}`,
      image,
      name: diamond,
    }
  })
}




export const dataForNavigation: DataForNavigation = {
  "Engagement Rings": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Create your own"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Start With A Diamond", image: "/assets/images/header/diamond.avif", link: "/choose-diamond" },
            ]
          }
        },
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Classic Solitaire", image: "/assets/images/header/solitaire.avif", link: "/engagement-rings/classic-solitaire" },
              { link: "/engagement-rings/halo-rings", "image": "/assets/images/header/halo.avif", name: "Halo Rings" },
              { link: "/engagement-rings/side-stone-shoulder-set-rings", "image": "/assets/images/header/side-stone.avif", name: "Side Stone Rings" },
              { link: "/engagement-rings/trilogy-rings", "image": "/assets/images/header/three-stone.avif", name: "Trilogy Rings" },
              { link: "/engagement-rings/illusion-set-rings", "image": "/assets/images/header/oval.avif", name: "Illusion Set Rings" },
              { link: "/engagement-rings/cluster-engagement-rings", "image": "/assets/images/header/cluster.avif", name: "Cluster Rings" },
              { link: "/engagement-rings/vintage-engagement-rings", "image": "/assets/images/header/vintage-engagement-rings.avif", name: "Vintage Engagement Rings" },
            ]
          }
        },
        {
          type: "button",
          data: {
            text: "Engagement Rings Sale",
            theme: "theme_button_navbar",
            link: "/engagement-rings/sale-engangement-rings"
          }
        }

      ],
      "cb-1": [
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/start-with-setting", "image": "/assets/images/header/solitaire.avif", name: "Start With A Setting" },
            ]
          }
        }, {
          type: "break"
        }, {
          type: "links_with_image",
          data: {
            links: [
              { link: "/engagement-rings/twisted-engagement-ring", "image": "/assets/images/header/twisted-engagement-rings.avif", name: "Twisted Engagement Rings" },
              { link: "/engagement-rings/unique-engagement-rings", "image": "/assets/images/header/unique-engagement-rings.avif", name: "Unique Engagement Rings" },
              { link: "/engagement-rings/antique-engagement-rings", "image": "/assets/images/header/antique-engagement-rings.avif", name: "Antique Engagement Rings" },
              { link: "/engagement-rings/gemstone-engagement-ring", "image": "/assets/images/header/gemstone.avif", name: "Gemstone Rings" },
              { link: "/engagement-rings/couples", "image": "/assets/images/header/couples-rings.avif", name: "Couples Rings" },
              { link: "/engagement-rings/minimalist-engagement-rings", "image": "/assets/images/header/minimalist.avif", name: "Minimalist Engagement Rings" },
              { link: "/engagement-rings/aquamarine", "image": "/assets/images/header/aquamarine.avif", name: "Aquamarine Rings" },
            ]
          }
        }, {
          type: "button",
          data: {
            text: "All Engagement Rings",
            theme: "theme_button_navbar",
            link: "/engagement-rings/view-all"
          }
        }

      ],
      "cc-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Asscher", "Oval", "Pear", "Heart", "Marquise", "Cushion"], "engagement-rings")
          }
        }

      ],
      "cd-1": [
        returnHeading("Shop By Stone Type"),
        {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald", "Tanzanite", "Amethyst", "Garnet"], "engagement-rings")
          }
        }
      ],
      "ce-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum"], "engagement-rings")
          }
        }, {
          type: "break"
        },
        returnHeading("More Links"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.235", name: "QuickShip Engagement Rings" },
              { link: "/bespoke", name: "Bespoke Engagement Rings" },
              { link: "/engagement-rings/womens", name: "Women's Engagement Rings" },
              { link: "/engagement-rings/mens", name: "Men's Engagement Rings" },
              { link: "/engagement-rings/1-carat", name: "1 Carat Engagement Rings" },
              { link: "/engagement-rings/one-and-half-carat", name: "1.5 Carat Engagement Rings" },
              { link: "/engagement-rings/2-carat", name: "2 Carat Engagement Rings" },
              { link: "/engagement-rings/3-carat", name: "3 Carat Engagement Rings" },
              { link: "/engagement-rings/5-carat", name: "5 Carat Engagement Rings" },
            ]
          }
        }

      ]
    }
  },
  "Wedding & Eternity Rings": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Eternity Rings", image: "/assets/images/header/eternity-rings.avif", link: "/wedding-rings/eternity-rings" },
              { name: "Half Eternity Rings", "image": "/assets/images/header/eternity-half-rings.avif", link: "/wedding-rings/half-eternity-rings" },
              { name: "Full Eternity Rings", "image": "/assets/images/header/eternity-full-rings.avif", link: "/wedding-rings/full-eternity-rings" },
              { name: "Women's Plain", "image": "/assets/images/header/womens-plain.avif", link: "/wedding-rings/plain/womens" },
              { name: "Plain Rings", "image": "/assets/images/header/mens-plain.avif", link: "/wedding-rings/plain" }
            ]
          }
        }
      ],
      "cb-1": [
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/wedding-rings/womens-shaped-wedding-rings", "image": "/assets/images/header/womens-shaped.avif", name: "Women's Shaped" },
              { link: "/wedding-rings/womens", "image": "/assets/images/header/womens-diamond.avif", name: "Women's Diamond" },
              { link: "/wedding-rings/plain/mens", "image": "/assets/images/header/mens-plain-2.avif", name: "Men's Plain" },
              { link: "/wedding-rings/mens", "image": "/assets/images/header/mens-diamond.avif", name: "Men's Diamond" },
            ]
          }
        }
      ],
      "cc-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Oval", "Pear", "Heart", "Marquise", "Cushion"], "wedding-rings")
          }
        }

      ],
      "cd-1": [
        returnHeading("Shop By Stone Type"), {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald"], "wedding-rings")
          }
        }
      ],
      "ce-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum"], "wedding-rings")
          }
        },
        returnHeading("More Links"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.236", name: "QuickShip Wedding & Eternity Rings" },
              { link: "/bespoke", name: "Bespoke Wedding & Eternity Rings" },
              { link: "/wedding-rings/mens", name: "Men's Wedding Rings" },
            ]
          }
        },
      ]
    }
  },
  "Diamond Rings": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Five Stone", image: "/assets/images/header/five-stone-diamond.avif", link: "/diamond-rings/five-stone-rings" },
              { name: "Seven Stone", "image": "/assets/images/header/seven-stone-diamond.avif", link: "/diamond-rings/seven-stone-rings" },
              { name: "Eternity Rings", "image": "/assets/images/header/eternity-rings-diamond.avif", link: "/diamond-rings/eternity-rings" },
              { name: "Stacking Rings", "image": "/assets/images/header/stacking-rings-diamond.avif", link: "/diamond-rings/stacking-ring" },
              { name: "Cluster Rings", "image": "/assets/images/header/cluster-diamond.avif", link: "/diamond-rings/cluster-rings" },
              { name: "Men's Rings", "image": "/assets/images/header/mens-diamond-diamond.avif", link: "/diamond-rings/mens" },
              { name: "Halo Rings", "image": "/assets/images/header/halo-rings-diamond.avif", link: "/diamond-rings/halo-rings" },
            ]
          }
        },
        {
          type: "button",
          data: {
            text: "All Diamond Rings",
            theme: "theme_button_navbar",
            link: "/diamond-rings/view-all"
          }
        }
      ],
      "cb-1": [
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/diamond-rings/baguette", "image": "/assets/images/header/baguette-diamond.avif", name: "Baguette Rings" },
              { link: "/diamond-rings/gemstone-rings", "image": "/assets/images/header/gemstone-diamond.avif", name: "Gemstone Rings" },
              { link: "/diamond-rings/minimalist-diamond-rings", "image": "/assets/images/header/minimalist-diamond.avif", name: "Minimalist Rings" },
              { link: "/diamond-rings/three-stone", "image": "/assets/images/header/three-stone-diamond.avif", name: "Trilogy Rings" },
              { link: "/diamond-rings/full-eternity-rings", "image": "/assets/images/header/eternity-full-rings-diamond.avif", name: "Full Eternity Rings" },

              { link: "/diamond-rings/half-eternity-rings", "image": "/assets/images/header/eternity-half-rings-diamond.avif", name: "Half Eternity Rings" },
              { link: "/diamond-rings/promise-rings", "image": "/assets/images/header/promise-rings-diamond.avif", name: "Promise Rings" },
            ]
          }
        }
      ],
      "cc-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Asscher", "Oval", "Pear", "Heart", "Marquise", "Cushion"], "diamond-rings")
          }
        }

      ],
      "cd-1": [
        returnHeading("Shop By Stone Type"),
        {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald", "Tanzanite", "Amethyst", "Garnet", "Citrine"], "diamond-rings")
          }
        }
      ],
      "ce-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum"], "diamond-rings")
          }
        },
        returnHeading("More Links"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.237", name: "QuickShip Diamond Rings" },
              { link: "/bespoke", name: "Bespoke Diamond Rings" },
              { link: "/diamond-rings/womens", name: "Diamond Rings For Women's" },
              { link: "/diamond-rings/couples", name: "Couple Diamond Rings" },
              { link: "/diamond-rings/1-carat", name: "1 Carat Engagement Rings" },
              { link: "/diamond-rings/one-and-half-carat", name: "1.5 Carat Engagement Rings" },
              { link: "/diamond-rings/2-carat", name: "2 Carat Engagement Rings" },
              { link: "/diamond-rings/3-carat", name: "3 Carat Engagement Rings" },
              { link: "/diamond-rings/4-carat", name: "4 Carat Engagement Rings" },
            ]
          }
        }
      ]
    }
  },
  "Earrings": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Stud Earrings", "image": "/assets/images/header/stud-earrings.avif", link: "/earrings/stud-earrings" },
              { name: "Hoop Earrings", "image": "/assets/images/header/hoop-earrings.avif", link: "/earrings/hoop-earrings" },
              { name: "Drop Earrings", "image": "/assets/images/header/drop-earrings.avif", link: "/earrings/drop-earrings" },
              { name: "Halo Earrings", "image": "/assets/images/header/halo-earrings.avif", link: "/earrings/halo-earrings" },
            ]
          }
        },
        {
          type: "button",
          data: {
            text: "All Earings",
            theme: "theme_button_navbar",
            link: "/earrings/view-all"
          }
        }
      ],
      "cb-1": [
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/earrings/mens", "image": "/assets/images/header/mens-earrings.avif", name: "Men's Earrings" },
              { link: "/earrings/heart", "image": "/assets/images/header/heart-earrings.avif", name: "Heart Earrings" },
              { link: "/earrings/cluster-earrings", "image": "/assets/images/header/cluster-earrings.avif", name: "Cluster Earrings" },
              { link: "/earrings/designer-earrings", "image": "/assets/images/header/designer-earrings.avif", name: "Designer Earrings" },
            ]
          }
        }
      ],
      "cc-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Asscher", "Oval", "Pear", "Heart", "Marquise", "Cushion"], "earrings")
          }
        }
      ],
      "cd-1": [
        returnHeading("Shop By Stone Type"),
        {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald", "Tanzanite", "Amethyst", "Garnet", "Peridot", "Topaz"], "earrings")
          }
        }
      ],
      "ce-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum", "Sterling Silver"], "earrings")
          }
        },
        returnHeading("More Links"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.238", name: "QuickShip Diamond Earrings" },
              { link: "/bespoke", name: "Bespoke Diamond Earrings" },
              { link: "/earrings/1-carat", name: "1 Carat Diamond Earrings" },
            ]
          }
        },
      ]
    }
  },
  "Necklaces": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Solitaire Necklaces", "image": "/assets/images/header/solitaire-necklace.avif", link: "/pendants/solitaire-pendants" },
              { name: "Initial Necklaces", "image": "/assets/images/header/initial-necklace.avif", link: "/pendants/initial-diamond-pendant" },
              { name: "Cross Necklaces", "image": "/assets/images/header/cross-necklace.avif", link: "/pendants/cross-pendants" },
              { name: "Lab Grown Necklaces", "image": "/assets/images/header/lab-grown-diamond-necklace.avif", link: "/pendants/lab-grown-diamond" },
              { name: "Heart Necklaces", "image": "/assets/images/header/heart-necklace.avif", link: "/pendants/heart-pendants" },
              { name: "Drop Necklace", "image": "/assets/images/header/drop-necklace.avif", link: "/pendants/drop-pendants" },
              { name: "Circle Necklaces", "image": "/assets/images/header/circle-necklace.avif", link: "/pendants/circle-pendants" },
              { name: "Delicate Necklace", "image": "/assets/images/header/delicate-necklace.avif", link: "/pendants/delicate-pendants" },
            ]
          }
        },
        {
          type: "button",
          data: {
            text: "All Earings",
            theme: "theme_button_navbar",
            link: "/pendants/view-all"
          }
        },
      ],
      "cb-1": [
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/pendants/cluster-necklace", "image": "/assets/images/header/cluster-necklace.avif", name: "Cluster Necklace" },
              { link: "/pendants/personalise-pendants", "image": "/assets/images/header/personalise-necklace.avif", name: "Personalise Necklaces" },
              { link: "/pendants/number-pendants", "image": "/assets/images/header/number-necklace.avif", name: "Number Necklace" },
              { link: "/pendants/halo-pendants", "image": "/assets/images/header/halo-necklace.avif", name: "Halo Necklaces" },
              { link: "/pendants/gemstone-necklaces", "image": "/assets/images/header/emerald-necklace.avif", name: "Gemstone Necklaces" },
              { link: "/pendants/designer-pendants", "image": "/assets/images/header/designer-necklace.avif", name: "Designer Necklaces" },
              { link: "/pendants/journey-pendants", "image": "/assets/images/header/journey-necklace.avif", name: "Journey Necklaces" },
              { link: "/pendants/birthstone-necklace", "image": "/assets/images/header/birthstone-necklace.avif", name: "Birthstone Necklaces" },
            ]
          }
        },
      ],
      "cc-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Asscher", "Oval", "Pear", "Heart", "Marquise", "Cushion"], "pendants")
          }
        }

      ],
      "cd-1": [
        returnHeading("Shop By Stone Type"),
        {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald", "Tanzanite", "Aquamarine", "Amethyst", "Garnet"], "pendants")
          }
        }
      ],
      "ce-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum", "Sterling Silver"], "pendants")
          }
        },
        returnHeading("More Links"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.239", name: "QuickShip Necklaces" },
              { link: "/bespoke", name: "Bespoke Necklaces" },
              { link: "/pendants/1-carat", name: "1 Carat Diamond Necklaces" },
            ]
          }
        },
      ]
    }
  },
  "Bracelets": {
    ...sendMainCompData(5, 2, false),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "Tennis Bracelets", "image": "/assets/images/header/tennis-bracelet.avif", link: "/bracelets/tennis-bracelets" },
              { name: "Delicate Bracelets", "image": "/assets/images/header/delicate-bracelet.avif", link: "/bracelets/delicate-bracelet" },
              { name: "Cluster Bracelets", "image": "/assets/images/header/cluster-bracelet.avif", link: "/bracelets/cluster-bracelets" },
              { name: "Bangles", "image": "/assets/images/header/bangle-bracelet.avif", link: "/bracelets/bangles" },
              { name: "Friendship Bracelets", "image": "/assets/images/header/friendship-bracelet.avif", link: "/bracelets/friendship-bracelet" },
              { name: "Charms Bracelets", "image": "/assets/images/header/charms-bracelet.avif", link: "/bracelets/charms" },
            ]
          }
        }
      ],
      "cb-1": [
        returnHeading("Shop By Shape"), {
          type: "links_with_image",
          data: {
            links: giveShapeDataForLinks(["Round", "Princess", "Emerald", "Marquise"], "bracelets")
          }
        }

      ],
      "cc-1": [
        returnHeading("Shop By Stone Type"),
        {
          type: "links_with_image",
          data: {
            links: giveDiamondDataForLinks(["Diamond", "Lab Grown", "Moissanite", "Black Diamond", "Blue Sapphire", "Ruby", "Emerald"], "bracelets")
          }
        }

      ],
      "cd-1": [
        returnHeading("Shop By Metal"),
        {
          type: "links_with_image",
          data: {
            links: giveMetalDataForLinks(["Rose Gold", "White Gold", "Yellow Gold", "Platinum", "Sterling Silver"], "bracelets")
          }
        },
        returnHeading("More Links"),

        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=10.240", name: "QuickShip Bracelets" },
              { link: "/bespoke", name: "Bespoke Bracelets" },
            ]
          }
        },
      ],
      "ce-1": [
        {
          type: "image_only",
          data: {
            image: "/assets/images/header/bracelet.avif"
          }
        }
      ]
    }
  },
  "QuickShip": {
    ...sendMainCompData(5, 1, true),
    data: {
      "ca-1": [
        returnHeading("Shop By Style"),
        {
          type: "links_with_image",
          data: {
            links: [
              { name: "All Engagement Rings", image: "/assets/images/header/solitaire.avif", link: "/ready-to-deliver?filter_param=10.235" },
              { name: "All Wedding Rings", image: "/assets/images/header/eternity-half-rings.avif", link: "/ready-to-deliver?filter_param=10.236" },
              { name: "All Diamond Rings", image: "/assets/images/header/five-stone-diamond.avif", link: "/ready-to-deliver?filter_param=10.237" },
              { name: "All Earrings", image: "/assets/images/header/stud-earrings.avif", link: "/ready-to-deliver?filter_param=10.238" },
              { name: "All Necklace", image: "/assets/images/header/solitaire-necklace.avif", link: "/ready-to-deliver?filter_param=10.239" },
              { name: "All Bracelets", image: "/assets/images/header/tennis-bracelet.avif", link: "/ready-to-deliver?filter_param=10.240" },
            ]
          }
        },
      ],
      "cb-1": [
        returnHeading("Shop By Shape"),
        {
          type: "links_with_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=4.48", image: "/assets/images/header/shapes/round.svg", name: "Round" },
              { link: "/ready-to-deliver?filter_param=4.49", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
              { link: "/ready-to-deliver?filter_param=4.50", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
              { link: "/ready-to-deliver?filter_param=4.52", image: "/assets/images/header/shapes/round.svg", name: "Oval" },

              { link: "/ready-to-deliver?filter_param=4.53", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
              { link: "/ready-to-deliver?filter_param=4.54", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
              { link: "/ready-to-deliver?filter_param=4.55", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
            ]
          }
        }
      ],
      "cc-1": [
        returnHeading("Shop By Metal"), {
          type: "links_with_image",
          data: {
            links: [
              { link: "/ready-to-deliver?filter_param=1.6", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
              { link: "/ready-to-deliver?filter_param=1.4", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
              { link: "/ready-to-deliver?filter_param=1.5", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
              { link: "/ready-to-deliver?filter_param=1.7", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
            ]
          }
        }

      ],

      "cd-1": [
        {
          type: "image_with_button",
          data: {
            image: "/assets/images/header/navbar-earring.avif",
            text: "Visit our store"
          }
        }
      ],

    }
  },
  "Inspiration": {
    ...sendMainCompData(4, 1, false),
    data: {
      "ca-1": [
        returnHeading("Engagement Rings"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Engagement Rings Buying Guide", link: "/blog/engagement-rings-buying-guide" },
              { name: "Engagement Rings Trends", link: "/blog/engagement-ring-trends" },
              { name: "Wedding Rings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring" },
            ]
          }
        },
        {
          type: "break"
        },
        returnHeading("Wedding Rings"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Wedding Rings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring" },
              { name: "Wedding Rings Trends", link: "/blog/wedding-rings-trend" },
            ]
          }
        },
        {
          type: "break"
        },
        returnHeading("Diamond Rings"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Diamond Rings Buying Guide", link: "/blog/diamond-ring-buying-guide" },
              { name: "Diamond Eternity Rings Trends", link: "/blog/top-ten-diamond-eternity-rings-trends" },
            ]
          }
        }
      ],
      "cb-1": [
        returnHeading("Earrings"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Earrings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-diamond-earrings" },
            ]
          }
        },
        {
          type: "break"
        },
        returnHeading("Necklaces"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Necklaces & Pendants Buying Guide", link: "/blog/ultimate-diamond-necklace-buying-guide" },
              { name: "Necklaces & Pendants Trends", link: "/blog/diamond-necklace-and-pendant-trends" },
            ]
          }
        },
        {
          type: "break"
        },
        returnHeading("Bracelets"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { name: "Necklace Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-a-bracelet" },
              { name: "Diamond Bracelets Trends", link: "/blog/diamond-bracelet-trends" },
            ]
          }
        }
      ],
      "cc-1": [
        returnHeading("Sizing"), {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/ring-size-guide", name: "Ring Size Guide" },
              { link: "/necklace-size-guide", name: "Necklace Size Guide" },
              { link: "/blog/engagement-and-wedding-ring-resizing-guide", name: "Engagement And Wedding Rings Resizing" },
              { link: "/blog/engagement-and-wedding-ring-resizing-guide", name: "Bracelet Size Guide" },
            ]
          }
        }

      ],
      "cd-1": [
        returnHeading("Education"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/diamond-education", name: "Diamond Education" },
              { link: "/metal-guide", name: "Metal Guide" },
              { link: "/blog/which-finger-is-the-ring-finger", name: "Which Finger Is The Ring Finger?" },
              { link: "/blog/ear-piercing-faqs", name: "Ear Piercing Faqs" },
            ]
          }
        },
        {
          type: "break"
        },
        returnHeading("Other Trends"),
        {
          type: "links_wo_image",
          data: {
            links: [
              { link: "/birthstone-jewellery", name: "Birthstone Jewellery" },
              { link: "/blog/are-mens-earrings-still-in-style", name: "Are Men's Earrings in Style?" },
              { link: "/blog/is-gold-or-silver-in-style", name: "Gold Or Silver In Style?" },
            ]
          }
        },
      ]
    }
  },
}


export const menuItems = [
  {
    label: "ENGAGEMENT RINGS",
    hasSubmenu: true,
    submenu: {
      title: "ENGAGEMENT RINGS",
      items: [
        { label: "SHOP ALL ENGAGEMENT RINGS", type: "link", link: "/engagement-rings/view-all" },
        { label: "VIEW ALL ENGAGEMENT RINGS", type: "link", link: "/engagement-rings/view-all" },
        {
          label: "SHOP BY ENGAGEMENT RINGS",
          type: "dropdown",
          children: [
            {
              label: "Classic Solitaire",
              image: "/assets/images/header/mobile/engagement-rings/solitaire-icon-mobile.webp",
              link: "/engagement-rings/classic-solitaire",
            },
            {
              label: "Halo Rings",
              image: "/assets/images/header/mobile/engagement-rings/halo-icon-mobile.webp",
              link: "/engagement-rings/halo-rings",
            },
            {
              label: "Side Stone Rings",
              image: "/assets/images/header/mobile/engagement-rings/side-stone-icon-mobile.webp",
              link: "/engagement-rings/side-stone-shoulder-set-rings",
            },
            {
              label: "Trilogy Rings",
              image: "/assets/images/header/mobile/engagement-rings/three-stone-icon-mobile.webp",
              link: "/engagement-rings/trilogy-rings",
            },
            {
              label: "Illusion Set Rings",
              image: "/assets/images/header/mobile/engagement-rings/illusion-icon-mobile.webp",
              link: "/engagement-rings/illusion-set-rings",
            },
            {
              label: "Cluster Rings",
              image: "/assets/images/header/mobile/engagement-rings/cluster-icon-mobile.webp",
              link: "/engagement-rings/cluster-engagement-rings",
            },
            {
              label: "Vintage Engagement Rings",
              image: "/assets/images/header/mobile/engagement-rings/vintage-icon-mobile.webp",
              link: "/engagement-rings/vintage-engagement-rings",
            },
            {
              label: "Twisted Engagement Rings",
              image: "/assets/images/header/mobile/engagement-rings/twisted-icon-mobile.webp",
              link: "/engagement-rings/twisted-engagement-ring",
            },
            {
              label: "Unique Engagement Rings",
              image: "/assets/images/header/mobile/engagement-rings/unique-icon-mobile.webp",
              link: "/engagement-rings/unique-engagement-rings",
            },
            {
              label: "Antique Engagement Rings",
              image: "/assets/images/header/mobile/engagement-rings/antique-icon-mobile.webp",
              link: "/engagement-rings/antique-engagement-rings",
            },
            {
              label: "Gemstone Rings",
              image: "/assets/images/header/mobile/engagement-rings/gemstone-icon-mobile.webp",
              link: "/engagement-rings/gemstone-engagement-ring",
            },
            {
              label: "Couples Rings",
              image: "/assets/images/header/mobile/engagement-rings/couple-icon-mobile.webp",
              link: "/engagement-rings/couples",
            },
            {
              label: "Minimalist Engagement Rings",
              image: "/assets/images/header/mobile/engagement-rings/minimalist-icon-mobile.webp",
              link: "/engagement-rings/minimalist-engagement-rings",
            },
            {
              label: "Aquamarine Rings",
              image: "/assets/images/header/mobile/engagement-rings/aquamarine-icon-mobile.webp",
              link: "/engagement-rings/aquamarine",
            },
          ]
        },
        {
          label: "BUILD YOUR PERFECT RING",
          type: "dropdown",
          children: [
            {
              label: "Start with a Setting",
              image: "/assets/images/header/solitaire.avif",
              link: "/start-with-setting",
            },
            {
              label: "Start with a Diamond",
              image: "/assets/images/header/diamond.avif",
              link: "/choose-diamond",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/engagement-rings/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/engagement-rings/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/engagement-rings/emerald",
            },
            {
              label: "Asscher",
              image: "/assets/images/header/shapes/round.svg",
              link: "/engagement-rings/asscher",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/engagement-rings/oval",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/engagement-rings/pear",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/engagement-rings/heart",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/engagement-rings/marquise",
            },
            {
              label: "Cushion",
              image: "/assets/images/header/shapes/cushion.svg",
              link: "/engagement-rings/cushion",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/engagement-rings/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/engagement-rings/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/engagement-rings/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/engagement-rings/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/engagement-rings/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/engagement-rings/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/engagement-rings/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/engagement-rings/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/engagement-rings/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/engagement-rings/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/engagement-rings/emeralds",
            },
            {
              label: "Tanzanite",
              image: "/assets/images/header/stoneType/tz.avif",
              link: "/engagement-rings/tanzanite",
            },
            {
              label: "Amethyst",
              image: "/assets/images/header/stoneType/am.avif",
              link: "/engagement-rings/amethyst",
            },
            {
              label: "Garnet",
              image: "/assets/images/header/stoneType/gr.avif",
              link: "/engagement-rings/garnet",
            },
          ]
        },
        {
          label: "ENGAGEMENT RINGS SALE",
          type: "link",
          link: "/engagement-rings/sale-engangement-rings",
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "Ring Size Guide",
              icon: "📏",
              link: "/ring-size-guide",
            },
            {
              label: "Care Instructions",
              icon: "📋",
              link: "/diamond-education",
            },
          ]
        },
      ]
    }
  },
  {
    label: "WEDDING & ETERNITY RINGS",
    hasSubmenu: true,
    submenu: {
      title: "WEDDING & ETERNITY RINGS",
      items: [
        { label: "SHOP ALL WEDDING RINGS", type: "link", link: "/wedding-rings/view-all" },
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "Eternity Rings",
              image: "/assets/images/header/mobile/wedding-rings/eternity-ring-icon-mobile.webp",
              link: "/wedding-rings/eternity-rings",
            },
            {
              label: "Half Eternity Rings",
              image: "/assets/images/header/mobile/wedding-rings/half-eternity-icon-mobile.webp",
              link: "/wedding-rings/half-eternity-rings",
            },
            {
              label: "Full Eternity Rings",
              image: "/assets/images/header/mobile/wedding-rings/all-eternity-icon-mobile.webp",
              link: "/wedding-rings/full-eternity-rings",
            },
            {
              label: "Women's Plain",
              image: "/assets/images/header/mobile/wedding-rings/womens-plain-icon-mobile.webp",
              link: "/wedding-rings/plain/womens",
            },
            {
              label: "Plain Rings",
              image: "/assets/images/header/mobile/wedding-rings/mens-plain-icon-mobile.webp",
              link: "/wedding-rings/plain",
            },
            {
              label: "Women's Shaped",
              image: "/assets/images/header/mobile/wedding-rings/womens-shaped-icon-mobile.webp",
              link: "/wedding-rings/womens-shaped-wedding-rings",
            },
            {
              label: "Women's Diamond",
              image: "/assets/images/header/mobile/wedding-rings/womens-diamond-icon-mobile.webp",
              link: "/wedding-rings/womens",
            },
            {
              label: "Men's Diamond",
              image: "/assets/images/header/mobile/wedding-rings/mens-icon-mobile.webp",
              link: "/wedding-rings/mens",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/wedding-rings/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/wedding-rings/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/wedding-rings/emerald",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/wedding-rings/oval",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/wedding-rings/pear",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/wedding-rings/heart",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/wedding-rings/marquise",
            },
            {
              label: "Cushion",
              image: "/assets/images/header/shapes/cushion.svg",
              link: "/wedding-rings/cushion",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/wedding-rings/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/wedding-rings/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/wedding-rings/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/wedding-rings/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/wedding-rings/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/wedding-rings/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/wedding-rings/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/wedding-rings/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/wedding-rings/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/wedding-rings/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/wedding-rings/emeralds",
            },
          ]
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "QuickShip Wedding & Eternity Rings",
              link: "/ready-to-deliver?filter_param=10.236",
            },
            {
              label: "Bespoke Wedding & Eternity Rings",
              link: "/bespoke",
            },
            {
              label: "Men's Wedding Rings",
              link: "/wedding-rings/mens",
            },
          ]
        },
      ]
    }
  },
  {
    label: "DIAMOND RINGS",
    hasSubmenu: true,
    submenu: {
      title: "DIAMOND RINGS",
      items: [
        { label: "SHOP ALL DIAMOND RINGS", type: "link", link: "/diamond-rings/view-all" },
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "Five Stone",
              image: "/assets/images/header/mobile/diamond-rings/five-stone-ring-icon-mobile.webp",
              link: "/diamond-rings/five-stone-rings",
            },
            {
              label: "Seven Stone",
              image: "/assets/images/header/mobile/diamond-rings/seven-stone-ring-icon-mobile.webp",
              link: "/diamond-rings/seven-stone-rings",
            },
            {
              label: "Eternity Rings",
              image: "/assets/images/header/mobile/diamond-rings/eternity-ring-icon-mobile.webp",
              link: "/diamond-rings/eternity-rings",
            },
            {
              label: "Stacking Rings",
              image: "/assets/images/header/mobile/diamond-rings/stacking-icon-mobile.webp",
              link: "/diamond-rings/stacking-ring",
            },
            {
              label: "Cluster Rings",
              image: "/assets/images/header/mobile/diamond-rings/cluster-icon-mobile.webp",
              link: "/diamond-rings/cluster-rings",
            },
            {
              label: "Men's Rings",
              image: "/assets/images/header/mobile/diamond-rings/mens-icon-mobile.webp",
              link: "/diamond-rings/mens",
            },
            {
              label: "Halo Rings",
              image: "/assets/images/header/mobile/diamond-rings/halo-icon-mobile.webp",
              link: "/diamond-rings/halo-rings",
            },
            {
              label: "Baguette Rings",
              image: "/assets/images/header/mobile/diamond-rings/baguette-icon-mobile.webp",
              link: "/diamond-rings/baguette",
            },
            {
              label: "Gemstone Rings",
              image: "/assets/images/header/mobile/diamond-rings/gemstone-icon-mobile.webp",
              link: "/diamond-rings/gemstone-rings",
            },
            {
              label: "Minimalist Rings",
              image: "/assets/images/header/mobile/diamond-rings/minimalist-icon-mobile.webp",
              link: "/diamond-rings/minimalist-diamond-rings",
            },
            {
              label: "Trilogy Rings",
              image: "/assets/images/header/mobile/diamond-rings/three-stone-icon-mobile.webp",
              link: "/diamond-rings/three-stone",
            },
            {
              label: "Full Eternity Rings",
              image: "/assets/images/header/mobile/diamond-rings/all-eternity-icon-mobile.webp",
              link: "/diamond-rings/full-eternity-rings",
            },
            {
              label: "Half Eternity Rings",
              image: "/assets/images/header/mobile/diamond-rings/half-eternity-icon-mobile.webp",
              link: "/diamond-rings/half-eternity-rings",
            },
            {
              label: "Promise Rings",
              image: "/assets/images/header/mobile/diamond-rings/promise-rings-icon-mobile.webp",
              link: "/diamond-rings/promise-rings",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/diamond-rings/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/diamond-rings/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/diamond-rings/emerald",
            },
            {
              label: "Asscher",
              image: "/assets/images/header/shapes/round.svg",
              link: "/diamond-rings/asscher",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/diamond-rings/oval",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/diamond-rings/pear",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/diamond-rings/heart",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/diamond-rings/marquise",
            },
            {
              label: "Cushion",
              image: "/assets/images/header/shapes/cushion.svg",
              link: "/diamond-rings/cushion",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/diamond-rings/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/diamond-rings/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/diamond-rings/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/diamond-rings/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/diamond-rings/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/diamond-rings/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/diamond-rings/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/diamond-rings/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/diamond-rings/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/diamond-rings/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/diamond-rings/emeralds",
            },
            {
              label: "Tanzanite",
              image: "/assets/images/header/stoneType/tz.avif",
              link: "/diamond-rings/tanzanite",
            },
            {
              label: "Aquamarine",
              image: "/assets/images/header/stoneType/aq.avif",
              link: "/diamond-rings/aquamarine",
            },
            {
              label: "Amethyst",
              image: "/assets/images/header/stoneType/am.avif",
              link: "/diamond-rings/amethyst",
            },
            {
              label: "Garnet",
              image: "/assets/images/header/stoneType/gr.avif",
              link: "/diamond-rings/garnet",
            },
            {
              label: "Citrine",
              image: "/assets/images/header/stoneType/ct.avif",
              link: "/diamond-rings/citrine",
            },
          ]
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "QuickShip Diamond Rings",
              link: "/ready-to-deliver?filter_param=10.237",
            },
            {
              label: "Bespoke Diamond Rings",
              link: "/bespoke",
            },
            {
              label: "Diamond Rings For Women's",
              link: "/diamond-rings/womens",
            },
            {
              label: "Couple Diamond Rings",
              link: "/diamond-rings/couples",
            },
            {
              label: "1 Carat Engagement Rings",
              link: "/diamond-rings/1-carat",
            },
            {
              label: "1.5 Carat Engagement Rings",
              link: "/diamond-rings/one-and-half-carat",
            },
            {
              label: "2 Carat Engagement Rings",
              link: "/diamond-rings/2-carat",
            },
            {
              label: "3 Carat Engagement Rings",
              link: "/diamond-rings/3-carat",
            },
            {
              label: "4 Carat Engagement Rings",
              link: "/diamond-rings/4-carat",
            },
          ]
        },
      ]
    }
  },
  {
    label: "EARRINGS",
    hasSubmenu: true,
    submenu: {
      title: "EARRINGS",
      items: [
        { label: "SHOP ALL EARRINGS", type: "link", link: "/earrings/view-all" },
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "Stud Earrings",
              image: "/assets/images/header/mobile/earrings/stud-icon-mobile.webp",
              link: "/earrings/stud-earrings",
            },
            {
              label: "Hoop Earrings",
              image: "/assets/images/header/mobile/earrings/hoop-icon-mobile.webp",
              link: "/earrings/hoop-earrings",
            },
            {
              label: "Drop Earrings",
              image: "/assets/images/header/mobile/earrings/drop-icon-mobile.webp",
              link: "/earrings/drop-earrings",
            },
            {
              label: "Halo Earrings",
              image: "/assets/images/header/mobile/earrings/halo-icon-mobile.webp",
              link: "/earrings/halo-earrings",
            },
            {
              label: "Men's Earrings",
              image: "/assets/images/header/mobile/earrings/mens-icon-mobile.webp",
              link: "/earrings/mens",
            },
            {
              label: "Heart Earrings",
              image: "/assets/images/header/mobile/earrings/heart-icon-mobile.webp",
              link: "/earrings/heart",
            },
            {
              label: "Cluster Earrings",
              image: "/assets/images/header/mobile/earrings/cluster-icon-mobile.webp",
              link: "/earrings/cluster-earrings",
            },
            {
              label: "Designer Earrings",
              image: "/assets/images/header/mobile/earrings/designer-icon-mobile.webp",
              link: "/earrings/designer-earrings",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/earrings/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/earrings/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/earrings/emerald",
            },
            {
              label: "Asscher",
              image: "/assets/images/header/shapes/round.svg",
              link: "/earrings/asscher",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/earrings/oval",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/earrings/pear",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/earrings/heart",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/earrings/marquise",
            },
            {
              label: "Cushion",
              image: "/assets/images/header/shapes/cushion.svg",
              link: "/earrings/cushion",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/earrings/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/earrings/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/earrings/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/earrings/platinum",
            },
            {
              label: "Sterling Silver",
              image: "/assets/images/header/metals/silver.avif",
              link: "/earrings/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/earrings/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/earrings/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/earrings/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/earrings/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/earrings/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/earrings/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/earrings/emeralds",
            },
            {
              label: "Tanzanite",
              image: "/assets/images/header/stoneType/tz.avif",
              link: "/earrings/tanzanite",
            },
            {
              label: "Amethyst",
              image: "/assets/images/header/stoneType/am.avif",
              link: "/earrings/amethyst",
            },
            {
              label: "Garnet",
              image: "/assets/images/header/stoneType/gr.avif",
              link: "/earrings/garnet",
            },
            {
              label: "Peridot",
              image: "/assets/images/header/stoneType/pd.avif",
              link: "/earrings/peridot",
            },
            {
              label: "Topaz",
              image: "/assets/images/header/stoneType/tp.avif",
              link: "/earrings/topaz",
            },
          ]
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "QuickShip Diamond Earrings",
              link: "/ready-to-deliver?filter_param=10.238",
            },
            {
              label: "Bespoke Diamond Earrings",
              link: "/bespoke",
            },
            {
              label: "1 Carat Diamond Earrings",
              link: "/earrings/1-carat",
            },
          ]
        },
      ]
    }
  },
  {
    label: "NECKLACES",
    hasSubmenu: true,
    submenu: {
      title: "NECKLACES",
      items: [
        { label: "SHOP ALL NECKLACES", type: "link", link: "/pendants/view-all" },
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "Solitaire Necklaces",
              image: "/assets/images/header/mobile/necklaces/solitire-icon-mobile.webp",
              link: "/pendants/solitaire-pendants",
            },
            {
              label: "Initial Necklaces",
              image: "/assets/images/header/mobile/necklaces/intial-icon-mobile.webp",
              link: "/pendants/initial-diamond-pendant",
            },
            {
              label: "Cross Necklaces",
              image: "/assets/images/header/mobile/necklaces/cross-icon-mobile.webp",
              link: "/pendants/cross-pendants",
            },
            {
              label: "Lab Grown Necklaces",
              image: "/assets/images/header/mobile/necklaces/lab-grown-diamond-icon-mobile.webp",
              link: "/pendants/lab-grown-diamond",
            },
            {
              label: "Heart Necklaces",
              image: "/assets/images/header/mobile/necklaces/heart-icon-mobile.webp",
              link: "/pendants/heart-pendants",
            },
            {
              label: "Drop Necklace",
              image: "/assets/images/header/mobile/necklaces/drop-icon-mobile.webp",
              link: "/pendants/drop-pendants",
            },
            {
              label: "Circle Necklaces",
              image: "/assets/images/header/mobile/necklaces/circle-icon-mobile.webp",
              link: "/pendants/circle-pendants",
            },
            {
              label: "Delicate Necklace",
              image: "/assets/images/header/mobile/necklaces/delicate-icon-mobile.webp",
              link: "/pendants/delicate-pendants",
            },
            {
              label: "Cluster Necklace",
              image: "/assets/images/header/mobile/necklaces/cluster-icon-mobile.webp",
              link: "/pendants/cluster-necklace",
            },
            {
              label: "Personalise Necklaces",
              image: "/assets/images/header/mobile/necklaces/personlize-icon-mobile.webp",
              link: "/pendants/personalise-pendants",
            },
            {
              label: "Number Necklace",
              image: "/assets/images/header/mobile/necklaces/number-icon-mobile.webp",
              link: "/pendants/number-pendants",
            },
            {
              label: "Halo Necklaces",
              image: "/assets/images/header/mobile/necklaces/halo-icon-mobile.webp",
              link: "/pendants/halo-pendants",
            },
            {
              label: "Gemstone Necklaces",
              image: "/assets/images/header/mobile/necklaces/gemstone-icon-mobile.webp",
              link: "/pendants/gemstone-necklaces",
            },
            {
              label: "Designer Necklaces",
              image: "/assets/images/header/mobile/necklaces/designer-icon-mobile.webp",
              link: "/pendants/designer-pendants",
            },
            {
              label: "Journey Necklaces",
              image: "/assets/images/header/mobile/necklaces/journey-icon-mobile.webp",
              link: "/pendants/journey-pendants",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/mobile/necklaces/blue-sapphire-icon-mobile.webp",
              link: "/pendants/blue-sapphire",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/pendants/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/pendants/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/pendants/emerald",
            },
            {
              label: "Asscher",
              image: "/assets/images/header/shapes/round.svg",
              link: "/pendants/asscher",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/pendants/oval",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/pendants/pear",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/pendants/heart",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/pendants/marquise",
            },
            {
              label: "Cushion",
              image: "/assets/images/header/shapes/cushion.svg",
              link: "/pendants/cushion",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/pendants/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/pendants/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/pendants/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/pendants/platinum",
            },
            {
              label: "Sterling Silver",
              image: "/assets/images/header/metals/silver.avif",
              link: "/pendants/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/pendants/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/pendants/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/pendants/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/pendants/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/pendants/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/pendants/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/pendants/emeralds",
            },
            {
              label: "Tanzanite",
              image: "/assets/images/header/stoneType/tz.avif",
              link: "/pendants/tanzanite",
            },
            {
              label: "Aquamarine",
              image: "/assets/images/header/stoneType/aq.avif",
              link: "/pendants/aquamarine",
            },
            {
              label: "Amethyst",
              image: "/assets/images/header/stoneType/am.avif",
              link: "/pendants/amethyst",
            },
            {
              label: "Garnet",
              image: "/assets/images/header/stoneType/gr.avif",
              link: "/pendants/garnet",
            },
          ]
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "QuickShip Necklaces",
              link: "/ready-to-deliver?filter_param=10.239",
            },
            {
              label: "Bespoke Necklaces",
              link: "/bespoke",
            },
            {
              label: "1 Carat Diamond Necklaces",
              link: "/pendants/1-carat",
            },
          ]
        },
      ]
    }
  },
  {
    label: "BRACELETS",
    hasSubmenu: true,
    submenu: {
      title: "BRACELETS",
      items: [
        { label: "SHOP ALL BRACELETS", type: "link", link: "/bracelets/view-all" },
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "Tennis Bracelets",
              image: "/assets/images/header/mobile/bracelets/tennis-icon-mobile.webp",
              link: "/bracelets/tennis-bracelets",
            },
            {
              label: "Delicate Bracelets",
              image: "/assets/images/header/mobile/bracelets/delicate-icon-mobile.webp",
              link: "/bracelets/delicate-bracelet",
            },
            {
              label: "Cluster Bracelets",
              image: "/assets/images/header/mobile/bracelets/cluster-icon-mobile.webp",
              link: "/bracelets/cluster-bracelets",
            },
            {
              label: "Bangles",
              image: "/assets/images/header/mobile/bracelets/bangle-icon-mobile.webp",
              link: "/bracelets/bangles",
            },
            {
              label: "Friendship Bracelets",
              image: "/assets/images/header/mobile/bracelets/friendship-icon-mobile.webp",
              link: "/bracelets/friendship-bracelet",
            },
            {
              label: "Charms Bracelets",
              image: "/assets/images/header/mobile/bracelets/charms-icon-mobile.webp",
              link: "/bracelets/charms",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/bracelets/round",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/bracelets/princess",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/bracelets/emerald",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/bracelets/marquise",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/bracelets/rose-gold",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/bracelets/white-gold",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/bracelets/yellow-gold",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/bracelets/platinum",
            },
            {
              label: "Sterling Silver",
              image: "/assets/images/header/metals/silver.avif",
              link: "/bracelets/platinum",
            },
          ]
        },
        {
          label: "SHOP BY GEMSTONES",
          type: "dropdown",
          children: [
            {
              label: "Diamond",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/bracelets/diamonds",
            },
            {
              label: "Lab Grown",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/bracelets/moissanite",
            },
            {
              label: "Moissanite",
              image: "/assets/images/header/stoneType/di.avif",
              link: "/bracelets/moissanite",
            },
            {
              label: "Black Diamond",
              image: "/assets/images/header/stoneType/bd.avif",
              link: "/bracelets/black-diamond",
            },
            {
              label: "Blue Sapphire",
              image: "/assets/images/header/stoneType/bs.avif",
              link: "/bracelets/blue-sapphire",
            },
            {
              label: "Ruby",
              image: "/assets/images/header/stoneType/rb.avif",
              link: "/bracelets/ruby",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/stoneType/em.avif",
              link: "/bracelets/emeralds",
            },
          ]
        },
        {
          label: "MORE LINKS",
          type: "dropdown",
          children: [
            {
              label: "QuickShip Bracelets",
              link: "/ready-to-deliver?filter_param=10.240",
            },
            {
              label: "Bespoke Bracelets",
              link: "/bespoke",
            },
          ]
        },
      ]
    }
  },
  {
    label: "QUICKSHIP",
    hasSubmenu: true,
    submenu: {
      title: "QUICKSHIP",
      items: [
        {
          label: "SHOP BY STYLE",
          type: "dropdown",
          children: [
            {
              label: "All Engagement Rings",
              image: "/assets/images/header/mobile/quickship/solitaire-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.235",
            },
            {
              label: "All Wedding Rings",
              image: "/assets/images/header/mobile/quickship/eternity-ring-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.236",
            },
            {
              label: "All Diamond Rings",
              image: "/assets/images/header/mobile/quickship/solitire-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.237",
            },
            {
              label: "All Earrings",
              image: "/assets/images/header/mobile/quickship/stud-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.238",
            },
            {
              label: "All Necklace",
              image: "/assets/images/header/mobile/quickship/solitire-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.239",
            },
            {
              label: "All Bracelets",
              image: "/assets/images/header/mobile/quickship/tennis-icon-mobile.webp",
              link: "/ready-to-deliver?filter_param=10.240",
            },
          ]
        },
        {
          label: "SHOP BY SHAPES",
          type: "dropdown",
          children: [
            {
              label: "Round",
              image: "/assets/images/header/shapes/round.svg",
              link: "/ready-to-deliver?filter_param=4.48",
            },
            {
              label: "Princess",
              image: "/assets/images/header/shapes/princess.svg",
              link: "/ready-to-deliver?filter_param=4.49",
            },
            {
              label: "Emerald",
              image: "/assets/images/header/shapes/emerald.svg",
              link: "/ready-to-deliver?filter_param=4.50",
            },
            {
              label: "Oval",
              image: "/assets/images/header/shapes/round.svg",
              link: "/ready-to-deliver?filter_param=4.52",
            },
            {
              label: "Pear",
              image: "/assets/images/header/shapes/pear.svg",
              link: "/ready-to-deliver?filter_param=4.53",
            },
            {
              label: "Heart",
              image: "/assets/images/header/shapes/heart.svg",
              link: "/ready-to-deliver?filter_param=4.54",
            },
            {
              label: "Marquise",
              image: "/assets/images/header/shapes/marquise.svg",
              link: "/ready-to-deliver?filter_param=4.55",
            },
          ]
        },
        {
          label: "SHOP BY METALS",
          type: "dropdown",
          children: [
            {
              label: "Rose Gold",
              image: "/assets/images/header/metals/rose-gold.avif",
              link: "/ready-to-deliver?filter_param=1.6",
            },
            {
              label: "White Gold",
              image: "/assets/images/header/metals/white-gold.avif",
              link: "/ready-to-deliver?filter_param=1.4",
            },
            {
              label: "Yellow Gold",
              image: "/assets/images/header/metals/yellow-gold.avif",
              link: "/ready-to-deliver?filter_param=1.5",
            },
            {
              label: "Platinum",
              image: "/assets/images/header/metals/platinum.avif",
              link: "/ready-to-deliver?filter_param=1.7",
            },
          ]
        },
      ]
    }
  },
  {
    label: "INSPIRATION",
    hasSubmenu: true,
    submenu: {
      title: "INSPIRATION",
      items: [
        {
          label: "ENGAGEMENT RINGS",
          type: "dropdown",
          children: [
            {
              label: "Engagement Rings Buying Guide",
              link: "/blog/engagement-rings-buying-guide",
            },
            {
              label: "Engagement Rings Trends",
              link: "/blog/engagement-ring-trends",
            },
            {
              label: "Wedding Rings Buying Guide",
              link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring",
            },
          ]
        },
        {
          label: "WEDDING RINGS",
          type: "dropdown",
          children: [
            {
              label: "Wedding Rings Buying Guide",
              link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring",
            },
            {
              label: "Wedding Rings Trends",
              link: "/blog/wedding-rings-trend",
            },
          ]
        },
        {
          label: "DIAMOND RINGS",
          type: "dropdown",
          children: [
            {
              label: "Diamond Rings Buying Guide",
              link: "/blog/diamond-ring-buying-guide",
            },
            {
              label: "Diamond Eternity Rings Trends",
              link: "/blog/top-ten-diamond-eternity-rings-trends",
            },
          ]
        },
        {
          label: "EARRINGS",
          type: "dropdown",
          children: [
            {
              label: "Earrings Buying Guide",
              link: "/blog/ultimate-guide-on-how-to-buy-diamond-earrings",
            },
          ]
        },
        {
          label: "NECKLACES",
          type: "dropdown",
          children: [
            {
              label: "Necklaces & Pendants Buying Guide",
              link: "/blog/ultimate-diamond-necklace-buying-guide",
            },
            {
              label: "Necklaces & Pendants Trends",
              link: "/blog/diamond-necklace-and-pendant-trends",
            },
          ]
        },
        {
          label: "BRACELETS",
          type: "dropdown",
          children: [
            {
              label: "Necklace Buying Guide",
              link: "/blog/ultimate-guide-on-how-to-buy-a-bracelet",
            },
            {
              label: "Diamond Bracelets Trends",
              link: "/blog/diamond-bracelet-trends",
            },
          ]
        },
        {
          label: "SIZING",
          type: "dropdown",
          children: [
            {
              label: "Ring Size Guide",
              link: "/ring-size-guide",
            },
            {
              label: "Necklace Size Guide",
              link: "/necklace-size-guide",
            },
            {
              label: "Engagement And Wedding Rings Resizing",
              link: "/blog/engagement-and-wedding-ring-resizing-guide",
            },
            {
              label: "Bracelet Size Guide",
              link: "/blog/engagement-and-wedding-ring-resizing-guide",
            },
          ]
        },
        {
          label: "EDUCATION",
          type: "dropdown",
          children: [
            {
              label: "Diamond Education",
              link: "/diamond-education",
            },
            {
              label: "Metal Guide",
              link: "/metal-guide",
            },
            {
              label: "Which Finger Is The Ring Finger?",
              link: "/blog/which-finger-is-the-ring-finger",
            },
            {
              label: "Ear Piercing Faqs",
              link: "/blog/ear-piercing-faqs",
            },
          ]
        },
        {
          label: "OTHER TRENDS",
          type: "dropdown",
          children: [
            {
              label: "Birthstone Jewellery",
              link: "/birthstone-jewellery",
            },
            {
              label: "Are Men's Earrings in Style?",
              link: "/blog/are-mens-earrings-still-in-style",
            },
            {
              label: "Gold Or Silver In Style?",
              link: "/blog/is-gold-or-silver-in-style",
            },
          ]
        },
      ]
    }
  },
  {
    label: "INFORMATION",
    hasSubmenu: true,
    submenu: {
      title: "INFORMATION",
      items: [
        { label: "ABOUT US", type: "link", link: "/about-us" },
        { label: "VISIT OUR STORE", type: "link", link: "/book-appointment" },
        { label: "OUR CUSTOMER REVIEW", type: "link", link: "https://uk.trustpilot.com/review/abelini.com" },
        { label: "CUSTOMER SERVICE", type: "link", link: "/contact-us" },
        { label: "FREE DELIVERY", type: "link", link: "/free-shipping" },
        { label: "RETURN & EXCHANGE", type: "link", link: "/return-and-exchange" },
        { label: "WARRANTY & CARE", type: "link", link: "/warranty-and-care" },
        { label: "JEWELLERY INSURANCE", type: "link", link: "/jewellery-insurance" },
        { label: "BESPOKE", type: "link", link: "/bespoke" },
        { label: "METAL GUIDE", type: "link", link: "/metal-guide" },
        { label: "DIAMOND GUIDE", type: "link", link: "/diamond-education" },
        { label: "SIZE GUIDE", type: "link", link: "/ring-size-guide" },
        { label: "JEWELLERY CARE", type: "link", link: "/jewellery-care" },
      ]
    }
  },
  { label: "BLOG", hasSubmenu: false, link: "/blog" },
  { label: "BESPOKE", hasSubmenu: false, link: "/bespoke" },
  { label: "CUSTOMER SERVICE", hasSubmenu: false, link: "/contact-us" },
];