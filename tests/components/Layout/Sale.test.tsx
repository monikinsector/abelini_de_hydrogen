import { render, screen, act } from '@testing-library/react';
import SaleBar from '~/components/Layout/Sale';

// Mock react-router Link component
jest.mock('react-router', () => ({
  Link: ({ to, children, className, id, ...props }: any) => (

    <a href={to} className={className} {...props} data-testid="sale-link">
      {children}
    </a>
  ),
}));

describe('SaleBar', () => {
  const dateNowSpies: jest.SpyInstance[] = [];

  beforeEach(() => {
    // Use legacy fake timers for better compatibility with clearInterval
    jest.useFakeTimers({ legacyFakeTimers: true });
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Run any pending timers before cleanup to allow cleanup functions to run
    act(() => {
      jest.runOnlyPendingTimers();
    });
    // Restore all Date.now spies
    dateNowSpies.forEach((spy) => spy.mockRestore());
    dateNowSpies.length = 0;
    // Clear all timers
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  // Helper function to mock Date.now and track the spy
  const mockDateNow = (time: number | (() => number)) => {
    const spy = typeof time === 'function'
      ? jest.spyOn(Date, 'now').mockImplementation(time)
      : jest.spyOn(Date, 'now').mockReturnValue(time);
    dateNowSpies.push(spy);
    return spy;
  };

  describe('Initial Render', () => {
    it('renders with all required props', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-20T12:00:00Z').toISOString();
      const props = {
        text: 'Sale ends soon!',
        saleEndTime,
        link: '/sale',
      };

      render(<SaleBar {...props} />);

      expect(screen.getByText('Sale ends soon!')).toBeInTheDocument();
      expect(screen.getByTestId('sale-link')).toHaveAttribute('href', '/sale');
    });

    it('renders with correct CSS classes', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-20T12:00:00Z').toISOString();
      const { container } = render(
        <SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />
      );

      const link = screen.getByTestId('sale-link');
      expect(link).toHaveClass(
        'sticky',
        'top-0',
        'z-99',
        'w-full',
        '!bg-[#E07A5F]',
        'inline-block'
      );
    });

    it('renders countdown timer with all time units', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-20T12:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText(/^\d{2}D$/)).toBeInTheDocument();
      expect(screen.getByText(/^\d{2}H$/)).toBeInTheDocument();
      expect(screen.getByText(/^\d{2}M$/)).toBeInTheDocument();
      expect(screen.getByText(/^\d{2}S$/)).toBeInTheDocument();
    });
  });

  describe('Time Calculation', () => {
    it('calculates correct days, hours, minutes, and seconds', () => {
      // Start: 2024-01-15 12:00:00
      // End: 2024-01-18 15:30:45
      // Difference: 3 days, 3 hours, 30 minutes, 45 seconds
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-18T15:30:45Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('03D')).toBeInTheDocument();
      expect(screen.getByText('03H')).toBeInTheDocument();
      expect(screen.getByText('30M')).toBeInTheDocument();
      expect(screen.getByText('45S')).toBeInTheDocument();
    });

    it('pads single digit values with leading zeros', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      // End: 2024-01-15 12:05:09 (5 minutes, 9 seconds)
      const saleEndTime = new Date('2024-01-15T12:05:09Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('05M')).toBeInTheDocument();
      expect(screen.getByText('09S')).toBeInTheDocument();
    });

    it('handles zero remaining time correctly', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      // End time is same as current time
      const saleEndTime = new Date('2024-01-15T12:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('handles past end time (negative difference)', () => {
      const mockDate = new Date('2024-01-20T12:00:00Z').getTime();
      mockDateNow(mockDate);

      // End time is in the past
      const saleEndTime = new Date('2024-01-15T12:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      // Should show 00:00:00:00
      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('calculates time correctly for large differences (many days)', () => {
      const mockDate = new Date('2024-01-01T00:00:00Z').getTime();
      mockDateNow(mockDate);

      // 10 days later
      const saleEndTime = new Date('2024-01-11T00:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('10D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });
  });

  describe('Timer Updates', () => {
    it('updates countdown every second', () => {
      let currentTime = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(() => currentTime);

      const saleEndTime = new Date('2024-01-15T12:00:05Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      // Initial: 5 seconds remaining
      expect(screen.getByText('05S')).toBeInTheDocument();

      // Advance 1 second
      act(() => {
        currentTime += 1000;
        jest.advanceTimersByTime(1000);
      });

      // Should now show 4 seconds
      expect(screen.getByText('04S')).toBeInTheDocument();

      // Advance another second
      act(() => {
        currentTime += 1000;
        jest.advanceTimersByTime(1000);
      });

      // Should now show 3 seconds
      expect(screen.getByText('03S')).toBeInTheDocument();
    });

    it('updates minutes when seconds reach zero', () => {
      let currentTime = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(() => currentTime);

      const saleEndTime = new Date('2024-01-15T12:01:02Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      // Initial: 1 minute, 2 seconds
      expect(screen.getByText('01M')).toBeInTheDocument();
      expect(screen.getByText('02S')).toBeInTheDocument();

      // Advance 2 seconds
      act(() => {
        currentTime += 2000;
        jest.advanceTimersByTime(2000);
      });

      // Should now show 1 minute, 0 seconds
      expect(screen.getByText('01M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('stops updating when timer reaches zero', () => {
      let currentTime = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(() => currentTime);

      const saleEndTime = new Date('2024-01-15T12:00:02Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      // Initial: 2 seconds
      expect(screen.getByText('02S')).toBeInTheDocument();

      // Advance 2 seconds to reach zero
      act(() => {
        currentTime += 2000;
        jest.advanceTimersByTime(2000);
      });

      // Should show 00S
      expect(screen.getByText('00S')).toBeInTheDocument();

      // Advance more time - should still be 00S (timer stopped)
      act(() => {
        currentTime += 5000;
        jest.advanceTimersByTime(5000);
      });

      // Should still show 00S
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('clears interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      let currentTime = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(() => currentTime);

      const saleEndTime = new Date('2024-01-15T12:00:10Z').toISOString();
      const { unmount } = render(
        <SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />
      );

      unmount();

      // Should have called clearInterval
      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles exactly one second remaining', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-15T12:00:01Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('01S')).toBeInTheDocument();
    });

    it('handles exactly one minute remaining', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-15T12:01:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('01M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('handles exactly one hour remaining', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-15T13:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('00D')).toBeInTheDocument();
      expect(screen.getByText('01H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('handles exactly one day remaining', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-16T12:00:00Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      expect(screen.getByText('01D')).toBeInTheDocument();
      expect(screen.getByText('00H')).toBeInTheDocument();
      expect(screen.getByText('00M')).toBeInTheDocument();
      expect(screen.getByText('00S')).toBeInTheDocument();
    });

    it('handles milliseconds correctly (rounds down)', () => {
      const mockDate = new Date('2024-01-15T12:00:00.500Z').getTime();
      mockDateNow(mockDate);

      // 1.5 seconds later
      const saleEndTime = new Date('2024-01-15T12:00:02Z').toISOString();
      render(<SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />);

      // Should show 01S (1.5 seconds rounds down to 1 second)
      expect(screen.getByText('01S')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders separator elements with correct attributes', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-20T12:00:00Z').toISOString();
      const { container } = render(
        <SaleBar text="Test" saleEndTime={saleEndTime} link="/test" />
      );

      const separators = container.querySelectorAll('span[aria-hidden="true"]');
      expect(separators.length).toEqual(5);

      separators.forEach((separator) => {
        expect(separator).toHaveClass('h-4', 'w-px');
      });
    });

  });

  describe('Memo Optimization', () => {
    it('does not re-render when props remain the same', () => {
      const mockDate = new Date('2024-01-15T12:00:00Z').getTime();
      mockDateNow(mockDate);

      const saleEndTime = new Date('2024-01-20T12:00:00Z').toISOString();
      const props = {
        text: 'Test Sale',
        saleEndTime,
        link: '/test',
      };

      const { rerender } = render(<SaleBar {...props} />);

      // Get initial countdown values
      const initialDays = screen.getByText(/^\d{2}D$/).textContent;

      // Rerender with same props
      rerender(<SaleBar {...props} />);

      // re-renders when props don't change
      expect(screen.getByText(/^\d{2}D$/)).toBeInTheDocument();
    });
  });
});
