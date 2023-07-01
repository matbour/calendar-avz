import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type CalendarContextData = {
  meetings: {
    start: Date;
    duration: number;
  }[];

  dateRef: Date;
  setDateRef: Dispatch<SetStateAction<Date>>;
  start: Date | undefined;
  setStart: Dispatch<SetStateAction<Date | undefined>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};

export const defaultCalendarContextData = {
  meetings: [],
  dateRef: new Date(),
  setDateRef: () => void 0,
  start: undefined,
  setStart: () => void 0,
  duration: 60,
  setDuration: () => void 0,
} satisfies CalendarContextData;

export const CalendarContext = createContext<CalendarContextData>(defaultCalendarContextData);
export const useCalendar = () => useContext(CalendarContext);

export const Grab = Symbol('Grab');
export const Expand = Symbol('Expand');
