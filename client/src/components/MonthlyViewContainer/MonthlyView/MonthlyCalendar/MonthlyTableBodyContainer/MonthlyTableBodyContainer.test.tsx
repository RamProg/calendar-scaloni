import { render } from '@testing-library/react';
import MonthlyTableBodyContainer from './MonthlyTableBodyContainer';
import { MonthType } from '@/src/types';

jest.mock('@/src/hooks/useEvents/useEvents', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    monthlyEventsByDay: {},
  }),
}));

describe('MonthlyTableBodyContainer', () => {
  const mockProps = {
    month: 1 as MonthType,
    year: 2024,
  };

  it('renders MonthlyTableCellContainer for each day of the month', () => {
    const { getAllByTestId } = render(
      <MonthlyTableBodyContainer {...mockProps} />
    );

    expect(getAllByTestId('monthly-table-cell')).toHaveLength(31);
  });
});
