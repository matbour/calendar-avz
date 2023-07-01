import endOfDay from 'date-fns/esm/endOfDay';
import nextSunday from 'date-fns/esm/nextSunday';
import previousMonday from 'date-fns/esm/previousMonday';
import startOfDay from 'date-fns/esm/startOfDay';

/**
 * Generate the week boundings from a fiven date. Assumes that the week starts on Monday.
 */
export default function useWeek(date: Date) {
  return {
    start: startOfDay(previousMonday(date)),
    end: endOfDay(nextSunday(date)),
  };
}
