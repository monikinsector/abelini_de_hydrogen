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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            "cd-1": [
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
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        ]
                    }
                    }
            ],
            "ce-1": [
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
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        ]
                    }
                },{
                    type: "break"
                },
                {
                    type: "heading",
                    data: {
                        text: "Shop By Links"
                    }
                },
                {
                    type: "links_wo_image",
                    data: {
                        links: [
                        {link: "/", name: "Classic Solitaire"},
                        {link: "/", name: "Classic Solitaire"},
                        {link: "/", name: "Classic Solitaire"},
                        ]
                    }
                }

            ]
        }
    },
    "Wedding & Eternity Rings" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: true,
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            // "cd-1": [
            //   {
            //     type: "image_only",
            //     data: {
            //         image: "/assets/images/bracelet.avif"
            //     }
            // }
            // ],
            "ce-1": [
                {
                    type: "image_with_button",
                    data: {
                        image: "/assets/images/dummy_navbar_image.avif",
                        text: "Visit our store"
                    }
                }
            ]
        }
    },
    "Diamond Rings" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: true,
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            // "cd-1": [
            //   {
            //     type: "image_only",
            //     data: {
            //         image: "/assets/images/bracelet.avif"
            //     }
            // }
            // ],
            "ce-1": [
                {
                    type: "image_with_button",
                    data: {
                        image: "/assets/images/dummy_navbar_image.avif",
                        text: "Visit our store"
                    }
                }
            ]
        }
    },
    "Earrings" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: true,
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            // "cd-1": [
            //   {
            //     type: "image_only",
            //     data: {
            //         image: "/assets/images/bracelet.avif"
            //     }
            // }
            // ],
            "ce-1": [
                {
                    type: "image_with_button",
                    data: {
                        image: "/assets/images/dummy_navbar_image.avif",
                        text: "Visit our store"
                    }
                }
            ]
        }
    },
    "Necklaces" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: true,
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            // "cd-1": [
            //   {
            //     type: "image_only",
            //     data: {
            //         image: "/assets/images/bracelet.avif"
            //     }
            // }
            // ],
            "ce-1": [
                {
                    type: "image_with_button",
                    data: {
                        image: "/assets/images/dummy_navbar_image.avif",
                        text: "Visit our store"
                    }
                }
            ]
        }
    },
    "Bracelets" : {
        totalCols: 5,
        leftBorderFromIndex: 2,
        lastColDoubleSpace: true,
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],
            // "cd-1": [
            //   {
            //     type: "image_only",
            //     data: {
            //         image: "/assets/images/bracelet.avif"
            //     }
            // }
            // ],
            "ce-1": [
                {
                    type: "image_with_button",
                    data: {
                        image: "/assets/images/dummy_navbar_image.avif",
                        text: "Visit our store"
                    }
                }
            ]
        }
    },
    "QuickShip" : {
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: ""},
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
                            {name: "Start With A Diamond", image: "/assets/images/diamond.avif", link: "/"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Halo Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Side Stone Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Trilogy Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Illusion Set Rings"},
                            {link: "/", image: "/assets/images/diamond.avif", name: "Cluster Rings"},
                        ]
                    }
                },
                {
                    type: "button",
                    data: {
                        text: "Engagement Rings Sale",
                        theme: "theme_button_navbar"
                    }
                }
            ],
            "cb-1": [
            {
                type: "links_with_image",
                data: {
                    links: [
                    {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                    ]
                }
            },{
            type: "break"
            }, {
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            },{
            type: "button",
            data: {
                text: "Engagement Rings Sale",
                theme: "theme_button_navbar"
            }
            }
    
            ],
            "cc-1": [
            {
                type: "heading",
                data: {
                    text: "Shop By Style"
                }
            },{
            type: "links_with_image",
            data: {
                links: [
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                ]
            }
            }
    
            ],

            "cd-1": [
                {
                    type: "links_with_image",
                    data: {
                        links: [
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        {link: "/", image: "/assets/images/diamond.avif", name: "Classic Solitaire"},
                        ]
                    }
                    }
            ],
            "ce-1": [
              {
                type: "image_only",
                data: {
                    image: "/assets/images/bracelet.avif"
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
                            {name: "Link 1", link: "/"},
                            {name: "Link 2", link: "/"},
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
                            {name: "Link 1", link: "/"},
                            {name: "Link 2", link: "/"},
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
                            {name: "Link 1", link: "/"},
                            {name: "Link 2", link: "/"},
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
                            {name: "Buying Guide", link: "/"},
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
                            {name: "Necklace Buying Guide", link: "/"},
                            {name: "Pendant Buying Guide", link: "/"},
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
                            {name: "Bracelets 1", link: "/"},
                            {name: "Bracelets 2", link: "/"},
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
                {link: "/", name: "Classic Solitaire"},
                {link: "/", name: "Classic Solitaire"},
                {link: "/", name: "Classic Solitaire"},
                {link: "/", name: "Classic Solitaire"},
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
                        {link: "/", name: "Education 1"},
                        {link: "/", name: "Education 2"},
                        {link: "/", name: "Education 3"},
                        {link: "/", name: "Education 4"},
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
                        {link: "/", name: "Other Trends 1"},
                        {link: "/", name: "Other Trends 2"},
                        {link: "/", name: "Other Trends 3"},
                        ]
                    }
                },
            ]
        }
    },
}

