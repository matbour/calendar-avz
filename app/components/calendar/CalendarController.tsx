'use client';
import useTimezone from '@/app/hooks/useTimezone';
import ChevronDoubleLeft from '@heroicons/react/24/solid/ChevronDoubleLeftIcon';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/esm/format';
import nextSunday from 'date-fns/esm/nextSunday';
import previousMonday from 'date-fns/esm/previousMonday';
import subWeeks from 'date-fns/subWeeks';
import { useState, type FC } from 'react';
import { CalendarContext, defaultCalendarContextData as defaultCalendar } from './CalendarContext';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';

/**
 * CalendarController is in charge of managing the calendar state using the {@see CalendarContext}
 */
const CalendarController: FC = () => {
  const [dateRef, setDateRef] = useState(defaultCalendar.dateRef);
  const [start, setStart] = useState<Date | undefined>(defaultCalendar.start);
  const [duration, setDuration] = useState(defaultCalendar.duration);

  const timezone = useTimezone();
  const monday = zonedTimeToUtc(format(previousMonday(dateRef), 'yyyy-MM-dd 00:00:00'), timezone);
  const sunday = zonedTimeToUtc(format(nextSunday(dateRef), 'yyyy-MM-dd 23:59:59'), timezone);

  const handlePrev = () => {
    setDateRef((current) => subWeeks(current, 1));
  };

  const handleNext = () => {
    setDateRef((current) => addWeeks(current, 1));
  };

  return (
    <CalendarContext.Provider
      value={{
        dateRef,
        setDateRef,
        monday,
        sunday,
        start,
        setStart,
        duration,
        setDuration,
      }}
    >
      <div className="flex">
        {/* Previous week */}
        <button onClick={handlePrev}>
          <ChevronDoubleLeft width={24} />
        </button>

        <div className="flex flex-col flex-grow">
          <CalendarDays />
          <CalendarGrid />
        </div>

        {/* Next week */}
        <button onClick={handleNext}>
          {/* Rotating saves data, avoiding to load a second icon */}
          <ChevronDoubleLeft width={24} className="rotate-180" />
        </button>
      </div>
    </CalendarContext.Provider>
  );
};

export default CalendarController;
