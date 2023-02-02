import { twMerge } from "tailwind-merge";

import { useZodForm } from "../../../hooks/useZodForm";
import { onPromise } from "../../../utils/functions";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";

import {
  LEFT_SECTION_STYLES,
  RIGHT_SECTION_STYLES,
  SECTIONS_WRAPPER_STYLES,
} from "./SettingsRow";

import type { HTMLInputTypeAttribute } from "react";
import type { ZodObject, ZodString } from "zod";

interface RowFormProps {
  readonly schema: ZodObject<{ content: ZodString }>;
  readonly content: string;
  readonly contentType: HTMLInputTypeAttribute;
  readonly onSubmit: (content: string) => void;
  readonly onCancel?: () => void;
}

export const RowForm = ({
  schema,
  content,
  contentType,
  onSubmit,
  onCancel,
}: RowFormProps) => {
  const {
    handleFormSubmit,
    register,
    formState: { errors },
  } = useZodForm(
    schema,
    {
      onSubmit: ({ content }) => {
        onSubmit(content);
      },
    },
    { defaultValues: { content } },
  );

  return (
    <form
      className={SECTIONS_WRAPPER_STYLES}
      onSubmit={onPromise(handleFormSubmit)}
    >
      <div className={LEFT_SECTION_STYLES}>
        <Input type={contentType} {...register("content")} />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>
      <div
        className={twMerge(
          RIGHT_SECTION_STYLES,
          errors.content && "mt-1 sm:items-start",
        )}
      >
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
