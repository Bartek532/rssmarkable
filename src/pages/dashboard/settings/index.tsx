import { DashboardLayout } from "../../../components/dashboard/layout/Layout";
import { SettingsLayout } from "../../../components/dashboard/settingsLayout/SettingsLayout";
import { SettingsView } from "../../../views/dashboard/settings/Settings";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <DashboardLayout>
      <SettingsLayout title="General settings">
        <SettingsView />
      </SettingsLayout>
    </DashboardLayout>
  );
};

export default Settings;
