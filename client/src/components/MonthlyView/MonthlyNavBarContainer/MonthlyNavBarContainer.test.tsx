import { render } from '@testing-library/react';
import { useEventModal } from '@/src/hooks/useEventModal/useEventModal';
import { getMonthName } from '@/src/utils/dates/dates';
import MonthlyNavBar from './MonthlyNavBar/MonthlyNavBar';
import MonthlyNavBarContainer from './MonthlyNavBarContainer';

jest.mock('@/src/hooks/useEventModal/useEventModal');
jest.mock('@/src/utils/dates/dates');
jest.mock('./MonthlyNavBar/MonthlyNavBar', () => jest.fn(() => null));

describe('MonthlyNavBarContainer', () => {
  beforeEach(() => {
    (useEventModal as jest.Mock).mockReturnValue({
      openModal: jest.fn(),
      serverErrors: { getData: false },
    });
    (getMonthName as jest.Mock).mockReturnValue('January');
  });

  it('renders MonthlyNavBar with correct props', () => {
    render(<MonthlyNavBarContainer />);
    expect(MonthlyNavBar).toHaveBeenCalledWith(
      expect.objectContaining({
        openModal: expect.any(Function),
        serverErrors: { getData: false },
        monthString: 'January',
        year: 2024,
        onChangeDate: expect.any(Function),
      }),
      {}
    );
  });
});
