import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { z } from 'zod';

const schemaIn = z.object({
  start: z.date().transform((date) => date.toISOString()),
  duration: z.number().int().positive(),
  subject: z.string(),
});
type In = z.input<typeof schemaIn>;

const schemaOut = z.object({
  id: z.string(),
  url: z.string(),
});
type Out = z.infer<typeof schemaOut>;

/**
 * Create a Zoom meeting via our internal API.
 * @param options The useMutation options.
 */
export default function useCreateMeeting(
  options?: Omit<UseMutationOptions<Out, unknown, In>, 'mutationFn'>,
) {
  return useMutation<Out, unknown, In>({
    ...options,
    mutationFn: async (vars) => {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        body: JSON.stringify(vars),
      });

      if (!res.ok) {
        throw new Error('Error while creating meeting', {
          cause: res,
        });
      }

      const raw = await res.json();
      return schemaOut.parseAsync(raw);
    },
  });
}
