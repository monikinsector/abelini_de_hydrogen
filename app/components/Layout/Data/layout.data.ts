// Type definitions for footer data structures
export interface FooterLink {
  label: string;
  href: string;
  target?: '_blank' | '_self';
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialMediaLink {
  label: string;
  href: string;
  icon: string;
}

export interface CustomerServiceLink {
  label: string;
  href: string;
  icon: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  icon: string;
}

// Footer sections data
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'About Abelini',
    links: [
      {label: 'About Us', href: '/about-us'},
      {label: 'Customer Reviews', href: '/customer-reviews', target: '_blank'},
      {label: 'Ethical Jewellery', href: '/ethical-jewellery'},
      {label: 'Fair Price Guarantee', href: '/fair-price-guarantee'},
      {label: 'Virtual Try', href: '/virtual-try'},
      {label: 'Terms & Conditions', href: '/terms-of-use'},
    ],
  },
  {
    title: 'Customer Care',
    links: [
      {label: 'Free Delivery', href: '/free-shipping'},
      {label: 'Return & Exchange', href: '/return-and-exchange'},
      {label: 'Warranty & Care', href: '/warranty-and-care'},
      {label: 'Jewellery Insurance', href: '/jewellery-insurance'},
      {label: 'Bespoke', href: '/bespoke'},
      {label: 'Sample Services', href: '/home-trial'},
      {label: '0% Interest Finance', href: '/finance'},
      {label: 'Free Resizing Service', href: '/free-resize-policy'},
    ],
  },
  {
    title: 'Explore',
    links: [
      {label: 'Blog', href: '/blog'},
      {label: 'Customer Stories', href: '/customer-story'},
      {label: 'Birthstone By Month', href: '/birthstone-jewellery'},
      {label: 'Jewellery Gift Finder', href: '/jewellery-gift-finder'},
      {label: 'Hallmarking', href: '/hallmarking'},
      {label: 'Jewellery Care', href: '/jewellery-care'},
      {label: 'Ring Size Chart', href: '/ring-size-guide'},
      {label: 'Bracelet Size Guide', href: '/bracelet-size-guide'},
    ],
  },
  {
    title: 'Guides',
    links: [
      {label: 'Engagement Ring Guide', href: '/blog/engagement-rings-buying-guide'},
      {label: 'Earrings Guide', href: '/blog/ultimate-guide-on-how-to-buy-diamond-earrings'},
      {label: 'Wedding Rings Guide', href: '/blog/ultimate-guide-on-how-to-buy-wedding-ring'},
      {label: 'Diamond Ring Guide', href: '/blog/diamond-ring-buying-guide'},
      {label: 'Diamond Guide', href: '/diamond-education'},
      {label: 'Metal Guide', href: '/metal-guide'},
      {label: 'Bracelet Guide', href: '/blog/ultimate-guide-on-how-to-buy-a-bracelet'},
      {label: 'Necklace Size Guide', href: '/necklace-size-guide'},
    ],
  },
  {
    title: 'Contact Us',
    links: [
      {label: 'Customer Service', href: '/contact-us'},
      {label: '+44 (0) 2038051270', href: 'tel:+442038051270'},
      {label: 'sales@abelini.com', href: 'mailto:sales@abelini.com'},
      {label: 'Live Chat', href: '/javascript:$zopim.livechat.window.show();'},
      {label: 'Visit Our Store', href: '/book-appointment'},
      {label: "FAQ's", href: '/faq'},
    ],
  },
];

// Social media links data
export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/abelinijewel/',
    icon: '/assets/images/icons/facebook.svg',
  },
  {
    label: 'Pinterest',
    href: 'https://uk.pinterest.com/abelinijewellery/',
    icon: '/assets/images/icons/pinterest.svg',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/abelinijewellery/',
    icon: '/assets/images/icons/instagram.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCdfnfdsPrWJF6wJJu7d13qA',
    icon: '/assets/images/icons/youtube.svg',
  },
];

// Customer service links data
export const CUSTOMER_SERVICE_LINKS: CustomerServiceLink[] = [
  {
    label: 'Store',
    href: '/book-appointment',
    icon: '/assets/images/icons/store.svg',
  },
  {
    label: 'Live Chat',
    href: '/javascript:$zopim.livechat.window.show();',
    icon: '/assets/images/icons/chat.svg',
  },
  {
    label: 'Call Us',
    href: 'tel:+442038051270',
    icon: '/assets/images/icons/call-us.svg',
  },
  {
    label: 'Email Us',
    href: 'mailto:sales@abelini.com',
    icon: '/assets/images/icons/email.svg',
  },
];

// Footer legal links data
export const FOOTER_LINKS: FooterLinkItem[] = [
  {
    label: 'Cookie Policy',
    href: '/cookie-policy',
    icon: '/assets/images/icons/cookie.svg',
  },
  {
    label: 'Privacy Notice',
    href: '/privacy-policy',
    icon: '/assets/images/icons/privacy.svg',
  },
  {
    label: 'Company Details',
    href: '/company-details',
    icon: '/assets/images/icons/company.svg',
  },
  {
    label: 'Sitemap',
    href: '/sitemap',
    icon: '/assets/images/icons/sitemap.svg',
  },
];