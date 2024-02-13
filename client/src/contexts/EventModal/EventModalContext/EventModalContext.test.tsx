import { useContext } from 'react';
import { EventModalContext } from '@/src/contexts/EventModal/EventModalContext/EventModalContext';
import { renderHook } from '@testing-library/react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useEventModal', () => {
  test('returns context value', () => {
    const mockContextValue = {
      isOpen: false,
      eventData: {
        _id: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      },
      editOrAdd: 'add',
      onSave: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      onDelete: jest.fn(),
      errors: {
        title: false,
        description: false,
        startDate: false,
        endDate: false,
      },
      serverErrors: {
        getData: false,
        sendData: false,
      },
      setServerErrors: jest.fn(),
      updateEventData: jest.fn(),
    };
    (useContext as jest.Mock).mockImplementation(() => mockContextValue);

    const { result } = renderHook(() => useContext(EventModalContext));

    expect(result.current).toEqual(mockContextValue);
  });
});
