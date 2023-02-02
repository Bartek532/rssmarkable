import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  SubmitHandler,
  SubmitErrorHandler,
  UseFormProps,
} from "react-hook-form";
import type { ZodType, TypeOf } from "zod";

interface Options<T extends ZodType> {
  onSubmit: SubmitHandler<TypeOf<T>>;
  onInvalid?: SubmitErrorHandler<TypeOf<T>>;
}

export const useZodForm = <T extends ZodType>(
  schema: T,
  { onSubmit, onInvalid }: Options<T>,
  props?: Omit<UseFormProps<TypeOf<T>>, "resolver">,
) => {
  const { handleSubmit, ...rest } = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    ...props,
  });

  const handleFormSubmit = handleSubmit(onSubmit, onInvalid);

  return { handleFormSubmit, ...rest };
};
