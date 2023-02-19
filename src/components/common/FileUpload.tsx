import { cloneElement, Fragment, useRef } from "react";

import type { ReactElement, ChangeEvent } from "react";

type FileUploadProps = Readonly<{
  accept?: string;
  multiple?: boolean;
  capture?: boolean | "user" | "environment";
  children: ReactElement;
  onChange: (payload: File[]) => void;
}>;

export const FileUpload = ({
  onChange,
  children,
  ...props
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  if (children.type === Fragment) {
    throw new Error("children cannot be React.Fragment");
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Array.from(event.target.files ?? []));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleChange}
        type="file"
        className="hidden"
        {...props}
      />
      {cloneElement(children, {
        onClick: handleClick,
      })}
    </>
  );
};
