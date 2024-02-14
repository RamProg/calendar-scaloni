import { render } from '@testing-library/react';
import MonthlyTableBodyContainer from './MonthlyTableBodyContainer';

jest.mock('@/src/hooks/useEvents/useEvents', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    monthlyEventsByDay: {},
  }),
}));

jest.mock('@/src/hooks/useCurrentViewedDate/useCurrentViewedDate', () => ({
  useCurrentViewedDate: jest.fn().mockReturnValue({
    month: 1,
    year: 2024,
  }),
}));

describe('MonthlyTableBodyContainer', () => {
  it('renders MonthlyTableCellContainer for each day of the month', () => {
    const { getAllByTestId } = render(
      <MonthlyTableBodyContainer />
    );

    expect(getAllByTestId('monthly-table-cell')).toHaveLength(31);
  });
});
