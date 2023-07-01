import CalendarButton from '@/app/components/calendar/CalendarButton';
import useCreateMeeting from '@/app/hooks/useCreateMeeting';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import addMinutes from 'date-fns/esm/addMinutes';
import { forwardRef, type ComponentPropsWithRef, type FC, type MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../system/Button';
import Field from '../system/Field';
import Input from '../system/Input';
import { defaultCalendarContextData, useCalendar } from './CalendarContext';

interface NewMeetingProps extends ComponentPropsWithRef<'form'> {}

const schema = z.object({
  subject: z.string().min(3),
});

/**
 * NewMeeting contains the form logic to create a new Zoom meeting.
 */
const NewMeeting: FC<NewMeetingProps> = forwardRef<HTMLFormElement, NewMeetingProps>(
  ({ className, ...props }, ref) => {
    const { start, setStart, duration, setDuration } = useCalendar();
    const meetingEnd = start ? addMinutes(start, duration) : undefined;

    const { mutate, isLoading, isSuccess, data } = useCreateMeeting();
    const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
      if (!start) {
        return;
      }

      mutate({
        start: start,
        subject: data.subject,
        duration: duration,
      });
    });

    const onClose: MouseEventHandler = (e) => {
      e.stopPropagation(); // otherwise event will bubble up to the parent CalendarSlot
      setStart(undefined);
      setDuration(defaultCalendarContextData.duration);
    };

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

        {isSuccess ? (
          <div className="p-4">
            <h2 className="text-xl">All good!</h2>
            <p className="mb-4 text-sm">
              Your meeting is confirmed. Please click below to add the event to your favorite
              calendar.
            </p>

            <CalendarButton type="google" meeting={data}>
              Google
            </CalendarButton>
          </div>
        ) : (
          <>
            <div className="p-4 border-b">
              <p>
                From: {start?.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
              <p>
                To:{' '}
                {meetingEnd?.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
            </div>

            <div className="p-4">
              <Field>
                <Input {...register('subject')} type="text" placeholder="Subject" />
              </Field>
            </div>

            <footer className="flex items-center justify-between flex-grow p-4 border-t">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" isLoading={isLoading}>
                Save
              </Button>
            </footer>
          </>
        )}
      </form>
    );
  },
);

NewMeeting.displayName = 'NewMeeting';

export default NewMeeting;
