import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MonthlyTableCell from './MonthlyTableCell';
import { EventType } from '@/src/types';

describe('MonthlyTableCell', () => {
  const mockedEvents: EventType[] = [
    {
      _id: '1',
      title: 'Interview with Factorial',
      description: 'Interview for the software engineer position',
      startDate: '2024-02-01T00:00:00.000Z',
      endDate: '2024-02-01T00:00:00.000Z',
    },
    {
      _id: '2',
      title: 'Holidays',
      description: 'Winter holidays',
      startDate: '2024-02-01T00:00:00.000Z',
      endDate: '2024-02-01T00:00:00.000Z',
    },
    {
      _id: '3',
      title: 'Traveling to Barcelona',
      description: 'Summer vacation in Barcelona',
      startDate: '2024-02-01T00:00:00.000Z',
      endDate: '2024-02-01T00:00:00.000Z',
    },
    {
      _id: '4',
      title: 'Interview with Factorial',
      description: 'Second interview for the software engineer position',
      startDate: '2024-02-01T00:00:00.000Z',
      endDate: '2024-02-01T00:00:00.000Z',
    },
  ];

  const mockProps = {
    day: '1',
    date: '2024-02-01',
    openModal: jest.fn(),
    isDayEventsModalOpen: false,
    toogleModal: jest.fn(),
  };
  const mockPropsFourEvents = {
    ...mockProps,
    dayEvents: mockedEvents,
    hasMoreThanThreeEvents: true,
  };

  const mockPropsTwoEvents = {
    ...mockProps,
    dayEvents: [mockedEvents[0], mockedEvents[1]],
    hasMoreThanThreeEvents: false,
  };

  it('renders the day correctly', () => {
    const { getByText } = render(<MonthlyTableCell {...mockPropsFourEvents} />);
    expect(getByText(mockProps.day.toString())).toBeInTheDocument();
  });

  it('renders the correct number of events', () => {
    const { getByText } = render(<MonthlyTableCell {...mockPropsFourEvents} />);
    mockPropsFourEvents.dayEvents.forEach((event) => {
      expect(getByText(event.title)).toBeInTheDocument();
    });
  });

  it('renders the "Show More" button when there are more than three events', () => {
    const { getByText } = render(<MonthlyTableCell {...mockPropsFourEvents} />);
    expect(getByText(/Show More/i)).toBeInTheDocument();
  });

  it("doesn't render the 'Show More' button when there are fewer than three events", async () => {
    const { queryByText } = render(
      <MonthlyTableCell {...mockPropsTwoEvents} />
    );

    const showMoreButton = await queryByText(/Show More/i);

    expect(showMoreButton).toBeNull();
  });

  it('calls openModal with the correct event when an event is clicked', () => {
    const { getByText } = render(<MonthlyTableCell {...mockPropsFourEvents} />);

    fireEvent.click(getByText(mockPropsFourEvents.dayEvents[0].title));

    expect(mockPropsFourEvents.openModal).toHaveBeenCalledWith(
      mockPropsFourEvents.dayEvents[0]
    );
  });

  it('calls toogleModal when the "Show More" button is clicked', () => {
    const { getByText } = render(<MonthlyTableCell {...mockPropsFourEvents} />);
    fireEvent.click(getByText(/Show More/i));
    expect(mockProps.toogleModal).toHaveBeenCalled();
  });
});
