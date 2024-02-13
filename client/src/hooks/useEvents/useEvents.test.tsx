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
    endDate: '2024-02-04T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Holidays',
    description: 'Winter holidays',
    startDate: '2024-02-03T00:00:00.000Z',
    endDate: '2024-02-04T00:00:00.000Z',
  },
  {
    _id: '3',
    title: 'Traveling to Barcelona',
    description: 'Summer vacation in Barcelona',
    startDate: '2024-02-05T00:00:00.000Z',
    endDate: '2024-02-06T00:00:00.000Z',
  },
  {
    _id: '4',
    title: 'Interview with Factorial',
    description: 'Second interview for the software engineer position',
    startDate: '2024-02-07T00:00:00.000Z',
    endDate: '2024-02-08T00:00:00.000Z',
  },
  {
    _id: '5',
    title: 'Holidays',
    description: 'Spring holidays',
    startDate: '2024-02-09T00:00:00.000Z',
    endDate: '2024-02-10T00:00:00.000Z',
  },
  {
    _id: '6',
    title: 'Traveling to Barcelona',
    description: 'Second summer vacation in Barcelona',
    startDate: '2024-02-11T00:00:00.000Z',
    endDate: '2024-02-12T00:00:00.000Z',
  },
  {
    _id: '7',
    title: 'Visiting Grandma',
    description: 'its her birthday!',
    startDate: '2024-02-09T00:00:00.000Z',
    endDate: '2024-02-13T00:00:00.000Z',
  },
  {
    _id: '8',
    title: 'Studying for exams',
    description: 'gonna be tough one',
    startDate: '2024-02-08T00:00:00.000Z',
    endDate: '2024-02-14T00:00:00.000Z',
  },
  {
    _id: '9',
    title: 'Organising the apartment',
    description: 'Cleaning and putting stuff in place',
    startDate: '2024-02-10T00:00:00.000Z',
    endDate: '2024-02-16T00:00:00.000Z',
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
  it.only('should fetch events', async () => {
    // const formattedData = {
    //   1: [mockedEvents[0]],
    //   3: [mockedEvents[1]],
    //   5: [mockedEvents[2]],
    //   7: [mockedEvents[3]],
    //   9: [mockedEvents[4], mockedEvents[6]],
    //   10: [mockedEvents[7], mockedEvents[8]],
    //   11: [mockedEvents[5]],
    // };

    mock
      .onGet(`${SERVER_URL}/events?month=${month}&year=${year}`)
      .reply(200, { data: mockedEvents });

    const { result } = renderHook(() => useEvents({ month, year }), {
      wrapper,
    });

    await waitFor(() => result.current.fetchEvents.isSuccess);

    expect(result.current.fetchEvents.data).toEqual(mockedEvents);

    console.log(result.current.monthlyEventsByDay);
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

    const { result } = renderHook(() => useEvents({ month: 1, year: 2022 }), {
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

    const { result } = renderHook(() => useEvents({ month: 1, year: 2022 }), {
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

    const { result } = renderHook(() => useEvents({ month: 1, year: 2022 }), {
      wrapper,
    });

    act(() => {
      result.current.updateEventMutation.mutate(mockedEvents[0]);
    });

    await waitFor(() => result.current.updateEventMutation.isSuccess);

    expect(result.current.updateEventMutation.data).toEqual({ data });
  });
});
