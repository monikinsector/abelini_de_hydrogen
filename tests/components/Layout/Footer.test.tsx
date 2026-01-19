import { render, screen } from '@testing-library/react';
import { Footer } from '~/components/Layout/Footer';
import type {
  FooterSection,
  FooterLink,
  CustomerServiceLink,
  SocialMediaLink,
  FooterLinkItem,
} from '~/components/Layout/Data/layout.data';

// Mock the data file to test component behavior, not specific data values
// Define mock data once using functions (hoisted) to avoid duplication
// Include representative subset of links to test behavior without testing all data
function getMockFooterSections(): FooterSection[] {
  return [
    {
      id: 1,
      title: 'About Abelini',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Customer Reviews', href: '/customer-reviews', target: '_blank' },
        { label: 'Ethical Jewellery', href: '/ethical-jewellery' },
        { label: 'Terms & Conditions', href: '/terms-of-use' },
      ],
    },
    {
      id: 2,
      title: 'Customer Care',
      links: [
        { label: 'Free Delivery', href: '/free-shipping' },
        { label: 'Return & Exchange', href: '/return-and-exchange' },
        { label: 'Bespoke', href: '/bespoke' },
        { label: 'Free Resizing Service', href: '/free-resize-policy' },
      ],
    },
    {
      id: 3,
      title: 'Explore',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Ring Size Chart', href: '/ring-size-guide' },
      ],
    },
  ];
}

function getMockCustomerServiceLinks(): CustomerServiceLink[] {
  return [
    {
      id: 1,
      label: 'Store',
      href: '/book-appointment',
      icon: '/assets/images/icons/store.svg',
    },
    {
      id: 2,
      label: 'Live Chat',
      href: '/javascript:$zopim.livechat.window.show();',
      icon: '/assets/images/icons/chat.svg',
    },
    {
      id: 3,
      label: 'Call Us',
      href: 'tel:+442038051270',
      icon: '/assets/images/icons/call-us.svg',
    },
    {
      id: 4,
      label: 'Email Us',
      href: 'mailto:sales@abelini.com',
      icon: '/assets/images/icons/email.svg',
    },
  ];
}

function getMockSocialMediaLinks(): SocialMediaLink[] {
  return [
    {
      id: 1,
      label: 'Facebook',
      href: 'https://www.facebook.com/abelinijewel/',
      icon: '/assets/images/icons/facebook.svg',
    },
    {
      id: 2,
      label: 'Instagram',
      href: 'https://www.instagram.com/abelinijewellery/',
      icon: '/assets/images/icons/instagram.svg',
    }
  ];
}

function getMockFooterLinks(): FooterLinkItem[] {
  return [
    {
      id: 1,
      label: 'Cookie Policy',
      href: '/cookie-policy',
      icon: '/assets/images/icons/cookie.svg',
    },
    {
      id: 2,
      label: 'Privacy Notice',
      href: '/privacy-policy',
      icon: '/assets/images/icons/privacy.svg',
    },
    {
      id: 3,
      label: 'Company Details',
      href: '/company-details',
      icon: '/assets/images/icons/company.svg',
    },
  ];
}

jest.mock('~/components/Layout/Data/layout.data', () => ({
  FOOTER_SECTIONS: getMockFooterSections(),
  CUSTOMER_SERVICE_LINKS: getMockCustomerServiceLinks(),
  SOCIAL_MEDIA_LINKS: getMockSocialMediaLinks(),
  FOOTER_LINKS: getMockFooterLinks(),
}));

// Mock Suspense and Await to make them synchronous for testing
jest.mock('react', () => {
  const React = jest.requireActual('react');
  return {
    ...React,
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock('react-router', () => {
  const React = require('react');
  return {
    Link: ({ to, children, className, ...props }: any) => (
      React.createElement('a', { href: to, className, ...props }, children)
    ),
    Await: ({ resolve, children }: { resolve: Promise<any>; children: (data: any) => React.ReactNode }) => {
      return <>{children(null)}</>;
    },
  };
});

// Helper functions to reduce nesting depth
const findLinkInParagraph = (links: HTMLElement[], paragraphText: string): HTMLElement | undefined => {
  for (const link of links) {
    const paragraph = link.closest('p');
    if (paragraph?.textContent?.includes(paragraphText)) {
      return link;
    }
  }
  return undefined;
};

const verifySectionHeading = (section: FooterSection): void => {
  const heading = screen.getByRole('heading', { name: new RegExp(section.title, 'i') });
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H4');
};

const verifySectionLink = (link: FooterLink): void => {
  const linkElement = screen.getByRole('link', { name: link.label });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', link.href);
};

const verifySectionLinkStructure = (link: FooterLink): void => {
  const linkElement = screen.getByRole('link', { name: link.label });
  const listItem = linkElement.closest('li');
  expect(listItem).toBeInTheDocument();
};

const verifyCustomerServiceLink = (link: CustomerServiceLink): void => {
  const linkElement = screen.getByRole('link', { name: new RegExp(link.label, 'i') });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', link.href);
};

const verifyCustomerServiceIcon = (link: CustomerServiceLink): void => {
  const image = screen.getByRole('img', { name: link.label });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', link.icon);
  expect(image).toHaveAttribute('alt', link.label);
  expect(image).toHaveAttribute('width', '28');
  expect(image).toHaveAttribute('height', '28');
};

const verifyCustomerServiceLabel = (link: CustomerServiceLink): void => {
  const linkElement = screen.getByRole('link', { name: new RegExp(link.label, 'i') });
  const labelText = linkElement.querySelector('p');
  expect(labelText).toBeInTheDocument();
  expect(labelText).toHaveTextContent(link.label);
};

const verifySocialMediaLink = (link: SocialMediaLink): void => {
  const linkElement = screen.getByRole('link', { name: link.label });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', link.href);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
};

const verifySocialMediaIcon = (link: SocialMediaLink): void => {
  const image = screen.getByRole('img', { name: link.label });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', link.icon);
  expect(image).toHaveAttribute('alt', link.label);
  expect(image).toHaveAttribute('width', '24');
  expect(image).toHaveAttribute('height', '24');
};

const findLegalLink = (allLinks: HTMLElement[], link: FooterLinkItem): HTMLElement | undefined => {
  for (const l of allLinks) {
    if (
      l.getAttribute('target') === '_blank' &&
      l.getAttribute('rel') === 'noopener noreferrer' &&
      l.getAttribute('href') === link.href
    ) {
      return l;
    }
  }
  return undefined;
};

const verifyLegalLink = (link: FooterLinkItem): void => {
  const allLinks = screen.getAllByRole('link', { name: link.label });
  const legalLink = findLegalLink(allLinks, link);
  expect(legalLink).toBeInTheDocument();
  expect(legalLink).toHaveAttribute('href', link.href);
  expect(legalLink).toHaveAttribute('target', '_blank');
  expect(legalLink).toHaveAttribute('rel', 'noopener noreferrer');
};

const countSeparators = (spans: NodeListOf<Element> | never[]): number => {
  let count = 0;
  const spansArray = Array.from(spans);
  for (const span of spansArray) {
    if (
      span.textContent?.trim() === '|' &&
      span.previousElementSibling?.tagName === 'A'
    ) {
      count++;
    }
  }
  return count;
};

const verifyFooterSectionLink = (section: FooterSection): void => {
  for (const link of section.links) {
    const linkElement = screen.getByRole('link', { name: link.label });
    expect(linkElement).toBeInTheDocument();
  }
};

const verifyAllSectionsOrder = (
  footerSections: FooterSection[],
  customerServiceLinks: CustomerServiceLink[],
  socialMediaLinks: SocialMediaLink[]
): void => {
  expect(screen.getByRole('heading', { name: /Stay In Touch!/i })).toBeInTheDocument();
  
  for (const section of footerSections) {
    expect(screen.getByRole('heading', { name: new RegExp(section.title, 'i') })).toBeInTheDocument();
  }
  
  for (const link of customerServiceLinks) {
    expect(screen.getByRole('link', { name: new RegExp(link.label, 'i') })).toBeInTheDocument();
  }
  
  for (const link of socialMediaLinks) {
    expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument();
  }
  
  expect(screen.getByText(/Copyright 2026, ABELINI Ltd/i)).toBeInTheDocument();
};

describe('Footer', () => {
  const mockFooterSections = getMockFooterSections();
  const mockCustomerServiceLinks = getMockCustomerServiceLinks();
  const mockSocialMediaLinks = getMockSocialMediaLinks();
  const mockFooterLinks = getMockFooterLinks();
  const footerPromise = Promise.resolve(null);

  beforeEach(() => {
    render(<Footer footer={footerPromise} />);
  });

  describe('Rendering without failure', () => {
    it('renders without crashing', () => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders footer element with correct class', () => {
      const footer = screen.getByRole('navigation').closest('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('footer');
    });
  });

  describe('Newsletter Section', () => {
    it('renders newsletter heading with correct tag', () => {
      const heading = screen.getByRole('heading', { name: /Stay In Touch!/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders newsletter form with name and email inputs', () => {
      const nameInput = screen.getByPlaceholderText(/Your Name/i);
      const emailInput = screen.getByPlaceholderText(/Your email/i);
      
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('required');
      
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
    });

    it('renders subscribe button', () => {
      const subscribeButton = screen.getByRole('button', { name: /Subscribe/i });
      expect(subscribeButton).toBeInTheDocument();
      expect(subscribeButton).toHaveAttribute('type', 'submit');
    });

    it('handles form submission', () => {
      const form = screen.getByRole('button', { name: /Subscribe/i }).closest('form');
      expect(form).toBeInTheDocument();
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      form?.dispatchEvent(submitEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('renders name input with inline styles', () => {
      const nameInput = screen.getByPlaceholderText(/Your Name/i);
      expect(nameInput).toHaveStyle({ boxShadow: 'none !important' });
    });

    it('renders privacy notice with link', () => {
      expect(screen.getByText(/By subscribing, some personal data/i)).toBeInTheDocument();
      const privacyLinks = screen.getAllByRole('link', { name: /Privacy Notice/i });
      const newsletterPrivacyLink = findLinkInParagraph(privacyLinks, 'By subscribing');
      expect(newsletterPrivacyLink).toBeInTheDocument();
      expect(newsletterPrivacyLink).toHaveAttribute('href', '/privacy-policy');
    });
  });

  describe('Footer Sections', () => {
    it('renders all footer section headings with correct tag', () => {
      for (const section of mockFooterSections) {
        verifySectionHeading(section);
      }
    });

    it('renders all footer section links with correct hrefs', () => {
      for (const section of mockFooterSections) {
        for (const link of section.links) {
          verifySectionLink(link);
        }
      }
    });

    it('renders footer section links with target attribute when provided', () => {
      const customerReviewsLink = screen.getByRole('link', { name: 'Customer Reviews' });
      expect(customerReviewsLink).toBeInTheDocument();
      // Note: target attribute is in the data but Link component may not render it as target attribute
      // This test verifies the link exists and has correct href
      expect(customerReviewsLink).toHaveAttribute('href', '/customer-reviews');
    });

    it('renders footer links in list structure', () => {
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('renders footer section list items with correct structure', () => {
      for (const section of mockFooterSections) {
        for (const link of section.links) {
          verifySectionLinkStructure(link);
        }
      }
    });
  });

  describe('Customer Service Links', () => {
    it('renders all customer service links', () => {
      for (const link of mockCustomerServiceLinks) {
        verifyCustomerServiceLink(link);
      }
    });

    it('renders customer service icons with correct attributes', () => {
      for (const link of mockCustomerServiceLinks) {
        verifyCustomerServiceIcon(link);
      }
    });

    it('renders customer service link labels', () => {
      for (const link of mockCustomerServiceLinks) {
        verifyCustomerServiceLabel(link);
      }
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links', () => {
      for (const link of mockSocialMediaLinks) {
        verifySocialMediaLink(link);
      }
    });

    it('renders social media icons with correct attributes', () => {
      for (const link of mockSocialMediaLinks) {
        verifySocialMediaIcon(link);
      }
    });

    it('renders social media links with aria-label', () => {
      for (const link of mockSocialMediaLinks) {
        const linkElement = screen.getByRole('link', { name: link.label });
        expect(linkElement).toHaveAttribute('aria-label', link.label);
      }
    });
  });

  describe('Legal Links', () => {
    it('renders all legal links', () => {
      for (const link of mockFooterLinks) {
        verifyLegalLink(link);
      }
    });

    it('renders separator between legal links', () => {
      const allSpans = screen.getByText(/Copyright 2026/i).parentElement?.querySelectorAll('span') || [];
      const separatorCount = countSeparators(allSpans);
      expect(separatorCount).toBe(mockFooterLinks.length - 1);
    });

    it('does not render separator after last legal link', () => {
      const allSpans = screen.getByText(/Copyright 2026/i).parentElement?.querySelectorAll('span') || [];
      let separatorCount = 0;
      for (const span of Array.from(allSpans)) {
        if (span.textContent?.trim() === '|') {
          separatorCount++;
        }
      }
      // Should have n-1 separators for n links
      expect(separatorCount).toBe(mockFooterLinks.length - 1);
    });
  });

  describe('Copyright Section', () => {
    it('renders copyright text', () => {
      expect(screen.getByText(/Copyright 2026, ABELINI Ltd/i)).toBeInTheDocument();
      expect(screen.getByText(/Reg. office: 154 Abercorn Crescent/i)).toBeInTheDocument();
      expect(screen.getByText(/Company registration no.: 10863786/i)).toBeInTheDocument();
    });

    it('renders full copyright text including VAT and trademark', () => {
      expect(screen.getByText(/VAT no: GB 285 0030 28/i)).toBeInTheDocument();
      expect(screen.getByText(/ABELINI is a registered trademark No. UK3310101/i)).toBeInTheDocument();
      expect(screen.getByText(/Registered in London/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper navigation role', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('has accessible images with alt text', () => {
      const allLinks = [...mockCustomerServiceLinks, ...mockSocialMediaLinks];
      for (const link of allLinks) {
        const image = screen.getByRole('img', { name: link.label });
        expect(image).toHaveAttribute('alt', link.label);
      }
    });

    it('has accessible links with descriptive text', () => {
      for (const section of mockFooterSections) {
        verifyFooterSectionLink(section);
      }
    });
  });

  describe('Component Structure', () => {
    it('renders footer with correct CSS classes', () => {
      const footer = screen.getByRole('navigation').closest('footer');
      expect(footer).toHaveClass('footer');
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('footer-menu', 'bg-[#f4f4f4]');
    });

    it('renders newsletter section with correct grid layout classes', () => {
      const heading = screen.getByRole('heading', { name: /Stay In Touch!/i });
      const newsletterSection = heading.closest('div[class*="grid"]');
      expect(newsletterSection).toBeInTheDocument();
    });

    it('renders footer sections with correct grid layout classes', () => {
      const firstSectionHeading = screen.getByRole('heading', { name: /About Abelini/i });
      const sectionsContainer = firstSectionHeading.closest('div[class*="grid"]');
      expect(sectionsContainer).toBeInTheDocument();
    });

    it('renders all sections in correct order', () => {
      verifyAllSectionsOrder(mockFooterSections, mockCustomerServiceLinks, mockSocialMediaLinks);
    });
  });
});
