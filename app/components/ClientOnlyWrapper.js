// app/components/ClientOnlyWrapper.js
'use client'; // This directive makes this component a client component

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient'; // Adjust the import path as needed

const ClientOnlyWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientOnlyWrapper;
