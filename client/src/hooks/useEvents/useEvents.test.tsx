import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useEvents from './useEvents';
import { act, renderHook, waitFor } from '@testing-library/react';
import { EventType } from '@/src/types';
import { SERVER_URL } from '@/src/constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const month = 2;
const year = 2024;

const mockedEvents: EventType[] = [
  {
    _id: '1',
    title: 'Interview with Factorial',
    description: 'Interview for the software engineer position',
    startDate: '2024-02-01T00:00:00.000Z',
    endDate: '2024-02-02T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Holidays',
    description: 'Winter holidays',
    startDate: '2024-02-02T00:00:00.000Z',
    endDate: '2024-02-03T00:00:00.000Z',
  },
];

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mock = new MockAdapter(axios);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useEvents', () => {
  it('should fetch events', async () => {
    const formattedData = {
      1: [
        {
          _id: '1',
          title: 'Interview with Factorial',
          description: 'Interview for the software engineer position',
          startDate: '2024-02-01',
          endDate: '2024-02-02',
        },
      ],
      2: [
        {
          _id: '1',
          title: 'Interview with Factorial',
          description: 'Interview for the software engineer position',
          startDate: '2024-02-01',
          endDate: '2024-02-02',
        },
        {
          _id: '2',
          title: 'Holidays',
          description: 'Winter holidays',
          startDate: '2024-02-02',
          endDate: '2024-02-03',
        },
      ],
      3: [
        {
          _id: '2',
          title: 'Holidays',
          description: 'Winter holidays',
          startDate: '2024-02-02',
          endDate: '2024-02-03',
        },
      ],
    };

    mock
      .onGet(`${SERVER_URL}/events?month=${month}&year=${year}`)
      .reply(200, mockedEvents);

    const { result } = renderHook(() => useEvents({ month, year }), {
      wrapper,
    });

    await waitFor(() => result.current.fetchEvents.isSuccess);

    await waitFor(() =>
      expect(result.current.monthlyEventsByDay).toEqual(formattedData)
    );
  });

  it('should add an event', async () => {
    const data = {
      message: 'Event successfully created',
      data: {
        ...mockedEvents[0],
        __v: 0,
      },
    };

    mock.onPost(`${SERVER_URL}/event`).reply(200, data);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useEvents({ month, year }), {
      wrapper,
    });

    act(() => {
      result.current.addEventMutation.mutate(mockedEvents[0]);
    });

    await waitFor(() => result.current.addEventMutation.isSuccess);

    expect(result.current.addEventMutation.data).toEqual(data);
  });

  it('should delete an event', async () => {
    const data = {
      message: 'The event has been deleted successfully',
      deletedEvent: {
        ...mockedEvents[0],
        __v: 0,
      },
    };

    mock
      .onDelete(`${SERVER_URL}/event/${data.deletedEvent._id}`)
      .reply(200, data);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useEvents({ month, year }), {
      wrapper,
    });

    act(() => {
      result.current.deleteEventMutation.mutate(data.deletedEvent._id);
    });

    await waitFor(() => result.current.deleteEventMutation.isSuccess);

    expect(result.current.deleteEventMutation.data).toEqual(data);
  });

  it('should update an event', async () => {
    const data = {
      ...mockedEvents[0],
      __v: 0,
    };

    mock.onPut(`${SERVER_URL}/event/${data._id}`).reply(200, data);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useEvents({ month, year }), {
      wrapper,
    });

    act(() => {
      result.current.updateEventMutation.mutate(mockedEvents[0]);
    });

    await waitFor(() => result.current.updateEventMutation.isSuccess);

    expect(result.current.updateEventMutation.data).toEqual(data);
  });
});
