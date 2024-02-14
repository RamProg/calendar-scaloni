import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyCalendar from './MonthlyCalendar';

describe('MonthlyCalendar', () => {
  const queryClient = new QueryClient();

  it('renders correctly', () => {
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyCalendar />
      </QueryClientProvider>
    );

    expect(getByRole('table')).toBeInTheDocument();
  });

  it('renders the correct number of days', () => {
    const { getByText, queryAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyCalendar />
      </QueryClientProvider>
    );

    expect(getByText(/29/)).toBeInTheDocument();
    expect(queryAllByText(/30/)).toHaveLength(0);
  });
});
