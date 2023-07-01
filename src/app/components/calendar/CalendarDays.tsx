import { useCalendar } from '@/app/components/calendar/CalendarContext';
import useWeek from '@/app/hooks/useWeek';
import clsx from 'clsx';
import eachDayOfInterval from 'date-fns/esm/eachDayOfInterval';
import isToday from 'date-fns/esm/isToday';
import { type FC } from 'react';

interface CalendarDaysProps {}

const CalendarDays: FC<CalendarDaysProps> = () => {
  const { dateRef } = useCalendar();
  const { start, end } = useWeek(dateRef);
  const week = eachDayOfInterval({ start, end });

  return (
    <div className="grid flex-grow grid-cols-week">
      <div></div>
      {week.map((day) => (
        <div key={day.toISOString()} className="flex flex-col items-center text-center">
          <p className="mb-2">{day.toLocaleString('en-US', { weekday: 'short' })}.</p>
          <div
            className={clsx('text-3xl aspect-square rounded-full p-2', {
              ['bg-sky-500']: isToday(day),
            })}
          >
            {day.toLocaleString('en-US', { day: 'numeric' })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
