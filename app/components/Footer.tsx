import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import {Image} from '@shopify/hydrogen';

import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

// Footer menu data structure
interface FooterLink {
  label: string;
  href: string;
  target?: '_blank' | '_self';
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
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
      {label: 'Free Delivery', href: '/free-delivery'},
      {label: 'Return & Exchange', href: '/return-exchange'},
      {label: 'Warranty & Care', href: '/warranty-care'},
      {label: 'Jewellery Insurance', href: '/jewellery-insurance'},
      {label: 'Bespoke', href: '/bespoke'},
      {label: 'Sample Services', href: '/sample-services'},
      {label: '0% Interest Finance', href: '/finance'},
      {label: 'Free Resizing Service', href: '/free-resizing'},
    ],
  },
  {
    title: 'Explore',
    links: [
      {label: 'Blog', href: '/blog'},
      {label: 'Customer Stories', href: '/customer-stories'},
      {label: 'Birthstone By Month', href: '/birthstone-by-month'},
      {label: 'Jewellery Gift Finder', href: '/jewellery-gift-finder'},
      {label: 'Hallmarking', href: '/hallmarking'},
      {label: 'Jewellery Care', href: '/jewellery-care'},
      {label: 'Ring Size Chart', href: '/ring-size-chart'},
      {label: 'Bracelet Size Guide', href: '/bracelet-size-guide'},
    ],
  },
  {
    title: 'Guides',
    links: [
      {label: 'Engagement Ring Guide', href: '/engagement-ring-guide'},
      {label: 'Earrings Guide', href: '/earrings-guide'},
      {label: 'Wedding Rings Guide', href: '/wedding-rings-guide'},
      {label: 'Diamond Ring Guide', href: '/diamond-ring-guide'},
      {label: 'Diamond Guide', href: '/diamond-guide'},
      {label: 'Metal Guide', href: '/metal-guide'},
      {label: 'Bracelet Guide', href: '/bracelet-guide'},
      {label: 'Necklace Size Guide', href: '/necklace-size-guide'},
    ],
  },
  {
    title: 'Contact Us',
    links: [
      {label: 'Customer Service', href: '/customer-service'},
      {label: '+44 (0) 2038051270', href: 'tel:+442038051270'},
      {label: 'sales@abelini.com', href: 'mailto:sales@abelini.com'},
      {label: 'Live Chat', href: '/live-chat'},
      {label: 'Visit Our Store', href: '/visit-our-store'},
      {label: "FAQ's", href: '/faqs'},
    ],
  },
];

const SOCIAL_MEDIA_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/abelini',
    icon: '/assets/images/icons/facebook.svg',
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/abelini',
    icon: '/assets/images/icons/pinterest.svg',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/abelini',
    icon: '/assets/images/icons/instagram.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/abelini',
    icon: '/assets/images/icons/youtube.svg',
  },
];

const CUSTOMER_SERVICE_LINKS = [
  {
    label: 'Store',
    href: '/visit-our-store',
    icon: '/assets/images/icons/store.svg',
  },
  {
    label: 'Live Chat',
    href: '/live-chat',
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

const FOOTER_LINKS = [
  {
    label: 'Cookie Policy',
    href: '/policies/cookie-policy',
    icon: '/assets/images/icons/cookie.svg',
  },
  {
    label: 'Privacy Policy',
    href: '/policies/privacy-policy',
    icon: '/assets/images/icons/privacy.svg',
  },
  {
    label: 'Company Details',
    href: 'https://www.abelini.com/company-details',
    icon: '/assets/images/icons/company.svg',
  },
  {
    label: 'Sitemap',
    href: '/sitemap.xml',
    icon: '/assets/images/icons/sitemap.svg',
  },
];

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu bg-[#f4f4f4]" role="navigation">
      {/* Footer Top Section - Newsletter */}
      <div className="px-10 items-center grid lg:grid-cols-3 grid-cols-1 gap-6 border-b border-t border-[#dee2e6] pb-6 pt-6">
        {/* Heading */}
        <div className="lg:col-span-1 col-span-1 text-center md:text-left">
          <h2 className="text-h2 font-bold text-[#111111] capitalize">
            Stay In Touch!
          </h2>
        </div>

        {/* Newsletter Form */}
        <div className="lg:col-span-2 col-span-1 flex flex-col gap-4">
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission here
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6">
              <input
                type="text"
                placeholder="Your Name *"
                required
                style={{
                  boxShadow: 'none !important',
                }}
                className="p-3 rounded-[24px] !border-[2px] border-[#111111] bg-white text-[#111111] placeholder:text-gray-400 focus:outline-none focus:ring-[#111111] text-[12px] font-regular flex-1"
              />
              <input
                type="email"
                placeholder="Your email *"
                required
                className="p-3 !focus:shadow-none rounded-[24px] !border-[2px]  border-[#111111] bg-white text-[#111111] placeholder:text-gray-400 focus:outline-none focus:ring-[#111111] text-[12px] flex-1"
              />
              <button type="submit" className="btn-black">
                Subscribe
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="text-[#626262] text-[11px]">
            By subscribing, some personal data such as your name and email
            address are collected and stored securely for the purposes of
            sending you order updates, special offers, and other promotional
            materials. For further information on how we manage your data,
            please see our{' '}
            <a
              href="/policies/privacy-policy"
              className="underline font-medium text-[#111111] hover:opacity-70 transition-opacity"
            >
              Privacy Notice
            </a>
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex mb-12">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 lg:grid-cols-5 m-0 gap-4">
              {FOOTER_SECTIONS.map((section, index) => (
                <div key={index} className="col-span-1 px-4">
                  <h4 className="text-p-14 capitalize font-bold text-[#111111]  my-4 tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="list-none p-0 m-0">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="py-0.5">
                        <Link
                          to={link.href}
                          className="text-[#626262] text-p-13 tracking-[0.5px]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Contact Support Section */}
        <div className="border-t border-b border-[#111111] py-6 mb-4">
          <div className="flex justify-center items-center lg:gap-24 gap-8">
            {CUSTOMER_SERVICE_LINKS.map((link) => (
              <Link
                to={link.href}
                className="flex flex-col items-center gap-2 text-black hover:opacity-70 transition-opacity no-underline"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <p className="text-p-13 leading-p-13 capitalize m-0 text-secondary tracking-[0.5px] font-regular">
                  {link.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Bottom Section - Social Media, Legal Links, Copyright */}
        <div className="pt-4 pb-0">
          <div className="flex flex-col items-center">
            {/* Social Media Icons */}
            <div className="flex justify-center items-center gap-x-8 mb-8 mt-2">
              {SOCIAL_MEDIA_LINKS.map((link) => (
                <Link
                  to={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-70 transition-opacity"
                  aria-label={link.label}
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center items-center text-[#626262] text-p-13 mb-2">
              {FOOTER_LINKS.map((link, index) => (
                <span key={index}>
                  <Link
                    to={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#111111] text-p-14"
                  >
                    {link.label}
                  </Link>
                  {index < FOOTER_LINKS.length - 1 && (
                    <span className="text-primary mx-1">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-secondary text-p-10 leading-p-10 text-center m-0 tracking-[0.5px] font-regular">
              Copyright 2026, ABELINI Ltd. All rights reserved.
              <br />
              Reg. office: 154 Abercorn Crescent, Harrow, HA20PU. Registered in
              London. Company registration no.: 10863786. VAT no: GB 285 0030
              28. ABELINI is a registered trademark No. UK3310101
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
