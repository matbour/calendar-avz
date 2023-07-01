import type { Metadata } from 'next';
import { type FC } from 'react';
import CalendarController from './components/calendar/CalendarController';

export const metadata: Metadata = {
  title: 'Mathieu Bour - Zoom Calendar',
  description: '1 day project for an Avizio assessment',
};

const HomePageProps: FC = () => {
  return <CalendarController />;
};

export default HomePageProps;
