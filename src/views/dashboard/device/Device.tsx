import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyDeviceIcon from "public/svg/empty-device.svg";

import { Empty } from "../../../components/common/Empty";
import { AddDeviceModal } from "../../../components/modal/device/AddDeviceModal";
import { DeviceTile } from "../../../components/tile/deviceTile/DeviceTile";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { trpc } from "../../../utils/trpc";

import type { TRPCError } from "@trpc/server";

export const DeviceView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: device, isLoading: isDeviceLoading } =
    trpc.user.getUserDevice.useQuery();

  const unregisterDeviceMutation = trpc.user.unregisterDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  useGenericLoader(isDeviceLoading);

  const handleDeleteDevice = async () => {
    await toast.promise(unregisterDeviceMutation.mutateAsync(), {
      loading: "Deleting device...",
      success: ({ message }) => message,
      error: (err: TRPCError | Error) => err.message,
    });
  };

  return (
    <>
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Your device
        </h2>

        {device ? (
          <div className="mt-8">
            <DeviceTile device={device} onDelete={handleDeleteDevice} />
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyDeviceIcon className="h-50 mx-auto w-40 text-gray-400 dark:text-white" />
            <span className="mt-6 block text-lg font-medium text-gray-900 dark:text-white">
              You haven&apos;t registered your device yet, do it to unlock sync!
              🔄
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
