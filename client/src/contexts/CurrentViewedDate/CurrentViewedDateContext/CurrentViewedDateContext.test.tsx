import { render } from '@testing-library/react';
import {
  CurrentViewedDateContext,
  ViewedDateContextType,
} from './CurrentViewedDateContext';
import { currentMonth, currentYear } from '@/src/utils/dates/dates';

describe('CurrentViewedDateContext', () => {
  it('provides the correct default values', () => {
    let contextValues: ViewedDateContextType | null = null;

    render(
      <CurrentViewedDateContext.Consumer>
        {(context) => {
          contextValues = context;
          return null;
        }}
      </CurrentViewedDateContext.Consumer>
    );

    expect(contextValues).toEqual({
      month: currentMonth,
      year: currentYear,
      onChangeDate: expect.any(Function),
    });
  });
});
