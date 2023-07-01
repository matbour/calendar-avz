import env from '@/app/lib/env';
import { encode } from '@/app/utils/base64';
import { z } from 'zod';

const schema = z.object({
  access_token: z.string().min(1),
  token_type: z.enum(['bearer']),
  expires_in: z.number().int().positive(),
  scope: z.string().min(1),
});

/**
 * Get a Zoom access token using the Zoom Server-to-Server credentials.
 * @see https://github.com/zoom/server-to-server-oauth-token/blob/master/s2s.js
 */
export default async function getToken() {
  const bearer = encode(`${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`);
  const res = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${bearer}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=account_credentials&account_id=${env.ZOOM_ACCOUNT_ID}`,
  });

  const raw = await res.json();
  return schema.parse(raw);
}
