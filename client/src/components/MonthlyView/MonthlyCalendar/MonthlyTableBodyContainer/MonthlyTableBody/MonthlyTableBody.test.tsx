import { render } from '@testing-library/react';
import MonthlyTableBody, { MonthlyTableBodyProps } from './MonthlyTableBody';
import MonthlyTableCellContainer from '../MonthlyTableCellContainer/MonthlyTableCellContainer';

jest.mock('../MonthlyTableCellContainer/MonthlyTableCellContainer', () =>
  jest.fn(() => null)
);

describe('MonthlyTableBody', () => {
  const mockProps: MonthlyTableBodyProps = {
    startingDay: 1,
    lastDay: 31,
    isToday: jest.fn(),
    nextDay: 0,
    columns: new Array(7).fill(null),
    rows: new Array(5).fill(null),
    monthlyEventsByDay: {},
  };

  it('renders correct number of tr and td elements', () => {
    const { container } = render(<MonthlyTableBody {...mockProps} />);
    const trElements = container.querySelectorAll('tr');
    const tdElements = container.querySelectorAll('td');
    expect(trElements).toHaveLength(mockProps.rows.length);
    expect(tdElements).toHaveLength(
      mockProps.rows.length * mockProps.columns.length
    );
  });

  it('renders MonthlyTableCellContainer with correct props', () => {
    const day = 1;
    mockProps.monthlyEventsByDay[day] = [];
    render(<MonthlyTableBody {...mockProps} />);
    expect(MonthlyTableCellContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        dayEvents: mockProps.monthlyEventsByDay[day],
        day,
        hasMoreThanThreeEvents: false,
      }),
      expect.anything()
    );
  });
});
