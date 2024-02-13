import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyCalendar from './MonthlyCalendar';

describe('MonthlyCalendar', () => {
  const month = 2;
  const year = 2024;
  const queryClient = new QueryClient();

  it('renders correctly', () => {
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyCalendar month={month} year={year} />
      </QueryClientProvider>
    );

    expect(getByRole('table')).toBeInTheDocument();
  });

  it('renders the correct number of days', () => {
    const { getByText, queryAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyCalendar month={month} year={year} />
      </QueryClientProvider>
    );

    expect(getByText(/29/)).toBeInTheDocument();
    expect(queryAllByText(/30/)).toHaveLength(0);
  });
});
