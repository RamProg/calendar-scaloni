import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MonthlyView from './MonthlyView';
import { useCurrentViewedDate } from '@/src/hooks/useCurrentViewedDate/useCurrentViewedDate';

jest.mock('@/src/hooks/useCurrentViewedDate/useCurrentViewedDate', () => ({
  useCurrentViewedDate: jest.fn().mockReturnValue({
    month: 1,
    year: 2024,
    onChangeDate: jest.fn(),
  }),
}));

describe('MonthlyView', () => {
  const queryClient = new QueryClient();

  it('renders correctly', () => {
    const { queryAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyView />
      </QueryClientProvider>
    );

    expect(queryAllByText(/January 2024/i)).not.toHaveLength(0);
  });

  it('calls onChangeDate when date is changed', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MonthlyView />
      </QueryClientProvider>
    );

    fireEvent.click(getByText('>'));
    expect(useCurrentViewedDate().onChangeDate).toHaveBeenCalledWith(
      'nextMonth'
    );
  });
});
