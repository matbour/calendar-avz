import { defaultCalendarContextData, useCalendar } from '@/app/components/calendar/CalendarContext';
import Button from '@/app/components/system/Button';
import Field from '@/app/components/system/Field';
import Input from '@/app/components/system/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import addMinutes from 'date-fns/esm/addMinutes';
import { forwardRef, type ComponentPropsWithRef, type FC, type MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface NewMeetingProps extends ComponentPropsWithRef<'form'> {}

const schema = z.object({
  subject: z.string().min(3),
  email: z.string().email(),
});

const NewMeeting: FC<NewMeetingProps> = forwardRef<HTMLFormElement, NewMeetingProps>(
  ({ className, ...props }, ref) => {
    const { meetingStart, setMeetingStart, meetingDuration, setMeetingDuration } = useCalendar();
    const meetingEnd = meetingStart ? addMinutes(meetingStart, meetingDuration) : undefined;

    const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
    });

    const onClose: MouseEventHandler = (e) => {
      e.stopPropagation(); // otherwise event will bubble up to the parent CalendarSlot
      setMeetingStart(undefined);
      setMeetingDuration(defaultCalendarContextData.meetingDuration);
    };

    const onSubmit = handleSubmit((data) => {
      console.debug(data); // TODO: handle Zoom API call
    });

    return (
      <form
        ref={ref}
        {...props}
        onSubmit={onSubmit}
        className={clsx(className, 'z-10 bg-white border rounded shadow-lg w-96')}
      >
        <header className="flex items-center gap-4 p-4 border-b">
          <h3 className="flex-grow text-2xl">New meeting</h3>
          <Button className="text-2xl" onClick={onClose}>
            &times;
          </Button>
        </header>

        <div className="p-4 border-b">
          <p>
            From:{' '}
            {meetingStart?.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
          </p>
          <p>
            To: {meetingEnd?.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
          </p>
        </div>

        <div className="p-4">
          <Field>
            <Input {...register('subject')} type="text" placeholder="Subject" />
          </Field>

          <Field>
            <Input {...register('email')} type="email" placeholder="Your email" />
          </Field>
        </div>

        <footer className="flex items-center justify-between flex-grow p-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </footer>
      </form>
    );
  },
);

NewMeeting.displayName = 'NewMeeting';

export default NewMeeting;
