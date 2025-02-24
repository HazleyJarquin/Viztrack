"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider } from "../ui/sidebar";
import { ThemeProvider } from "../ThemeProvider";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster richColors />
        <SidebarProvider>
          <SessionProvider>{children}</SessionProvider>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
