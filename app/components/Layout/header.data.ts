import type { HeaderData } from "./header.type";

type DataForNavigation = {
    [key: string]: HeaderData
}

export const dataForNavigation: DataForNavigation = {
    "Engagement Rings" : {
    totalCols: 5,
        leftBorderFromIndex: 2,
            lastColDoubleSpace: false,
                data: {
        "ca-1": [
            {
                type: "heading",
                data: {
                    text: "Create your own"
                }
            },
            {
                type: "links_with_image",
                data: {
                    links: [
                        { name: "Start With A Diamond", image: "/assets/images/header/diamond.avif", link: "/choose-diamond" },
                    ]
                }
            },
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },
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
                    {
                        type: "heading",
                        data: {
                            text: "Shop By Shape"
                        }
                    }, {
                        type: "links_with_image",
                        data: {
                            links: [
                                { link: "/engagement-rings/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                                { link: "/engagement-rings/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                                { link: "/engagement-rings/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                                { link: "/engagement-rings/asscher", image: "/assets/images/header/shapes/round.svg", name: "Asscher" },
                                { link: "/engagement-rings/oval", image: "/assets/images/header/shapes/round.svg", name: "Oval" },

                                { link: "/engagement-rings/pear", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
                                { link: "/engagement-rings/heart", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
                                { link: "/engagement-rings/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                                { link: "/engagement-rings/cushion", image: "/assets/images/header/shapes/cushion.svg", name: "Cushion" },
                            ]
                        }
                    }

                ],
                    "cd-1": [
                        {
                            type: "heading",
                            data: {
                                text: "Shop By Stone Type"
                            }
                        },
                        {
                            type: "links_with_image",
                            data: {
                                links: [
                                    { link: "/engagement-rings/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                                    { link: "/engagement-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                                    { link: "/engagement-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                                    { link: "/engagement-rings/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                                    { link: "/engagement-rings/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                                    { link: "/engagement-rings/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                                    { link: "/engagement-rings/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" },

                                    { link: "/engagement-rings/tanzanite", "image": "/assets/images/header/stoneType/tz.avif", name: "Tanzanite" },
                                    { link: "/engagement-rings/amethyst", "image": "/assets/images/header/stoneType/am.avif", name: "Amethyst" },
                                    { link: "/engagement-rings/garnet", "image": "/assets/images/header/stoneType/gr.avif", name: "Garnet" },
                                ]
                            }
                        }
                    ],
                        "ce-1": [
                            {
                                type: "heading",
                                data: {
                                    text: "Shop By Metal"
                                }
                            },
                            {
                                type: "links_with_image",
                                data: {
                                    links: [
                                        { link: "/engagement-rings/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                                        { link: "/engagement-rings/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                                        { link: "/engagement-rings/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                                        { link: "/engagement-rings/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                                    ]
                                }
                            }, {
                                type: "break"
                            },
                            {
                                type: "heading",
                                data: {
                                    text: "More Links"
                                }
                            },
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
    "Wedding & Eternity Rings" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: false,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Style"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            {name: "Eternity Rings", image: "/assets/images/header/eternity-rings.avif", link: "/wedding-rings/eternity-rings"},
                            {name: "Half Eternity Rings", "image": "/assets/images/header/eternity-half-rings.avif", link: "/wedding-rings/half-eternity-rings"},
                            {name: "Full Eternity Rings", "image": "/assets/images/header/eternity-full-rings.avif", link: "/wedding-rings/full-eternity-rings"},
                            {name: "Women's Plain", "image": "/assets/images/header/womens-plain.avif", link: "/wedding-rings/plain/womens"},
                            {name: "Plain Rings",  "image": "/assets/images/header/mens-plain.avif", link: "/wedding-rings/plain"}
                        ]
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/wedding-rings/womens-shaped-wedding-rings", "image": "/assets/images/header/womens-shaped.avif", name: "Women's Shaped"},
                    {link: "/wedding-rings/womens",  "image": "/assets/images/header/womens-diamond.avif", name: "Women's Diamond"},
                    {link: "/wedding-rings/plain/mens",  "image": "/assets/images/header/mens-plain-2.avif", name: "Men's Plain"},
                    {link: "/wedding-rings/mens", "image": "/assets/images/header/mens-diamond.avif",name: "Men's Diamond"},
                    ]
                }
            }
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Shape"
                }
            },{
                type: "links_with_image",
                data: {
                    links: [
                        { link: "/wedding-rings/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                        { link: "/wedding-rings/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                        { link: "/wedding-rings/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                        { link: "/wedding-rings/oval", image: "/assets/images/header/shapes/round.svg", name: "Oval" },

                        { link: "/wedding-rings/pear", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
                        { link: "/wedding-rings/heart", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
                        { link: "/wedding-rings/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                        { link: "/wedding-rings/cushion", image: "/assets/images/header/shapes/cushion.svg", name: "Cushion" },
                    ]
                }
            }
    
            ],
            "cd-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Stone Type"
                    }
                },{
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/wedding-rings/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                            { link: "/wedding-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                            { link: "/wedding-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                            { link: "/wedding-rings/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                            { link: "/wedding-rings/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                            { link: "/wedding-rings/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                            { link: "/wedding-rings/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" },
                        ]
                    }
                }
            ],
            "ce-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Metal"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/wedding-rings/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                            { link: "/wedding-rings/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                            { link: "/wedding-rings/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                            { link: "/wedding-rings/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                        ]
                    }
                },
                {
                    type: "heading",
                    data: {
                        text: "More Links"
                    }
                },
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
    "Diamond Rings" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: false,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Style"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            {name: "Five Stone", image: "/assets/images/header/five-stone-diamond.avif", link: "/diamond-rings/five-stone-rings"},
                            {name: "Seven Stone", "image": "/assets/images/header/seven-stone-diamond.avif", link: "/diamond-rings/seven-stone-rings"},
                            {name: "Eternity Rings", "image": "/assets/images/header/eternity-rings-diamond.avif", link: "/diamond-rings/eternity-rings"},
                            {name: "Stacking Rings", "image": "/assets/images/header/stacking-rings-diamond.avif", link: "/diamond-rings/stacking-ring"},
                            {name: "Cluster Rings", "image": "/assets/images/header/cluster-diamond.avif", link: "/diamond-rings/cluster-rings"},
                            {name: "Men's Rings", "image": "/assets/images/header/mens-diamond-diamond.avif", link: "/diamond-rings/mens"},
                            {name: "Halo Rings",  "image": "/assets/images/header/halo-rings-diamond.avif", link: "/diamond-rings/halo-rings"},
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
                    {link: "/diamond-rings/baguette",  "image": "/assets/images/header/baguette-diamond.avif",name: "Baguette Rings"},
                    {link: "/diamond-rings/gemstone-rings", "image": "/assets/images/header/gemstone-diamond.avif", name: "Gemstone Rings"},
                    {link: "/diamond-rings/minimalist-diamond-rings", "image": "/assets/images/header/minimalist-diamond.avif", name: "Minimalist Rings"},
                    {link: "/diamond-rings/three-stone", "image": "/assets/images/header/three-stone-diamond.avif", name: "Trilogy Rings"},
                    {link: "/diamond-rings/full-eternity-rings", "image": "/assets/images/header/eternity-full-rings-diamond.avif", name: "Full Eternity Rings"},
                    
                    {link: "/diamond-rings/half-eternity-rings", "image": "/assets/images/header/eternity-half-rings-diamond.avif", name: "Half Eternity Rings"},
                    {link: "/diamond-rings/promise-rings", "image": "/assets/images/header/promise-rings-diamond.avif", name: "Promise Rings"},
                    ]
                }
            }
            ],
            "cc-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Shape"
                    }
                }, {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/diamond-rings/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                            { link: "/diamond-rings/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                            { link: "/diamond-rings/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                            { link: "/diamond-rings/asscher", image: "/assets/images/header/shapes/round.svg", name: "Asscher" },
                            { link: "/diamond-rings/oval", image: "/assets/images/header/shapes/round.svg", name: "Oval" },

                            { link: "/diamond-rings/pear", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
                            { link: "/diamond-rings/heart", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
                            { link: "/diamond-rings/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                            { link: "/diamond-rings/cushion", image: "/assets/images/header/shapes/cushion.svg", name: "Cushion" },
                        ]
                    }
                }
    
            ],
            "cd-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Stone Type"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/diamond-rings/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                            { link: "/diamond-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                            { link: "/diamond-rings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                            { link: "/diamond-rings/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                            { link: "/diamond-rings/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                            { link: "/diamond-rings/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                            { link: "/diamond-rings/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" },

                            { link: "/diamond-rings/tanzanite", "image": "/assets/images/header/stoneType/tz.avif", name: "Tanzanite" },

                            { link: "/diamond-rings/aquamarine", "image": "/assets/images/header/stoneType/aq.avif", name: "Aquamarine" },
                            { link: "/diamond-rings/amethyst", "image": "/assets/images/header/stoneType/am.avif", name: "Amethyst" },

                            { link: "/diamond-rings/garnet", "image": "/assets/images/header/stoneType/gr.avif", name: "Garnet" },
                            { link: "/diamond-rings/citrine", "image": "/assets/images/header/stoneType/ct.avif", name: "Citrine" },
                        ]
                    }
                }
            ],
            "ce-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Metal"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/diamond-rings/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                            { link: "/diamond-rings/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                            { link: "/diamond-rings/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                            { link: "/diamond-rings/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                        ]
                    }
                },
                {
                    type: "heading",
                    data: {
                        text: "More Links"
                    }
                },
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
    "Earrings" : {
    totalCols: 5,
    leftBorderFromIndex: 2,
    lastColDoubleSpace: false,
    data: {
        "ca-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },
            {
                type: "links_with_image",
                data: {
                    links: [
                        {name: "Stud Earrings", "image": "/assets/images/header/stud-earrings.avif", link: "/earrings/stud-earrings"},
                        {name: "Hoop Earrings", "image": "/assets/images/header/hoop-earrings.avif", link: "/earrings/hoop-earrings"},
                        {name: "Drop Earrings", "image": "/assets/images/header/drop-earrings.avif", link: "/earrings/drop-earrings"},
                        {name: "Halo Earrings", "image": "/assets/images/header/halo-earrings.avif", link: "/earrings/halo-earrings"},
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
                {link: "/earrings/mens", "image": "/assets/images/header/mens-earrings.avif", name: "Men's Earrings"},
                {link: "/earrings/heart", "image": "/assets/images/header/heart-earrings.avif", name: "Heart Earrings"},
                {link: "/earrings/cluster-earrings", "image": "/assets/images/header/cluster-earrings.avif", name: "Cluster Earrings"},
                {link: "/earrings/designer-earrings", "image": "/assets/images/header/designer-earrings.avif", name: "Designer Earrings"},
                ]
            }
        }
        ],
        "cc-1": [
        {
            type: "heading",
            data: {
                text: "Shop By Shape"
            }
        },{
            type: "links_with_image",
            data: {
                links: [
                    { link: "/earrings/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                    { link: "/earrings/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                    { link: "/earrings/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                    { link: "/earrings/asscher", image: "/assets/images/header/shapes/round.svg", name: "Asscher" },
                    { link: "/earrings/oval", image: "/assets/images/header/shapes/round.svg", name: "Oval" },

                    { link: "/earrings/pear", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
                    { link: "/earrings/heart", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
                    { link: "/earrings/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                    { link: "/earrings/cushion", image: "/assets/images/header/shapes/cushion.svg", name: "Cushion" },
                ]
            }
        }
        ],
        "cd-1": [
                        {
                            type: "heading",
                            data: {
                                text: "Shop By Stone Type"
                            }
                        },
                        {
                            type: "links_with_image",
                            data: {
                                links: [
                                    { link: "/earrings/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                                    { link: "/earrings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                                    { link: "/earrings/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                                    { link: "/earrings/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                                    { link: "/earrings/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                                    { link: "/earrings/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                                    { link: "/earrings/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" },
                                    { link: "/earrings/tanzanite", "image": "/assets/images/header/stoneType/tz.avif", name: "Tanzanite" },
                                    { link: "/earrings/amethyst", "image": "/assets/images/header/stoneType/am.avif", name: "Amethyst" },
                                    { link: "/earrings/garnet", "image": "/assets/images/header/stoneType/gr.avif", name: "Garnet" },
                                    { link: "/earrings/peridot", "image": "/assets/images/header/stoneType/pd.avif", name: "Peridot" },
                                    { link: "/earrings/topaz", "image": "/assets/images/header/stoneType/tp.avif", name: "Topaz" },
                                ]
                            }
                        }
                    ],
        "ce-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Metal"
                }
            },
            {
                type: "links_with_image",
                data: {
                    links: [
                        { link: "/earrings/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                        { link: "/earrings/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                        { link: "/earrings/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                        { link: "/earrings/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                        { link: "/earrings/platinum", "image": "/assets/images/header/metals/silver.avif", name: "Sterling Silver" },
                    ]
                }
            },
            {
                type: "heading",
                data: {
                    text: "More Links"
                }
            },
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
    "Necklaces" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: false,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Style"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            {name: "Solitaire Necklaces", "image": "/assets/images/header/solitaire-necklace.avif", link: "/pendants/solitaire-pendants"},
                            {name: "Initial Necklaces", "image": "/assets/images/header/initial-necklace.avif", link: "/pendants/initial-diamond-pendant"},
                            {name: "Cross Necklaces", "image": "/assets/images/header/cross-necklace.avif", link: "/pendants/cross-pendants"},
                            {name: "Lab Grown Necklaces", "image": "/assets/images/header/lab-grown-diamond-necklace.avif", link: "/pendants/lab-grown-diamond"},
                            {name: "Heart Necklaces", "image": "/assets/images/header/heart-necklace.avif", link: "/pendants/heart-pendants"},
                            {name: "Drop Necklace", "image": "/assets/images/header/drop-necklace.avif", link: "/pendants/drop-pendants"},
                            {name: "Circle Necklaces", "image": "/assets/images/header/circle-necklace.avif", link: "/pendants/circle-pendants"},
                            {name: "Delicate Necklace", "image": "/assets/images/header/delicate-necklace.avif", link: "/pendants/delicate-pendants"},
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
                    {link: "/pendants/cluster-necklace", "image": "/assets/images/header/cluster-necklace.avif", name: "Cluster Necklace"},
                    {link: "/pendants/personalise-pendants", "image": "/assets/images/header/personalise-necklace.avif", name: "Personalise Necklaces"},
                    {link: "/pendants/number-pendants", "image": "/assets/images/header/number-necklace.avif", name: "Number Necklace"},
                    {link: "/pendants/halo-pendants", "image": "/assets/images/header/halo-necklace.avif", name: "Halo Necklaces"},
                    {link: "/pendants/gemstone-necklaces", "image": "/assets/images/header/emerald-necklace.avif", name: "Gemstone Necklaces"},
                    {link: "/pendants/designer-pendants", "image": "/assets/images/header/designer-necklace.avif", name: "Designer Necklaces"},
                    {link: "/pendants/journey-pendants", "image": "/assets/images/header/journey-necklace.avif", name: "Journey Necklaces"},
                    {link: "/pendants/birthstone-necklace", "image": "/assets/images/header/birthstone-necklace.avif", name: "Birthstone Necklaces"},
                    ]
                }
            },
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Shape"
                }
            },{
                type: "links_with_image",
                data: {
                    links: [
                        { link: "/pendants/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                        { link: "/pendants/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                        { link: "/pendants/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                        { link: "/pendants/asscher", image: "/assets/images/header/shapes/round.svg", name: "Asscher" },
                        { link: "/pendants/oval", image: "/assets/images/header/shapes/round.svg", name: "Oval" },
                        { link: "/pendants/pear", image: "/assets/images/header/shapes/pear.svg", name: "Pear" },
                        { link: "/pendants/heart", image: "/assets/images/header/shapes/heart.svg", name: "Heart" },
                        { link: "/pendants/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                        { link: "/pendants/cushion", image: "/assets/images/header/shapes/cushion.svg", name: "Cushion" },
                    ]
                }
            }
    
            ],
            "cd-1": [
                        {
                            type: "heading",
                            data: {
                                text: "Shop By Stone Type"
                            }
                        },
                        {
                            type: "links_with_image",
                            data: {
                                links: [
                                    { link: "/pendants/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                                    { link: "/pendants/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                                    { link: "/pendants/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                                    { link: "/pendants/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                                    { link: "/pendants/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                                    { link: "/pendants/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                                    { link: "/pendants/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" },
                                    { link: "/pendants/tanzanite", "image": "/assets/images/header/stoneType/tz.avif", name: "Tanzanite" },
                                    { link: "/pendants/aquamarine", "image": "/assets/images/header/stoneType/aq.avif", name: "Aquamarine" },
                                    { link: "/pendants/amethyst", "image": "/assets/images/header/stoneType/am.avif", name: "Amethyst" },
                                    { link: "/pendants/garnet", "image": "/assets/images/header/stoneType/gr.avif", name: "Garnet" },
                                ]
                            }
                        }
                    ],
            "ce-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Metal"
                }
            },
            {
                type: "links_with_image",
                data: {
                    links: [
                        { link: "/pendants/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                        { link: "/pendants/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                        { link: "/pendants/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                        { link: "/pendants/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                        { link: "/pendants/platinum", "image": "/assets/images/header/metals/silver.avif", name: "Sterling Silver" },
                    ]
                }
            },
            {
                type: "heading",
                data: {
                    text: "More Links"
                }
            },
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
    "Bracelets" : {
        totalCols: 5,
        leftBorderFromIndex: 1,
        lastColDoubleSpace: false,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Style"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            {name: "Tennis Bracelets", "image": "/assets/images/header/tennis-bracelet.avif", link: "/bracelets/tennis-bracelets"},
                            {name: "Delicate Bracelets", "image": "/assets/images/header/delicate-bracelet.avif", link: "/bracelets/delicate-bracelet"},
                            {name: "Cluster Bracelets", "image": "/assets/images/header/cluster-bracelet.avif", link: "/bracelets/cluster-bracelets"},
                            {name: "Bangles", "image": "/assets/images/header/bangle-bracelet.avif", link: "/bracelets/bangles"},
                            {name: "Friendship Bracelets", "image": "/assets/images/header/friendship-bracelet.avif", link: "/bracelets/friendship-bracelet"},
                            {name: "Charms Bracelets", "image": "/assets/images/header/charms-bracelet.avif", link: "/bracelets/charms"},
                        ]
                    }
                }
            ],
            "cb-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Shape"
                    }
                },{
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/bracelets/round", image: "/assets/images/header/shapes/round.svg", name: "Round" },
                            { link: "/bracelets/princess", image: "/assets/images/header/shapes/princess.svg", name: "Princess" },
                            { link: "/bracelets/emerald", image: "/assets/images/header/shapes/emerald.svg", name: "Emerald" },
                            { link: "/bracelets/marquise", image: "/assets/images/header/shapes/marquise.svg", name: "Marquise" },
                        ]
                    }
                }
    
            ],
            "cc-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Stone Type"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/bracelets/diamonds", "image": "/assets/images/header/stoneType/di.avif", name: "Diamond" },
                            { link: "/bracelets/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Lab Grown" },
                            { link: "/bracelets/moissanite", "image": "/assets/images/header/stoneType/di.avif", name: "Moissanite" },
                            { link: "/bracelets/black-diamond", "image": "/assets/images/header/stoneType/bd.avif", name: "Black Diamond" },
                            { link: "/bracelets/blue-sapphire", "image": "/assets/images/header/stoneType/bs.avif", name: "Blue Sapphire" },
                            { link: "/bracelets/ruby", "image": "/assets/images/header/stoneType/rb.avif", name: "Ruby" },
                            { link: "/bracelets/emeralds", "image": "/assets/images/header/stoneType/em.avif", name: "Emerald" }
                        ]
                    }
                }
    
            ],
            "cd-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Metal"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            { link: "/bracelets/rose-gold", "image": "/assets/images/header/metals/rose-gold.avif", name: "Rose Gold" },
                            { link: "/bracelets/white-gold", "image": "/assets/images/header/metals/white-gold.avif", name: "White Gold" },
                            { link: "/bracelets/yellow-gold", "image": "/assets/images/header/metals/yellow-gold.avif", name: "Yellow Gold" },
                            { link: "/bracelets/platinum", "image": "/assets/images/header/metals/platinum.avif", name: "Platinum" },
                            { link: "/bracelets/platinum", "image": "/assets/images/header/metals/silver.avif", name: "Sterling Silver" },
                        ]
                    }
                },
                {
                    type: "heading",
                    data: {
                        text: "More Links"
                    }
                },
                
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
    "QuickShip" : {
        totalCols: 5,
        leftBorderFromIndex: 1,
        lastColDoubleSpace: true,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Style"
                    }
                },
                {
                    type: "links_with_image",
                    data: {
                        links: [
                            {name: "All Engagement Rings", image: "/assets/images/header/solitaire.avif", link: "/ready-to-deliver?filter_param=10.235"},
                            {name: "All Wedding Rings", image: "/assets/images/header/eternity-half-rings.avif", link: "/ready-to-deliver?filter_param=10.236"},
                            {name: "All Diamond Rings", image: "/assets/images/header/five-stone-diamond.avif", link: "/ready-to-deliver?filter_param=10.237"},
                            {name: "All Earrings", image: "/assets/images/header/stud-earrings.avif", link: "/ready-to-deliver?filter_param=10.238"},
                            {name: "All Necklace", image: "/assets/images/header/solitaire-necklace.avif", link: "/ready-to-deliver?filter_param=10.239"},
                            {name: "All Bracelets", image: "/assets/images/header/tennis-bracelet.avif", link: "/ready-to-deliver?filter_param=10.240"},
                        ]
                    }
                },
            ],
            "cb-1": [
                {
                    type: "heading",
                    data: {
                        text: "Shop By Shape"
                    }
                },
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
            {
                type: "heading",
                data: {
                    text: "Shop By Metal"
                }
            },{
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
    "Inspiration" : {
        totalCols: 4,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: false,
        data: {
            "ca-1": [
                {
                    type: "heading",
                    data: {
                        text: "Engagement Rings"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Engagement Rings Buying Guide", link: "/blog/engagement-rings-buying-guide"},
                            {name: "Engagement Rings Trends", link: "/blog/engagement-ring-trends"},
                            {name: "Wedding Rings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring"},
                        ]
                    }
                },
                {
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Wedding Rings"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Wedding Rings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-wedding-ring"},
                            {name: "Wedding Rings Trends", link: "/blog/wedding-rings-trend"},
                        ]
                    }
                },
                {
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Diamond Rings"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Diamond Rings Buying Guide", link: "/blog/diamond-ring-buying-guide"},
                            {name: "Diamond Eternity Rings Trends", link: "/blog/top-ten-diamond-eternity-rings-trends"},
                        ]
                    }
                }
            ],
            "cb-1": [
                {
                    type: "heading",
                    data: {
                        text: "Earrings"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Earrings Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-diamond-earrings"},
                        ]
                    }
                },
                {
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Necklaces"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Necklaces & Pendants Buying Guide", link: "/blog/ultimate-diamond-necklace-buying-guide"},
                            {name: "Necklaces & Pendants Trends", link: "/blog/diamond-necklace-and-pendant-trends"},
                        ]
                    }
                },
                {
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Bracelets"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                            {name: "Necklace Buying Guide", link: "/blog/ultimate-guide-on-how-to-buy-a-bracelet"},
                            {name: "Diamond Bracelets Trends", link: "/blog/diamond-bracelet-trends"},
                        ]
                    }
                }
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Sizing"
                }
            },{
            type: "links_wo_image",
            data: {
                links: [
                {link: "/ring-size-guide", name: "Ring Size Guide"},
                {link: "/necklace-size-guide", name: "Necklace Size Guide"},
                {link: "/blog/engagement-and-wedding-ring-resizing-guide", name: "Engagement And Wedding Rings Resizing"},
                {link: "/blog/engagement-and-wedding-ring-resizing-guide", name: "Bracelet Size Guide"},
                ]
            }
            }
    
            ],
            "cd-1": [
                {
                    type: "heading",
                    data: {
                        text: "Education"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                        {link: "/diamond-education", name: "Diamond Education"},
                        {link: "/metal-guide", name: "Metal Guide"},
                        {link: "/blog/which-finger-is-the-ring-finger", name: "Which Finger Is The Ring Finger?"},
                        {link: "/blog/ear-piercing-faqs", name: "Ear Piercing Faqs"},
                        ]
                    }
                },
                {
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Other Trends"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                        {link: "/birthstone-jewellery", name: "Birthstone Jewellery"},
                        {link: "/blog/are-mens-earrings-still-in-style", name: "Are Men's Earrings in Style?"},
                        {link: "/blog/is-gold-or-silver-in-style", name: "Gold Or Silver In Style?"},
                        ]
                    }
                },
            ]
        }
    },
}

