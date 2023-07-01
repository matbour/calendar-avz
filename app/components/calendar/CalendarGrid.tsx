import { useCalendar } from '@/app/components/calendar/CalendarContext';
import CalendarSlot from '@/app/components/calendar/CalendarSlot';
import withDnd from '@/app/components/withDnd';
import eachMinuteOfInterval from 'date-fns/esm/eachMinuteOfInterval';
import endOfDay from 'date-fns/esm/endOfDay';
import { useEffect, useState, type FC } from 'react';
import { useWindowSize } from 'usehooks-ts';

/**
 * The CalendarGrid exposes all slots as items of a display: grid div.
 */
const CalendarGrid: FC = () => {
  const { monday, sunday } = useCalendar();
  const times = eachMinuteOfInterval({ start: monday, end: endOfDay(monday) }, { step: 30 });
  const slots = eachMinuteOfInterval({ start: monday, end: sunday }, { step: 30 });

  const [area, setArea] = useState<HTMLDivElement | null>(null);
  const { height } = useWindowSize();

  // Dynamically compute the height of the grid based on the height of the window
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
