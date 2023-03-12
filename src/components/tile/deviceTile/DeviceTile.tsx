import dayjs from "dayjs";
import { memo } from "react";

import RemarkableIcon from "public/svg/remarkable.svg";

import { onPromise } from "../../../utils/functions";
import { Button } from "../../common/Button";

import type { Device } from "@prisma/client";

interface DeviceTileProps {
  readonly device: Device;
  readonly onDelete: () => Promise<void>;
}

export const DeviceTile = memo<DeviceTileProps>(({ device, onDelete }) => {
  return (
    <div className="relative flex gap-10 rounded-2xl bg-white py-6 px-8 shadow lg:p-8 xl:p-12 dark:bg-slate-800/30">
      <RemarkableIcon className="w-1/3 sm:w-1/4 lg:w-1/5 dark:text-white" />
      <div className="flex flex-col items-start justify-between py-6 sm:p-10">
        <h2 className="text-2xl font-medium leading-4 text-gray-900 sm:text-4xl dark:text-white">
          reMarkable 2
        </h2>
        <div className="mt-6 flex flex-col lg:gap-0.5">
          <span className="text-base text-gray-500 lg:text-lg dark:text-slate-300">
            Registered at
          </span>
          <span className="font-bold dark:text-gray-400">
            {dayjs(device.registeredAt).format("DD-MM-YYYY")}
          </span>
        </div>
        <Button
          onClick={onPromise(onDelete)}
          className="bottom-10 right-10 mt-4 md:absolute lg:right-8 lg:bottom-8 xl:right-12 xl:bottom-12"
          variant="danger"
        >
          Delete device
        </Button>
      </div>
    </div>
  );
});

DeviceTile.displayName = "DeviceTile";
