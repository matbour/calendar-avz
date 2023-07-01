import nextSunday from 'date-fns/esm/nextSunday';
import previousMonday from 'date-fns/esm/previousMonday';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type CalendarContextData = {
  /** The date reference, used to select the week to display. */
  dateRef: Date;
  setDateRef: Dispatch<SetStateAction<Date>>;
  /** Timezoned Monday at 00:00:00 (start of the week) */
  monday: Date;
  /** Timezoned Sunday at 23:59:59 (end of the week) */
  sunday: Date;

  /** The meeting starting date; undefined if not meeting is being created. */
  start: Date | undefined;
  setStart: Dispatch<SetStateAction<Date | undefined>>;

  /** The neeting duration in minutes. */
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};

export const defaultCalendarContextData = {
  dateRef: new Date(),
  setDateRef: () => void 0,
  monday: previousMonday(new Date()),
  sunday: nextSunday(new Date()),
  start: undefined,
  setStart: () => void 0,
  duration: 60,
  setDuration: () => void 0,
} satisfies CalendarContextData;

export const CalendarContext = createContext<CalendarContextData>(defaultCalendarContextData);
export const useCalendar = () => useContext(CalendarContext);

// React DnD types
export const Grab = Symbol('Grab');
export const Expand = Symbol('Expand');
