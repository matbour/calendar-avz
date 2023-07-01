/**
 * Isomorphic base64 encode.
 * @param input The string to encode.
 * @returns The base64-encoded string.
 */
export function encode(input: string): string {
  if (typeof window === 'object') {
    return window.btoa(input);
  }

  return Buffer.from(input, 'utf-8').toString('base64');
}
