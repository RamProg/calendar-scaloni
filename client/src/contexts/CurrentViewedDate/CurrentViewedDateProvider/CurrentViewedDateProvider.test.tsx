import { render, act } from '@testing-library/react';
import { CurrentViewedDateProvider } from './CurrentViewedDateProvider';
import { CurrentViewedDateContext } from '../CurrentViewedDateContext/CurrentViewedDateContext';
import { currentMonth, currentYear } from '@/src/utils/dates/dates';
import { DateDirection } from '@/src/types';

let contextValues = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeDate: (_: DateDirection) => {},
  month: 0,
  year: 0,
};
describe('CurrentViewedDateProvider', () => {
  it('provides the current month and year by default', () => {
    render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.month).toBe(currentMonth);
    expect(contextValues.year).toBe(currentYear);
  });

  it('changes the date to today', () => {
    const { rerender } = render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    act(() => {
      contextValues.onChangeDate('today');
    });

    rerender(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.month).toBe(currentMonth);
    expect(contextValues.year).toBe(currentYear);
  });

  it('changes the year to next year', () => {
    const { rerender } = render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    act(() => {
      contextValues.onChangeDate('nextYear');
    });

    rerender(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.year).toBe(currentYear + 1);
  });

  it('changes the year to previous year', () => {
    const { rerender } = render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    act(() => {
      contextValues.onChangeDate('previousYear');
    });

    rerender(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.year).toBe(currentYear - 1);
  });

  it('changes the month to next month', () => {
    const { rerender } = render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    act(() => {
      contextValues.onChangeDate('nextMonth');
    });

    rerender(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.month).toBe(
      currentMonth === 12 ? 1 : currentMonth + 1
    );
    expect(contextValues.year).toBe(
      currentMonth === 12 ? currentYear + 1 : currentYear
    );
  });

  it('changes the month to previous month', () => {
    const { rerender } = render(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    act(() => {
      contextValues.onChangeDate('previousMonth');
    });

    rerender(
      <CurrentViewedDateProvider>
        <CurrentViewedDateContext.Consumer>
          {(context) => {
            contextValues = context;
            return null;
          }}
        </CurrentViewedDateContext.Consumer>
      </CurrentViewedDateProvider>
    );

    expect(contextValues.month).toBe(
      currentMonth === 1 ? 12 : currentMonth - 1
    );
    expect(contextValues.year).toBe(
      currentMonth === 1 ? currentYear - 1 : currentYear
    );
  });
});
