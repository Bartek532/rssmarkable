import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import { Button, BUTTON_VARIANT } from "../common/Button";

import { BaseModal } from "./BaseModal";

import type { ComponentProps } from "react";

type ConfirmModalProps = Readonly<{
  content: string;
  onConfirm: () => void;
}> &
  Omit<ComponentProps<typeof BaseModal>, "children">;

export const ConfirmModal = ({
  onClose,
  content,
  onConfirm,
  ...props
}: ConfirmModalProps) => (
  <BaseModal
    onClose={onClose}
    className="flex flex-col items-center gap-3 p-6 sm:max-w-md"
    {...props}
  >
    <QuestionMarkCircleIcon className="h-24 w-24 text-blue-400" />
    <h3 className="text-bold text-3xl text-gray-600">Are you sure?</h3>
    <p className="text-center text-sm text-gray-500">{content}</p>
    <div className="flex gap-4">
      <Button
        type="button"
        variant={BUTTON_VARIANT.SECONDARY}
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={() => {
          onClose();
          onConfirm();
        }}
      >
        Confirm
      </Button>
    </div>
  </BaseModal>
);
