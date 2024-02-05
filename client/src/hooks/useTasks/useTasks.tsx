import { MonthType } from '@/src/types';
import { useCallback, useEffect, useState } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

type useTasksProps = {
  month: MonthType;
  year: number;
};

const tasksLocal: Task[] = [
  {
    id: '1',
    title: 'Interview with Factorial',
    description: 'Interview for the software engineer position',
    startDate: '2024-02-01',
    endDate: '2024-02-02',
  },
  {
    id: '2',
    title: 'Holidays',
    description: 'Winter holidays',
    startDate: '2024-02-03',
    endDate: '2024-02-04',
  },
  {
    id: '3',
    title: 'Traveling to Barcelona',
    description: 'Summer vacation in Barcelona',
    startDate: '2024-02-05',
    endDate: '2024-02-06',
  },
  {
    id: '4',
    title: 'Interview with Factorial',
    description: 'Second interview for the software engineer position',
    startDate: '2024-02-07',
    endDate: '2024-02-08',
  },
  {
    id: '5',
    title: 'Holidays',
    description: 'Spring holidays',
    startDate: '2024-02-09',
    endDate: '2024-02-10',
  },
  {
    id: '6',
    title: 'Traveling to Barcelona',
    description: 'Second summer vacation in Barcelona',
    startDate: '2024-02-11',
    endDate: '2024-02-12',
  },
];

const useTasks = (month, year) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = useCallback(async (): Promise<Task[]> => {
    // const response = await fetch(
    //   `http://localhost:4000/tasks?month=${month}&year=${year}`
    // );
    // const data = await response.json();
    const data = await tasksLocal;
    return data;
  }, [month, year]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, [getTasks, month, year]);

  return tasks;
};

export default useTasks;
