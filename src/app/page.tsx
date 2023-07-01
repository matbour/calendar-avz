import CalendarController from '@/app/components/calendar/CalendarController';
import type { Metadata } from 'next';
import { type FC } from 'react';

interface HomePageProps {}

export const metadata: Metadata = {
  title: 'Mathieu Bour - Zoom Calendar',
};

const HomePageProps: FC<HomePageProps> = () => {
  return (
    <div className="min-h-screen">
      <header className="px-4 py-6 mb-4 bg-sky-500">Mathieu Bour - Zoom Calendar</header>

      <CalendarController />
    </div>
  );
};

export default HomePageProps;
