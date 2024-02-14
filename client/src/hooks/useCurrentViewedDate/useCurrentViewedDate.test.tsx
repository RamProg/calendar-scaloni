import {
  CurrentViewedDateContext,
  ViewedDateContextType,
} from '@/src/contexts/CurrentViewedDate/CurrentViewedDateContext/CurrentViewedDateContext';
import { useCurrentViewedDate } from '@/src/hooks/useCurrentViewedDate/useCurrentViewedDate';
import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useCurrentViewedDate', () => {
  it('returns the context value when available', () => {
    const contextValue: ViewedDateContextType = {
      month: 2,
      year: 2024,
      onChangeDate: () => {},
    };
    (useContext as jest.Mock).mockImplementation(() => contextValue);

    const { result } = renderHook(() => useCurrentViewedDate(), {
      wrapper: ({ children }) => (
        <CurrentViewedDateContext.Provider value={contextValue}>
          {children}
        </CurrentViewedDateContext.Provider>
      ),
    });

    expect(result.current).toBe(contextValue);
  });

  it('throws an error when the context is not available', () => {
    (useContext as jest.Mock).mockImplementation(() => undefined);

    try {
      renderHook(() => useCurrentViewedDate());
    } catch (error) {
      expect(error).toEqual(
        Error(
          'useCurrentViewedDate must be used within a CurrentViewedDateProvider'
        )
      );
    }
  });
});
