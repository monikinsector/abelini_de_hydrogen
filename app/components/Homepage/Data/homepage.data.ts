/**
 * Type definitions for homepage data structures
 */


/**
 * home page category section data
 */

export interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Engagement Rings',
    image: '/assets/images/home/rings_300x300.webp',
    link: '/engagement-rings'
  },
  {
    id: 2,
    name: 'Wedding Rings',
    image: '/assets/images/home/wedding_300x300.webp',
    link: '/wedding-rings'
  },
  {
    id: 3,
    name: 'Eternity Rings',
    image: '/assets/images/home/eternity-300x300.webp',
    link: '/diamond-rings/eternity-rings'
  },
  {
    id: 4,
    name: 'Necklace',
    image: '/assets/images/home/pendants.webp',
    link: '/pendants'
  },
  {
    id: 5,
    name: 'Earrings',
    image: '/assets/images/home/earrings.webp',
    link: '/earrings'
  },
  {
    id: 6,
    name: 'Bracelets',
    image: '/assets/images/home/bracelets.webp',
    link: '/bracelets'
  }
];


/**
 * home page our stores section data
 */


export interface StoreLocation {
  id: number;
  image: string;
  address: string;
  country: string;
  link: string;
  isLaunched: boolean;
}

export const storeLocations: StoreLocation[] = [
  {
    id: 1,
    image: "/assets/images/uk.png",
    address: "Abelini Ltd,14 St Cross Street,Hatton Garden, London, EC1N 8UN",
    country: "United Kingdom",
    link: "/",
    isLaunched: true
  },
  {
    id: 2,
    image: "/assets/images/australia.png",
    address: "Abelini Pty Ltd Suite 804,365 Little Collins Street,Melbourne,VIC 3000",
    country: "Australia",
    link: "/",
    isLaunched: true
  },
  {
    id: 3,
    image: "/assets/images/germany.png",
    address: "Coming soon",
    country: "Germany",
    link: "/",
    isLaunched: false
  },
]


/**
 * home page spotlight section data
 */

export interface SpotlightLogo {
  id: number;
  name: string;
  image: string;
}

export const spotlightLogos: SpotlightLogo[] = [
  {
    id: 1,
    name: 'Sun Newspaper',
    image: '/assets/images/home/spotlight/sun_newspaper.svg'
  },
  {
    id: 2,
    name: 'Daily Express',
    image: '/assets/images/home/spotlight/daily_express.svg'
  },
  {
    id: 3,
    name: 'Marie Claire',
    image: '/assets/images/home/spotlight/marie_claire.svg'
  },
  {
    id: 4,
    name: 'Hatched',
    image: '/assets/images/home/spotlight/hatched.svg'
  },
  {
    id: 5,
    name: 'Mirror',
    image: '/assets/images/home/spotlight/mirrorlogo.svg'
  },
];


/**
 * home page usp section data
 */

export interface UspItem {
  id: number;
  target: string;
  src: string;
  alt: string;
  label: string;
}


export const uspItems: UspItem[] = [
  {
    id: 1,
    target: '#free_resizing',
    src: 'resize.svg',
    alt: 'Abelini Free Resizing',
    label: 'Free Resizing'
  },
  {
    id: 2,
    target: '#information',
    src: 'free_delivery.svg',
    alt: 'Abelini Free Delivery',
    label: 'Free Delivery'
  },
  {
    id: 3,
    target: '#sixty_day_return',
    src: 'return.svg',
    alt: 'Abelini 60-Day Risk-Free Returns',
    label: '60-Day Risk-Free Returns'
  },
  {
    id: 4,
    target: '#diamond_certificate',
    src: 'certificate.svg',
    alt: 'Abelini Diamond & Valuation Certificate',
    label: 'Diamond & Valuation Certificate'
  },
  {
    id: 5,
    target: '#attractive_packing',
    src: 'gifts.svg',
    alt: 'Abelini Attractive Packaging',
    label: 'Attractive Packaging'
  },
  {
    id: 6,
    target: '#life_time_warranty',
    src: 'warranty.svg',
    alt: 'Abelini Lifetime Warranty',
    label: 'Lifetime Warranty'
  }
];


/**
 * home page why abelini section data
 */


export interface SupportIcons {
  id: number;
  name: string;
  image: string;
}

export const supportIcons: SupportIcons[] = [
  {
    id: 1,
    name: 'Assay Office London',
    image: '/assets/images/why_abelini/assay_office_london_logo_230x90.webp',
  },
  {
    id: 2,
    name: 'Assay Assured',
    image: '/assets/images/why_abelini/assay_assured_230x90.webp',
  },
  {
    id: 3,
    name: 'Stop Blood Diamonds',
    image: '/assets/images/why_abelini/stop_blood_icon_230x90.webp',
  },
  {
    id: 4,
    name: 'The National Association of Jewellers',
    image: '/assets/images/why_abelini/the_national_icon_230x90.webp',
  },
  {
    id: 5,
    name: 'GIA',
    image: '/assets/images/why_abelini/gia_logo_230x90.webp',
  },
];




/**
 * home page abelini occasion section data
 */

export interface EngagementRings {
  id: number;
  name: string;
  href: string;
  img: string;
}

export const engagementRings: EngagementRings[] = [
  {
    id: 1,
    name: 'Solitaire',
    href: 'engagement-rings/classic-solitaire',
    img: '/assets/images/home/category/solitaire_320x300.webp',
  },
  {
    id: 2,
    name: 'Side Stone',
    href: 'engagement-rings/side-stone-shoulder-set-rings',
    img: '/assets/images/home/category/side_stone_320x300.webp',
  },
  {
    id: 3,
    name: 'Halo',
    href: 'engagement-rings/halo-rings',
    img: '/assets/images/home/category/halo_320x300.webp',
  },
  {
    id: 4,
    name: 'Trilogy',
    href: 'engagement-rings/three-stone',
    img: '/assets/images/home/category/trilogy_320x300.webp',
  },
  {
    id: 5,
    name: 'Vintage',
    href: 'engagement-rings/vintage-engagement-rings',
    img: '/assets/images/home/category/vintage_320x300.webp',
  },
  {
    id: 6,
    name: 'Ruby',
    href: 'engagement-rings/ruby',
    img: '/assets/images/home/category/ruby_320x300.webp',
  },
  {
    id: 7,
    name: 'Emerald',
    href: 'engagement-rings/emeralds',
    img: '/assets/images/home/category/emerald_320x300.webp',
  },
  {
    id: 8,
    name: 'Oval',
    href: 'engagement-rings/oval',
    img: '/assets/images/home/category/oval_320x300.jpeg',
  },
  {
    id: 9,
    name: 'Blue Sapphire',
    href: 'engagement-rings/blue-sapphire',
    img: '/assets/images/home/category/blue_sapphire_320x300.webp',
  },
];


/**
 * home page lab grown diamonds section data
 */

export interface LabGrownDiamonds {
  id: number;
  name: string;
  href: string;
  img: string;
}
export const labGrownDiamonds: LabGrownDiamonds[] = [
  {
    id: 1,
    name: 'Engagement Rings',
    href: 'engagement-rings/lab-grown-diamond',
    img: '/assets/images/home/category/solitaire_320x300.webp',
  },
  {
    id: 2,
    name: 'Eternity Rings',
    href: 'diamond-rings/eternity-rings/lab-grown-diamond',
    img: '/assets/images/home/category/eternity_product.webp',
  },
  {
    id: 3,
    name: 'Pendant',
    href: 'pendants/lab-grown-diamond',
    img: '/assets/images/home/category/pendant.webp',
  },
  {
    id: 4,
    name: 'Earrings',
    href: 'earrings/lab-grown-diamond',
    img: '/assets/images/home/category/earring.webp',
  },
  {
    id: 5,
    name: 'Bracelets',
    href: 'bracelets/lab-grown-diamond',
    img: '/assets/images/home/category/bracelet.webp',
  },
];


/**
 * home page bespoke section data
 */

export interface BespokeImage {
  id: number;
  image: string;
  mobileImage: string;
}
export const bespokeImages: BespokeImage[] = [
  {
    id: 1,
    image: '/assets/images/bespoke_image_1272x350.webp',
    mobileImage: '/assets/images/mobile/home/bespoke_image_mobile_325x603.webp',
  },
];