import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { Seo } from "../../../components/common/Seo";
import { DashboardLayout } from "../../../components/dashboard/layout/Layout";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";
import { SyncView } from "../../../views/dashboard/syncs/Sync";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const Sync = ({
  uid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Seo title="Dashboard - Sync" />
      <DashboardLayout>
        <SyncView uid={uid} />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<{ uid: string }>) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const uid = params!.uid;

  await ssg.sync.getSyncLog.prefetch({ uid });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      uid,
    },
  };
};

export default Sync;