import { Button, BUTTON_VARIANT } from "../common/Button";

import { BaseModal } from "./BaseModal";

import type { HeroIcon } from "../../utils/types";
import type { ComponentProps, FormEventHandler } from "react";

type FormModalProps = Readonly<{
  title: string;
  icon: HeroIcon;
  submitText: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}> &
  ComponentProps<typeof BaseModal>;

export const FormModal = ({
  title,
  icon: Icon,
  onClose,
  submitText,
  onSubmit,
  children,
  ...props
}: FormModalProps) => (
  <BaseModal
    onClose={onClose}
    className="mb-0 sm:mb-auto sm:max-w-lg"
    {...props}
  >
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col p-6 pb-8 sm:flex-row">
        <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
          <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
        </div>
        <div className="mt-4 w-full sm:mt-0 sm:ml-4">
          <h3 className="mb-3 text-center text-lg font-medium text-gray-900 sm:text-left">
            {title}
          </h3>
          {children}
        </div>
      </div>
      <div className="flex justify-end gap-2 bg-gray-50 px-6 py-3">
        <Button
          type="button"
          variant={BUTTON_VARIANT.SECONDARY}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit">{submitText}</Button>
      </div>
    </form>
  </BaseModal>
);
