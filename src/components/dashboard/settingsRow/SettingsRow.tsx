import { useState } from "react";

import { Button, BUTTON_VARIANT } from "../../common/Button";

import { RowForm } from "./RowForm";

import type { HTMLInputTypeAttribute } from "react";
import type { ZodObject, ZodString } from "zod";

export const SECTIONS_WRAPPER_STYLES =
  "mt-1 flex items-start sm:col-span-2 sm:mt-0 sm:items-center";
export const LEFT_SECTION_STYLES = "grow text-gray-800";
export const RIGHT_SECTION_STYLES =
  "ml-2.5 flex h-full flex-shrink-0 flex-col items-stretch gap-1 font-medium sm:flex-row sm:items-center";

interface SettingsRowProps {
  readonly label: string;
  readonly schema: ZodObject<{ content: ZodString }>;
  readonly contentType: HTMLInputTypeAttribute;
  readonly content?: string;
  readonly onChange: (content: string) => void;
}

export const SettingsRow = ({
  label,
  schema,
  contentType,
  content,
  onChange,
}: SettingsRowProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleFormSubmit = (content: string) => {
    onChange(content);
    setIsEditMode(false);
  };

  return (
    <li className="py-4 text-sm sm:grid sm:min-h-[4rem] sm:grid-cols-3 sm:gap-4 sm:py-2">
      <div className="flex items-center font-medium text-gray-500">{label}</div>
      {isEditMode ? (
        <RowForm
          schema={schema}
          content={content ?? ""}
          contentType={contentType}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditMode(false)}
        />
      ) : (
        <div className={SECTIONS_WRAPPER_STYLES}>
          <div className={LEFT_SECTION_STYLES}>{content}</div>
          <div className={RIGHT_SECTION_STYLES}>
            <Button
              type="button"
              variant={BUTTON_VARIANT.TEXT}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};
