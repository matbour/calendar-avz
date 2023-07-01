import { z } from 'zod';

interface CreateMeetingOptions {
  subject: string;
  start: Date;
  duration: number;
}

const meetingSchema = z.object({
  id: z.number().int().positive(),
  topic: z.string(),
  start_time: z.string(),
  duration: z.number(),
  timezone: z.string(),
  password: z.string(),
  join_url: z.string().url(),
});

/**
 * Create new Zoom meeting
 * @param token The Zoom API authentication token.
 * @param options The meeting details.
 */
export default async function createMeeting(token: string, options: CreateMeetingOptions) {
  const data = {
    topic: options.subject,
    duration: options.duration,
    password: '123456',
    start_time: options.start.toISOString(),
    type: 2, // Type 2 — A scheduled meeting.
  };

  // See https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingCreate
  const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return meetingSchema.parse(await res.json());
}
