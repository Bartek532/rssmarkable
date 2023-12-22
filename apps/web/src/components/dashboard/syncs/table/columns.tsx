"use client";

import { type Sync, SyncStatus } from "@rssmarkable/database";
import dayjs from "dayjs";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { SYNC_TRIGGER_EMOJIS } from "@/config/sync";
import { capitalize, cn } from "@/utils";

import type { SyncTrigger } from "@rssmarkable/database";
import type { ColumnDef } from "@tanstack/react-table";

const SYNC_STATUS_COLORS: Record<SyncStatus, string> = {
  [SyncStatus.FAILED]: "bg-destructive",
  [SyncStatus.SUCCESS]: "bg-success",
  [SyncStatus.IN_PROGRESS]: "bg-warning",
  [SyncStatus.QUEUED]: "bg-sky",
  [SyncStatus.UNKNOWN]: "bg-muted-foreground",
};

export const columns: ColumnDef<Sync>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sync" className="w-full" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center  gap-2 truncate">
        <RefreshCw className="h-4 w-4 text-muted-foreground" />
        <Link
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // href={`/dashboard/syncs/${row.getValue("id")}`}
          href="/"
          className="truncate text-muted-foreground transition-colors hover:text-primary"
        >
          {row.getValue("id")}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trigger",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Trigger"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const trigger = row.getValue<SyncTrigger>("trigger");
      return (
        <span className="block w-full pr-2 text-right">
          {SYNC_TRIGGER_EMOJIS[trigger]}
        </span>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "syncedArticlesCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Articles"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="block w-full pr-4 text-right">
          {row.getValue("syncedArticlesCount")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<SyncStatus>("status");

      return (
        <div className="'px-2 flex items-center gap-2">
          <div
            className={cn("h-3 w-3 rounded-full", SYNC_STATUS_COLORS[status])}
          ></div>
          <span className="whitespace-nowrap">
            {capitalize(status.toLocaleLowerCase().replace("_", " "))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "startedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="justify-end "
      />
    ),
    cell: ({ row }) => {
      return (
        <time
          dateTime={row.getValue("startedAt")}
          className="block w-full whitespace-nowrap pr-2 text-right"
        >
          {dayjs(row.getValue("startedAt")).format("MMMM D, HH:mm")}
        </time>
      );
    },
  },
];