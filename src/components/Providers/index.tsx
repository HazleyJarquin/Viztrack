"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      {children}
    </QueryClientProvider>
  );
};
