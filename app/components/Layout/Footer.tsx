import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import {Image} from '@shopify/hydrogen';

import type {FooterQuery} from 'storefrontapi.generated';
import {
  FOOTER_SECTIONS,
  CUSTOMER_SERVICE_LINKS,
  SOCIAL_MEDIA_LINKS,
  FOOTER_LINKS,
  type FooterSection,
  type FooterLink,
  type CustomerServiceLink,
  type SocialMediaLink,
  type FooterLinkItem,
} from './Data/layout.data';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
}

export function Footer({
  footer: footerPromise,
}: Readonly<FooterProps>) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <FooterMenu />
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

// Footer menu data structure types are now imported from layout.data.ts

function FooterMenu() {
  return (
    <nav className="footer-menu bg-[#f4f4f4]" role="navigation">
      {/* Footer Top Section - Newsletter */}
      <div className="px-10 items-center grid lg:grid-cols-3 grid-cols-1 gap-6 border-b border-t border-[#dee2e6] pb-6 pt-6">
        {/* Heading */}
        <div className="lg:col-span-1 col-span-1 text-center md:text-left">
          <h2 className="text-h2 font-bold text-primary capitalize">
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
                className="p-3 rounded-[24px] !border-[2px] border-[#111111] bg-white text-primary placeholder:text-gray-400 focus:outline-none focus:ring-[#111111] text-[12px] font-regular flex-1"
              />
              <input
                type="email"
                placeholder="Your email *"
                required
                className="p-3 !focus:shadow-none rounded-[24px] !border-[2px]  border-[#111111] bg-white text-primary placeholder:text-gray-400 focus:outline-none focus:ring-[#111111] text-[12px] flex-1"
              />
              <button type="submit" className="btn-black">
                Subscribe
              </button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="text-secondary text-p-10">
            By subscribing, some personal data such as your name and email
            address are collected and stored securely for the purposes of
            sending you order updates, special offers, and other promotional
            materials. For further information on how we manage your data,
            please see our{' '}
            <a
              href="/privacy-policy"
              className="underline font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Privacy Notice
            </a>
          </p>
        </div>
      </div>

      <div className="px-4 lg:py-4 py-6">
        <div className="flex mb-12">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 lg:grid-cols-5 m-0">
              {FOOTER_SECTIONS.map((section: FooterSection, index: number) => (
                <div key={section.id} className="col-span-1 px-4 mb-6">
                  <h4 className="text-p-14 capitalize font-bold text-primary  lg:my-4 my-2 tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="list-none p-0 m-0">
                    {section.links.map((link: FooterLink, linkIndex: number) => (
                      <li key={`${link.label}-${linkIndex}`} className="py-0.5">
                        <Link
                          to={link.href}
                          className="lg:text-secondary text-primary lg:text-p-13 text-p-14 tracking-[0.5px]"
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
            {CUSTOMER_SERVICE_LINKS.map((link: CustomerServiceLink, linkIndex: number) => (
              <Link
                key={`${link.label}-${linkIndex}`}
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
              {SOCIAL_MEDIA_LINKS.map((link: SocialMediaLink) => (
                <Link
                  key={link.id}
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
            <div className="flex flex-wrap justify-center items-center text-p-13 mb-2">
              {FOOTER_LINKS.map((link: FooterLinkItem, index: number) => (
                <span key={link.id}>
                  <Link
                    to={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline lg:text-primary lg:text-p-14 text-p-16 text-quaternary lg:font-regular font-medium"
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
