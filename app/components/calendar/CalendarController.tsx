'use client';
import ChevronDoubleLeft from '@heroicons/react/24/solid/ChevronDoubleLeftIcon';
import addWeeks from 'date-fns/addWeeks';
import subWeeks from 'date-fns/subWeeks';
import { useState, type FC } from 'react';
import { CalendarContext, defaultCalendarContextData as defaultCalendar } from './CalendarContext';
import CalendarDays from './CalendarDays';
import CalendarGrid from './CalendarGrid';

interface CalendarControllerProps {}

const CalendarController: FC<CalendarControllerProps> = () => {
  const [dateRef, setDateRef] = useState(defaultCalendar.dateRef);
  const [meetingStart, setMeetingStart] = useState<Date | undefined>(defaultCalendar.meetingStart);
  const [meetingDuration, setMeetingDuration] = useState(defaultCalendar.meetingDuration);
  const [slotRef, setSlotRef] = useState<HTMLDivElement | null>(null);

  const handlePrev = () => {
    setDateRef((current) => subWeeks(current, 1));
  };

  const handleNext = () => {
    setDateRef((current) => addWeeks(current, 1));
  };

  return (
    <CalendarContext.Provider
      value={{
        meetings: [],
        dateRef,
        setDateRef,
        meetingStart,
        setMeetingStart,
        meetingDuration,
        setMeetingDuration,
        slotRef,
        setSlotRef,
      }}
    >
      <div className="flex">
        <button onClick={handlePrev}>
          <ChevronDoubleLeft width={24} />
        </button>

        <div className="flex flex-col flex-grow">
          <CalendarDays />
          <CalendarGrid />
        </div>

        <button onClick={handleNext}>
          {/* Rotating saves data, avoiding to load a second icon */}
          <ChevronDoubleLeft width={24} className="rotate-180" />
        </button>
      </div>
    </CalendarContext.Provider>
  );
};

export default CalendarController;
