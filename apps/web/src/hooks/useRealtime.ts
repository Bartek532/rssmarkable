import { useCallback, useEffect, useState } from "react";
import { create } from "zustand";

import { supabase } from "@/lib/supabase/client";

import type {
  Log,
  RealtimePostgresUpdatePayload,
  Sync,
} from "@rssmarkable/database";
import type { LogMessage } from "@rssmarkable/shared";

export const useRealtimeLog = ({
  syncId,
  onPayload,
}: {
  syncId: string;
  onPayload?: (
    payload: Log & {
      json: LogMessage[];
    },
  ) => void;
}) => {
  const [log, setLog] = useState<
    | (Log & {
        json: LogMessage[];
      })
    | null
  >(null);

  useEffect(() => {
    const channel = supabase()
      .channel(`log:update`)
      .on<Log & { json: LogMessage[] }>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Log",
          filter: `syncId=eq.${syncId}`,
        },
        (payload) => {
          setLog(payload.new);
          onPayload?.(payload.new);
        },
      )
      .subscribe();

    return () => void channel.unsubscribe();
  }, [syncId, onPayload]);

  return log;
};

const useRealtimeSyncsStore = create<{
  syncs: Sync[];
  setSyncs: (syncs: Sync[]) => void;
}>((set) => ({
  syncs: [],
  setSyncs: (syncs) => set({ syncs }),
}));

export const useRealtimeSyncs = (ids?: string[]) => {
  const { syncs, setSyncs } = useRealtimeSyncsStore();

  const handlePayload = useCallback(
    (payload: RealtimePostgresUpdatePayload<Sync>) => {
      setSyncs([
        ...syncs.filter((sync) => sync.id !== payload.new.id),
        payload.new,
      ]);
    },
    [syncs, setSyncs],
  );

  useEffect(() => {
    const subscriber = supabase()
      .channel(`sync:update`)
      .on<Sync>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Sync",
          ...(ids ? { filter: `id=in.(${ids.join(",")})` } : {}),
        },
        handlePayload,
      )
      .subscribe();

    return () => {
      void subscriber.unsubscribe();
    };
  }, [handlePayload, ids]);

  return syncs;
};
