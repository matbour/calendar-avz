import createMeeting from '@/app/lib/zoom/createMeeting';
import getToken from '@/app/lib/zoom/getToken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  start: z.string().transform((str) => new Date(str)),
  subject: z.string().min(3).max(200),
  duration: z.number().int().positive().multipleOf(30),
});

export async function POST(req: Request) {
  const options = await schema.parseAsync(await req.json());

  const { access_token } = await getToken();
  const meeting = await createMeeting(access_token, options);

  return NextResponse.json(meeting);
}
