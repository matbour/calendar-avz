/**
 * Get the browser timezone (not support on Internet Explorer, but we don't care)
 * @see https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
 * @see https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_resolvedoptions_computed_timezone
 */
export default function useTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}
