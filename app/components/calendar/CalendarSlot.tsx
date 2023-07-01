import { clsx } from 'clsx';
import differenceInMinutes from 'date-fns/esm/differenceInMinutes';
import getDate from 'date-fns/esm/getDate';
import getMonth from 'date-fns/esm/getMonth';
import getYear from 'date-fns/esm/getYear';
import isPast from 'date-fns/esm/isPast';
import set from 'date-fns/esm/set';
import { useEffect, useMemo, useState, type FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { usePopper } from 'react-popper';
import { Expand, Grab, useCalendar } from './CalendarContext';
import NewMeeting from './NewMeeting';

import ChevronDoubleLeft from '@heroicons/react/24/solid/ChevronDoubleLeftIcon';
interface CalendarSlotProps {
  date: Date;
  className?: string;
}

const CalendarSlot: FC<CalendarSlotProps> = ({ date, className }) => {
  const { meetingStart, setMeetingStart, meetingDuration, setMeetingDuration } = useCalendar();

  /**
   * Update the duration of the meeting based on the target time (date is ignored).
   */
  const resize = () => {
    if (!meetingStart) {
      return; // noop when no meeting is planned
    }

    const sameDate = set(date, {
      year: getYear(meetingStart),
      month: getMonth(meetingStart),
      date: getDate(meetingStart),
    });

    const diffInMinutes = Math.abs(differenceInMinutes(sameDate, meetingStart));
    setMeetingDuration(diffInMinutes + 30); // always add 1 slot
  };

  const [{ isDragging: isGrabbing }, grab] = useDrag(() => ({
    type: Grab,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver: isGrabOver }, grabDrop] = useDrop(
    () => ({
      accept: Grab,
      drop: () => setMeetingStart(date),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [meetingStart],
  );

  const [, expand] = useDrag(() => ({ type: Expand }));
  const [{ isOver: isExpandingOver }, expandDrop] = useDrop(
    () => ({
      accept: Expand,
      drop: resize,
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    [meetingStart],
  );

  const isOver = isGrabOver || isExpandingOver;

  const isHere = useMemo(() => {
    if (isGrabOver) {
      return true;
    }

    if (!meetingStart) {
      // no meeting planned : do not display anything
      return false;
    }

    if (meetingStart < date) {
      // meeting is planned earlier: cannot be here
      return false;
    }

    return meetingStart.getTime() - date.getTime() < 30 * 60 * 1000;
  }, [date, isGrabOver, meetingStart]);

  const [$ref, $setRef] = useState<HTMLDivElement | null>(null);
  const [$popper, $setPopper] = useState<HTMLFormElement | null>(null);
  const { styles, attributes, update } = usePopper($ref, $popper, {
    placement: 'left',
    modifiers: [{ name: 'offset', options: { offset: [10, 10] } }],
  });

  const onReset = () => {
    setMeetingStart(date);
    // setMeetingDuration(defaultCalendarContextData.meetingDuration);
  };

  // Update popper position when the meetingDuration changes
  useEffect(() => {
    update?.();
  }, [meetingDuration, update]);

  return (
    <div
      ref={(node) => {
        // See https://react-dnd.github.io/react-dnd/docs/faq#how-do-i-combine-several-drag-sources-and-drop-targets-in-a-single-component
        grabDrop(expandDrop(node));
      }}
      className={clsx(className, 'h-8 border relative box-border', {
        ['bg-sky-500/30']: isExpandingOver,
        ['bg-gray-300']: isPast(date),
      })}
      onClick={onReset}
    >
      {isExpandingOver && <ChevronDoubleLeft width={24} className="mx-auto -rotate-90" />}

      {isHere && (
        <div
          ref={$setRef}
          className={clsx('relative z-10 flex flex-col bg-sky-500 resize-y rounded', {
            ['opacity-50']: isGrabbing || isOver,
          })}
          style={{ height: (meetingDuration / 30) * 32 }}
        >
          {/* Grabber */}
          <div ref={grab} className="flex-grow p-2 cursor-grab">
            <p className="text-sm text-white">
              New meeting at {date.toLocaleString('en-US', { timeStyle: 'short' })}
            </p>
          </div>

          {/* Resize */}
          <div ref={expand} className="h-3 cursor-ns-resize" />

          {!isGrabbing && !isGrabOver && (
            <NewMeeting ref={$setPopper} style={styles['popper']} {...attributes['popper']} />
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarSlot;
