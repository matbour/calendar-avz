import Link from 'next/link';
import { type FC } from 'react';

const Header: FC = () => (
  <header className="flex items-center justify-between p-6 mb-4 text-xl font-semibold text-white bg-sky-500">
    <h1>Mathieu Bour - Zoom Calendar</h1>

    <Link href="https://github.com/mathieu-bour/calendar-avz" target="_blank">
      GitHub Repo
    </Link>
  </header>
);

export default Header;
