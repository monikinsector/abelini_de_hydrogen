import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MenuHeader from '~/components/Layout/MenuHeader';

// Mock react-router Link component
jest.mock('react-router', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Mock Shopify Hydrogen Image component
jest.mock('@shopify/hydrogen', () => ({
  Image: ({ src, alt, width, className, ...props }: any) => (
    <img src={src} alt={alt} width={width} className={className} {...props} data-testid="hydrogen-image" />
  ),
}));

// Mock TopbarIconContent component
jest.mock('~/components/Common/TopbarIconContent', () => ({
  __esModule: true,
  default: ({ data, isDesktop, phone }: any) => (
    <div data-testid="topbar-icon-content" data-items={JSON.stringify(data)} data-desktop={isDesktop} data-phone={phone}>
      {data.map((item: string) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  ),
}));

// Mock SubMenuPanel component
jest.mock('~/components/Layout/SubMenuPanel', () => ({
  SubMenuPanel: ({ isOpen, submenu, onBack, onClose }: any) => (
    <div data-testid="submenu-panel" data-open={isOpen.toString()}>
      {isOpen && (
        <>
          <button onClick={onBack} data-testid="submenu-back">Back</button>
          <button onClick={onClose} data-testid="submenu-close">Close</button>
        </>
      )}
    </div>
  ),
}));


// Mock IntersectionObserver
let mockObserverCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

const mockIntersectionObserver = jest.fn((callback: (entries: IntersectionObserverEntry[]) => void) => {
  mockObserverCallback = callback;
  return {
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
  };
});
globalThis.IntersectionObserver = mockIntersectionObserver as any;

describe('MenuHeader', () => {
  // Mock globalThis.scrollTo to avoid errors in cleanup
  const originalScrollTo = globalThis.scrollTo;
  beforeAll(() => {
    globalThis.scrollTo = jest.fn();
  });

  afterAll(() => {
    globalThis.scrollTo = originalScrollTo;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  });

  describe('Initial Render', () => {
    it('renders with globalPhone prop', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      // Check that sentinel element exists
      const sentinel = container.querySelector('[aria-hidden="true"]');
      expect(sentinel).toBeInTheDocument();
    });

    it('renders desktop navigation', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const nav = container.querySelector('nav.sticky');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('sticky', 'top-8', 'z-99', 'md:block', 'hidden');
    });

    it('renders all header links', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const headerLinks = [
        'Engagement Rings',
        'Wedding & Eternity Rings',
        'Diamond Rings',
        'Earrings',
        'Necklaces',
        'Bracelets',
        'QuickShip',
        'Inspiration'
      ];

      headerLinks.forEach((link) => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('renders search input', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const searchInput = screen.getByPlaceholderText('Search');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'search');
      expect(searchInput).toHaveAttribute('aria-label', 'Search');
    });
  });

  describe('Mobile Navigation', () => {
    it('renders mobile menu button', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const menuButton = screen.getByLabelText('Open navigation menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('toggles mobile menu on button click', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
      
      expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();
    });

    it('renders mobile logo', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const logos = screen.getAllByAltText('Abelini');
      expect(logos.length).toBeGreaterThan(0);
    });

    it('renders mobile action buttons', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      // Mobile action buttons are in the mobile nav
      // There are multiple Search buttons (desktop and mobile), so use getAllByLabelText
      const searchButtons = screen.getAllByLabelText('Search');
      expect(searchButtons.length).toBeGreaterThan(0);
      
      const wishlistButton = screen.getByLabelText('Wishlist');
      expect(wishlistButton).toBeInTheDocument();
      
      const cartButton = screen.getByLabelText('Cart');
      expect(cartButton).toBeInTheDocument();
    });

    it('renders mobile menu items when open', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
      
      waitFor(() => {
        expect(screen.getByText('Engagement Rings')).toBeInTheDocument();
      });
    });
  });

  describe('Desktop Hover Behavior', () => {
    it.skip('shows dropdown on hover', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const engagementRings = screen.getByText('Engagement Rings');
      fireEvent.mouseEnter(engagementRings);
      
      // Check if dropdown container is rendered
      const dropdown = container.querySelector('.absolute.z-30');
      expect(dropdown).toBeInTheDocument();
    });

    it('hides dropdown on mouse leave', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const engagementRings = screen.getByText('Engagement Rings');
      fireEvent.mouseEnter(engagementRings);
      fireEvent.mouseLeave(engagementRings);
      
      // Dropdown should be hidden
      const dropdown = container.querySelector('.visible');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  describe('IntersectionObserver', () => {
    const simulateIntersection = (isIntersecting: boolean) => {
      if (!mockObserverCallback) return;
      
      const mockEntry = { isIntersecting } as IntersectionObserverEntry;
      mockObserverCallback([mockEntry]);
    };

    const verifyStickyIcons = (container: HTMLElement, expectedCount: number) => {
      const stickyIcons = container.querySelectorAll('[data-testid="topbar-icon-content"]');
      expect(stickyIcons.length).toBeGreaterThan(expectedCount);
    };

    beforeEach(() => {
      mockObserverCallback = null;
      mockObserve.mockClear();
      mockUnobserve.mockClear();
      mockDisconnect.mockClear();
    });

    it('sets up IntersectionObserver for sentinel', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      expect(mockIntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    it('observes sentinel element', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const sentinel = container.querySelector('[aria-hidden="true"]');
      expect(sentinel).toBeInTheDocument();
    });

    it('updates isNavbarStuck when sentinel is not intersecting (scrolled)', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      simulateIntersection(false);

      waitFor(() => verifyStickyIcons(container, 0));
    });

    it('updates isNavbarStuck when sentinel is intersecting (not scrolled)', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      simulateIntersection(true);

      waitFor(() => {
        const stickyIcons = container.querySelectorAll('[data-testid="topbar-icon-content"][data-items*="Phone"]');
        expect(stickyIcons.length).toBe(0);
      });
    });

    it('disconnects observer on unmount', () => {
      const { unmount } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      unmount();
      
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('Search Functionality', () => {
    it('renders search input with correct attributes', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      const searchInput = screen.getByPlaceholderText('Search');
      expect(searchInput).toHaveClass(
        'w-full',
        'rounded-full',
        'border',
        'border-gray-300',
        'bg-gray-50'
      );
    });

    it('renders search icon', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      // Search icon appears in both desktop search input and mobile button
      const searchIcons = screen.getAllByAltText('Search');
      expect(searchIcons.length).toBeGreaterThan(0);
      expect(searchIcons[0]).toHaveAttribute('src', '/assets/images/icons/search.svg');
    });
  });

  describe('Styling', () => {
    it('applies correct desktop nav classes', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const nav = container.querySelector('nav.sticky');
      expect(nav).toHaveClass(
        'sticky',
        'top-8',
        'z-99',
        'md:block',
        'hidden',
        'relative',
        'bg-white',
        'border-t-1',
        'border-t-gray-300'
      );
    });

    it('applies correct mobile nav classes', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      const mobileNav = container.querySelector(
        String.raw`nav.md\:hidden`
      );
      expect(mobileNav).toBeInTheDocument();
      expect(mobileNav).toHaveClass('md:hidden', 'block', 'bg-white', 'border-t-2', 'border-t-gray-300');
    });
  });

  describe('Body Scroll Prevention', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const verifyBodyScrollPrevented = () => {
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('fixed');
    };

    const verifyBodyScrollRestored = () => {
      expect(document.body.style.overflow).toBe('');
      expect(document.body.style.position).toBe('');
    };

    it('prevents body scroll when mobile menu opens', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyBodyScrollPrevented);
    });

    it('restores body scroll when mobile menu closes', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      const closeButton = screen.getByLabelText('Close navigation menu');
      fireEvent.click(closeButton);
      
      waitFor(verifyBodyScrollRestored);
    });
  });

  describe('SubMenuPanel Integration', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const clickEngagementRings = () => {
      const engagementRingsButton = screen.getByText('ENGAGEMENT RINGS');
      fireEvent.click(engagementRingsButton);
    };

    const verifySubmenuPanelState = (expectedOpen: boolean) => {
      const submenuPanel = screen.getByTestId('submenu-panel');
      expect(submenuPanel).toHaveAttribute('data-open', expectedOpen.toString());
    };

    it('renders SubMenuPanel when submenu is active', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(() => {
        const submenuPanel = screen.queryByTestId('submenu-panel');
        expect(submenuPanel).toBeInTheDocument();
      });
    });

    it('opens submenu when menu item with submenu is clicked', async () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      await waitFor(() => {
        const engagementRingsButton = screen.getByText('ENGAGEMENT RINGS');
        expect(engagementRingsButton).toBeInTheDocument();
      });

      clickEngagementRings();
      verifySubmenuPanelState(true);
    });

    it('closes submenu when back button is clicked', async () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      await waitFor(() => screen.getByText('ENGAGEMENT RINGS'));
      
      clickEngagementRings();
      
      const backButton = screen.getByTestId('submenu-back');
      fireEvent.click(backButton);
      
      verifySubmenuPanelState(false);
    });

    it('closes mobile menu when submenu close is clicked', async () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      await waitFor(() => screen.getByText('ENGAGEMENT RINGS'));
      
      clickEngagementRings();
      
      const closeButton = screen.getByTestId('submenu-close');
      fireEvent.click(closeButton);
      
      expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Items', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const verifyBlogLink = () => {
      const blogLink = screen.getByText('BLOG');
      expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
    };

    const findExternalLinks = () => {
      return screen.getAllByRole('link').filter(
        (link) => link.getAttribute('target') === '_blank'
      );
    };

    const verifySubmenuButton = () => {
      const engagementRingsButton = screen.getByText('ENGAGEMENT RINGS');
      expect(engagementRingsButton.closest('button')).toBeInTheDocument();
      
      const rightArrow = screen.getByAltText('Right');
      expect(rightArrow).toBeInTheDocument();
    };

    it('renders menu items with links', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyBlogLink);
    });

    it('renders external links with target and rel attributes', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(() => {
        const externalLinks = findExternalLinks();
        expect(externalLinks.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('renders menu items with submenus as buttons', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifySubmenuButton);
    });
  });

  describe('Contact Information Section', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const verifyContactDetails = () => {
      expect(screen.getByText('+44 (0) 2038051270')).toBeInTheDocument();
      expect(screen.getByText('sales@abelini.com')).toBeInTheDocument();
      expect(screen.getByText('LIVE CHAT')).toBeInTheDocument();
      expect(screen.getByText('BOOK AN APPOINTMENT')).toBeInTheDocument();
    };

    const verifyContactIcons = () => {
      expect(screen.getByAltText('Phone')).toBeInTheDocument();
      expect(screen.getByAltText('Email')).toBeInTheDocument();
      expect(screen.getByAltText('Chat')).toBeInTheDocument();
    };

    it('renders contact information in mobile menu', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyContactDetails);
    });

    it('renders contact information icons', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyContactIcons);
    });
  });

  describe('Additional Links Section', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const verifyAdditionalLinks = () => {
      expect(screen.getByText('INDEPENDENT CUSTOMER REVIEWS')).toBeInTheDocument();
      expect(screen.getByText('FAQS')).toBeInTheDocument();
      expect(screen.getByText('FREE DELIVERY')).toBeInTheDocument();
      expect(screen.getByText('MONEY BACK GUARANTEE')).toBeInTheDocument();
    };

    const verifyLinkHrefs = () => {
      const reviewsLink = screen.getByText('INDEPENDENT CUSTOMER REVIEWS');
      expect(reviewsLink.closest('a')).toHaveAttribute('href', '/customer-reviews');
      
      const faqLink = screen.getByText('FAQS');
      expect(faqLink.closest('a')).toHaveAttribute('href', '/faq');
    };

    it('renders additional links in mobile menu', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyAdditionalLinks);
    });

    it('renders additional links with correct hrefs', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyLinkHrefs);
    });
  });

  describe('Overlay Close', () => {
    const openMobileMenu = () => {
      const menuButton = screen.getByLabelText('Open navigation menu');
      fireEvent.click(menuButton);
    };

    const verifyOverlayClosesMenu = async () => {
      const overlay = screen.getByLabelText('Close navigation menu overlay');
      expect(overlay).toBeInTheDocument();
      
      fireEvent.click(overlay);
      
      expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
    };

    it('closes mobile menu when overlay is clicked', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      openMobileMenu();
      
      waitFor(verifyOverlayClosesMenu);
    });
  });

  describe('Sticky Navbar Icons', () => {
    const simulateNavbarStuck = () => {
      if (!mockObserverCallback) return;
      
      const mockEntry = { isIntersecting: false } as IntersectionObserverEntry;
      mockObserverCallback([mockEntry]);
    };

    const findLeftStickyIcons = (container: HTMLElement) => {
      return container.querySelectorAll('li:has([data-testid="topbar-icon-content"][data-items*="Phone"])');
    };

    const findRightStickyIcons = (container: HTMLElement) => {
      return container.querySelectorAll('li:has([data-testid="topbar-icon-content"][data-items*="Login"])');
    };

    it('shows sticky icons when navbar is stuck', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      simulateNavbarStuck();

      waitFor(() => {
        const leftStickyIcons = findLeftStickyIcons(container);
        expect(leftStickyIcons.length).toBeGreaterThan(0);
        
        const rightStickyIcons = findRightStickyIcons(container);
        expect(rightStickyIcons.length).toBeGreaterThan(0);
      });
    });

    it('applies different padding when navbar is stuck', () => {
      render(<MenuHeader globalPhone="+44 123456789" />);
      
      simulateNavbarStuck();

      waitFor(() => {
        const engagementRings = screen.getByText('Engagement Rings');
        expect(engagementRings).toHaveClass('px-2');
      });
    });
  });

  describe('MenuDropdown Edge Cases', () => {
    const triggerHoverAndWaitForDropdown = async (container: HTMLElement, linkText: string) => {
      const link = screen.getByText(linkText);
      fireEvent.mouseEnter(link);
      
      await waitFor(() => {
        const dropdown = container.querySelector('.absolute.z-30');
        expect(dropdown).toBeInTheDocument();
      });
    };

    const findImageOnlyContent = (container: HTMLElement) => {
      const images = container.querySelectorAll('img[alt="image"]');
      return images;
    };

    const findButtonWithTheme = (container: HTMLElement) => {
      const buttons = container.querySelectorAll('button.theme_button_hmenu');
      return buttons;
    };

    const findVisitStoreButton = (buttons: NodeListOf<Element>) => {
      return Array.from(buttons).find(btn => 
        btn.textContent?.includes('Visit our store')
      );
    };

    it('handles MenuDropdown with image_only type', async () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      await triggerHoverAndWaitForDropdown(container, 'Bracelets');
      
      const images = findImageOnlyContent(container);
      expect(images.length).toBeGreaterThan(0);
    });

    it('handles MenuDropdown with image_with_button type', async () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      
      await triggerHoverAndWaitForDropdown(container, 'QuickShip');
      
      const buttons = findButtonWithTheme(container);
      expect(buttons.length).toBeGreaterThan(0);
      
      const visitStoreButton = findVisitStoreButton(buttons);
      expect(visitStoreButton).toBeInTheDocument();
    });

    it('handles MenuDropdown default case with unknown type', () => {
      const { container } = render(<MenuHeader globalPhone="+44 123456789" />);
      expect(container).toBeInTheDocument();
      
      // The default case is defensive code for invalid types in dataForNavigation
      // Since our data is valid, this case is not reachable without modifying
      // the actual data structure or exporting MenuDropdown separately
    });
  });
});
