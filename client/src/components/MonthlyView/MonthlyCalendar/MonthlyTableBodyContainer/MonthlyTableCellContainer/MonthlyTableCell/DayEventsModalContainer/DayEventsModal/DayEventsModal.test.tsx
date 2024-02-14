import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import DayEventsModal from './DayEventsModal';
import { mockedEvents } from '@/src/mocks';

describe('DayEventsModal', () => {
  const mockOnClose = jest.fn();
  const mockOpenEventModal = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <DayEventsModal
        date="2 February 2024"
        events={mockedEvents}
        onClose={mockOnClose}
        footer={<div>Test Footer</div>}
        openEventModal={mockOpenEventModal}
      />
    );

    expect(getByText('Events on 2 February 2024')).toBeInTheDocument();
    expect(getByText('Interview with Factorial')).toBeInTheDocument();
    expect(getByText('Holidays')).toBeInTheDocument();
  });

  it('calls openEventModal when an event is clicked', () => {
    const { getByText } = render(
      <DayEventsModal
        date="2022-01-01"
        events={mockedEvents}
        onClose={mockOnClose}
        footer={<div>Test Footer</div>}
        openEventModal={mockOpenEventModal}
      />
    );

    fireEvent.click(getByText('Interview with Factorial'));
    expect(mockOpenEventModal).toHaveBeenCalledWith(mockedEvents[0]);
  });
});
