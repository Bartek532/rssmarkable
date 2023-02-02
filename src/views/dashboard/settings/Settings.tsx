import { useSession } from "next-auth/react";

import { Heading } from "../../../components/dashboard/heading/Heading";
import { SettingsRow } from "../../../components/dashboard/settingsRow/SettingsRow";
import {
  updateUserEmailSchema,
  updateUserNameSchema,
  updateUserPasswordSchema,
} from "../../../utils/validation";

export const SettingsView = () => {
  const { data } = useSession();

  const handleRowChange = (content: string) => {
    console.log("saving...", content);
  };

  return (
    <section className="mt-8">
      <hgroup>
        <Heading level={3}>Profile</Heading>
        <p className="max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </hgroup>

      {data?.user && (
        <ul className="mt-6 divide-y divide-gray-300 border-y border-gray-300">
          <SettingsRow
            label="Name"
            contentType="text"
            content={data.user.name ?? ""}
            schema={updateUserNameSchema}
            onChange={handleRowChange}
          />
          <SettingsRow
            label="E-mail"
            contentType="email"
            content={data.user.email}
            schema={updateUserEmailSchema}
            onChange={handleRowChange}
          />
          <SettingsRow
            label="Passowrd"
            contentType="password"
            schema={updateUserPasswordSchema}
            onChange={handleRowChange}
          />
        </ul>
      )}
    </section>
  );
};
