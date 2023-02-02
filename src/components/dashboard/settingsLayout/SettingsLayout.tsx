import { Heading } from "../heading/Heading";
import { Tabs } from "../tabs/Tabs";

import type { ReactNode } from "react";

const tabs = [
  {
    label: "General",
    pathname: "/dashboard/settings",
  },
];

interface SettingsLayoutProps {
  readonly title: string;
  readonly children: ReactNode;
}

export const SettingsLayout = ({ title, children }: SettingsLayoutProps) => (
  <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
    <Heading level={2} className="mb-8">
      {title}
    </Heading>
    <Tabs tabs={tabs} />
    {children}
  </section>
);
