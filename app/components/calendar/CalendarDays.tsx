import clsx from 'clsx';
import eachDayOfInterval from 'date-fns/esm/eachDayOfInterval';
import isPast from 'date-fns/esm/isPast';
import isToday from 'date-fns/esm/isToday';
import { type FC } from 'react';
import { useCalendar } from './CalendarContext';

const CalendarDays: FC = () => {
  const { monday, sunday } = useCalendar();
  const week = eachDayOfInterval({ start: monday, end: sunday });

  return (
    <header className="grid flex-grow grid-cols-week">
      <div></div>
      {week.map((day) => (
        <div key={day.toISOString()} className="flex flex-col items-center text-center">
          <p
            className={clsx('mb-2', {
              ['text-gray-400']: isPast(day) && !isToday(day),
            })}
          >
            {day.toLocaleString('en-US', { weekday: 'short' })}.
          </p>

          <div
            className={clsx('text-3xl aspect-square rounded-full p-2', {
              ['text-gray-400']: isPast(day) && !isToday(day),
              ['bg-sky-500']: isToday(day),
            })}
          >
            {day.toLocaleString('en-US', { day: 'numeric' })}
          </div>
        </div>
      ))}
    </header>
  );
};

export default CalendarDays;
