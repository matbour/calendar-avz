'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const providers: FC<ProvidersProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default providers;
