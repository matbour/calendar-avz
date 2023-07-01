export function encode(input: string): string {
  if (typeof window === 'object') {
    return window.btoa(input);
  }

  return Buffer.from(input, 'utf-8').toString('base64');
}
