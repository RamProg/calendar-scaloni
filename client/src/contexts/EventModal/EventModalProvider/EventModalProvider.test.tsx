import { render, act } from '@testing-library/react';
import { EventModalProvider } from '@/src/contexts/EventModal/EventModalProvider/EventModalProvider';
import { EventModalContext } from '@/src/contexts/EventModal/EventModalContext/EventModalContext';
import { EventType } from '@/src/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('EventModalProvider', () => {
  it('provides context value', () => {
    let contextValue;
    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    expect(contextValue).toHaveProperty('isOpen', false);
    expect(contextValue).toHaveProperty('editOrAdd', 'add');
    expect(contextValue).toHaveProperty('eventData', {
      _id: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    expect(contextValue).toHaveProperty('errors', {
      title: false,
      description: false,
      startDate: false,
      endDate: false,
    });
    expect(contextValue).toHaveProperty('serverErrors', {
      getData: false,
      sendData: false,
    });
    expect(contextValue).toHaveProperty('onSave');
    expect(contextValue).toHaveProperty('openModal');
    expect(contextValue).toHaveProperty('closeModal');
    expect(contextValue).toHaveProperty('onDelete');
    expect(contextValue).toHaveProperty('updateEventData');
    expect(contextValue).toHaveProperty('setServerErrors');
  });

  it('openModal sets isOpen to true', () => {
    let contextValue: any;
    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    act(() => {
      contextValue.openModal();
    });

    expect(contextValue).toHaveProperty('isOpen', true);
  });

  it('closeModal sets isOpen to false', () => {
    let contextValue: any;
    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    act(() => {
      contextValue.closeModal();
    });

    expect(contextValue).toHaveProperty('isOpen', false);
  });

  it('updateEventData updates eventData', () => {
    let contextValue: any;
    const newEventData: Partial<EventType> = {
      title: 'New Title',
      description: 'New Description',
    };

    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    act(() => {
      contextValue.updateEventData(newEventData);
    });

    expect(contextValue.eventData).toMatchObject(newEventData);
  });

  it('onSave validates and does not send invalid data', () => {
    let contextValue: any;
    const invalidEventData: Partial<EventType> = {
      title: '',
      description: '',
      startDate: 'invalid date',
      endDate: 'invalid date',
    };

    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    act(() => {
      contextValue.updateEventData(invalidEventData);
      contextValue.onSave();
    });

    expect(contextValue.errors).toEqual({
      title: true,
      description: true,
      startDate: true,
      endDate: true,
    });
  });

  it('openModal sets editOrAdd and eventData correctly', () => {
    let contextValue: any;
    const eventData: EventType = {
      _id: '1',
      title: 'Title',
      description: 'Description',
      startDate: '2022-01-01',
      endDate: '2022-01-02',
    };

    render(
      <QueryClientProvider client={queryClient}>
        <EventModalProvider>
          <EventModalContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </EventModalContext.Consumer>
        </EventModalProvider>
      </QueryClientProvider>
    );

    act(() => {
      contextValue.openModal(eventData);
    });

    expect(contextValue.editOrAdd).toEqual('edit');
    expect(contextValue.eventData).toEqual(eventData);
  });
});
