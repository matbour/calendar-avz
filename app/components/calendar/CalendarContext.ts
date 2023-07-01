import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type CalendarContextData = {
  meetings: {
    start: Date;
    duration: number;
  }[];

  dateRef: Date;
  setDateRef: Dispatch<SetStateAction<Date>>;
  meetingStart: Date | undefined;
  setMeetingStart: Dispatch<SetStateAction<Date | undefined>>;
  meetingDuration: number;
  setMeetingDuration: Dispatch<SetStateAction<number>>;
  slotRef: HTMLDivElement | null;
  setSlotRef: Dispatch<SetStateAction<HTMLDivElement | null>>;
};

export const defaultCalendarContextData = {
  meetings: [],
  dateRef: new Date(),
  setDateRef: () => void 0,
  meetingStart: undefined,
  setMeetingStart: () => void 0,
  meetingDuration: 60,
  setMeetingDuration: () => void 0,
  slotRef: null,
  setSlotRef: () => void 0,
} satisfies CalendarContextData;

export const CalendarContext = createContext<CalendarContextData>(defaultCalendarContextData);
export const useCalendar = () => useContext(CalendarContext);

export const Grab = Symbol('Grab');
export const Expand = Symbol('Expand');
