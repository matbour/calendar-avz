import { useCalendar } from '@/app/components/calendar/CalendarContext';
import CalendarSlot from '@/app/components/calendar/CalendarSlot';
import withDnd from '@/app/components/withDnd';
import useWeek from '@/app/hooks/useWeek';
import eachMinuteOfInterval from 'date-fns/esm/eachMinuteOfInterval';
import endOfDay from 'date-fns/esm/endOfDay';
import { useEffect, useState, type FC } from 'react';
import { useWindowSize } from 'usehooks-ts';

interface CalendarGridProps {}

const CalendarGrid: FC<CalendarGridProps> = () => {
  const { dateRef } = useCalendar();
  const { start, end } = useWeek(dateRef);
  const times = eachMinuteOfInterval({ start, end: endOfDay(start) }, { step: 30 });
  const slots = eachMinuteOfInterval({ start, end }, { step: 30 });

  // Dynamically defined the height of the grid
  const [area, setArea] = useState<HTMLDivElement | null>(null);
  const { height } = useWindowSize();

  useEffect(() => {
    if (!area) {
      return;
    }

    area.style.height = `${height - area.offsetTop}px`;
  }, [area, height]);

  return (
    <div ref={setArea} className="flex-grow py-4 overflow-x-auto select-none">
      <div className="relative z-0 grid grid-flow-col grid-cols-week grid-rows-48">
        {times.map((time) => (
          <div key={time.toISOString()} className="relative text-right">
            <div className="mr-2 -mt-3">{time.toLocaleString('en-US', { timeStyle: 'short' })}</div>
          </div>
        ))}
        {slots.map((slot) => (
          <CalendarSlot key={slot.toISOString()} date={slot} className="w-1/8" />
        ))}
      </div>
    </div>
  );
};

export default withDnd(CalendarGrid);
