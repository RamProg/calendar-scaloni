import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MonthlyTableCellContainer from './MonthlyTableCellContainer';
import { mockedEvents } from '@/src/mocks';

const mockOpenModal = jest.fn();
jest.mock('@/src/hooks/useEventModal/useEventModal', () => ({
  useEventModal: () => ({
    openModal: mockOpenModal,
  }),
}));

describe('MonthlyTableCellContainer', () => {
  const mockProps = {
    dayEvents: mockedEvents,
    day: 1,
    month: 1,
    year: 2024,
    hasMoreThanThreeEvents: false,
  };

  it('displays the correct date', () => {
    const { getByText } = render(<MonthlyTableCellContainer {...mockProps} />);
    expect(getByText(mockProps.day)).toBeInTheDocument();
  });

  it('calls openModal with the correct event when an event is clicked', () => {
    const { getByText } = render(<MonthlyTableCellContainer {...mockProps} />);
    fireEvent.click(getByText(mockedEvents[0].title));
    expect(mockOpenModal).toHaveBeenCalledWith(mockedEvents[0]);
  });
});
