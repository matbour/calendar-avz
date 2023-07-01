import Button, { type ButtonProps } from '@/app/components/system/Button';
import type { Meeting } from '@/app/hooks/useCreateMeeting';
import addMinutes from 'date-fns/esm/addMinutes';
import format from 'date-fns/esm/format';
import { useMemo, type FC } from 'react';

/**
 * Generate the meeting description from the meeting object.
 */
function getDescription(meeting: Meeting) {
  return `This virtual meeting is hosted on Zoom.\n\nPlease join at ${meeting.join_url}`;
}

/**
 * Generate the event calendar link for a given platform.
 */
const templates = {
  google: (meeting: Meeting) => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', meeting.topic);
    url.searchParams.set('location', meeting.join_url);
    url.searchParams.set('details', getDescription(meeting));

    const urlFormat = "uuuuMMdd'T'HHmmss'Z'";
    const end = addMinutes(meeting.start_time, meeting.duration);
    url.searchParams.set(
      'dates',
      `${format(meeting.start_time, urlFormat)}/${format(end, urlFormat)}`,
    );
    return url.toString();
  },
  // other services like Outlook, Office 365 or Yahoo can be easily added
} satisfies Record<string, (m: Meeting) => string>;

type CalendarButtonProps = Omit<ButtonProps, 'href'> & {
  type: keyof typeof templates;
  meeting: Meeting;
};

const CalendarButton: FC<CalendarButtonProps> = ({ type, meeting, ...props }) => {
  const href = useMemo(() => templates[type](meeting), [type, meeting]);
  return <Button href={href} target="_blank" {...props} />;
};

export default CalendarButton;
