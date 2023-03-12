import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "./ThemeProvider";
import { UIProvider } from "./UIProvider";

import type { Session } from "next-auth";
import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  session: Session | null;
  children: ReactNode;
}>;

export const AppProviders = ({ session, children }: AppProvidersProps) => (
  <SessionProvider session={session}>
    <ThemeProvider>
      <UIProvider>{children}</UIProvider>
    </ThemeProvider>
  </SessionProvider>
);
