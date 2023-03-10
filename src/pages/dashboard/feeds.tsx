import { Seo } from "../../components/common/Seo";
import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { FeedsView } from "../../views/dashboard/feeds/Feeds";

import type { NextPage } from "next";

const Feeds: NextPage = () => {
  return (
    <>
      <Seo title="Dashboard - Feeds" />
      <DashboardLayout>
        <FeedsView />
      </DashboardLayout>
    </>
  );
};

export default Feeds;
