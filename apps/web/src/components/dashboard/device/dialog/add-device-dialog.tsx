import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { capitalize, onPromise } from "../../../../utils";
import { registerDeviceSchema } from "../../../../utils/validation/schema";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";

import { registerDevice } from "./actions/actions";

import type { RegisterDeviceInput } from "../../../../utils/validation/types";
import type { TRPCError } from "@trpc/server";

type AddDeviceDialog = {
  readonly children?: React.ReactNode;
};

export const AddDeviceDialog = memo<AddDeviceDialog>(({ children }) => {
  const form = useForm<RegisterDeviceInput>({
    resolver: zodResolver(registerDeviceSchema),
  });

  const onSubmit = async (data: RegisterDeviceInput) => {
    await toast.promise(registerDevice(data), {
      loading: "Registering your device...",
      success: ({ message }) => message,
      error: (err: TRPCError | Error) => capitalize(err.message),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-2 sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Register device to enable sync</DialogTitle>
          <DialogDescription>
            You&apos;re one step away from enabling sync. Just pass an one-time
            code!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={onPromise(form.handleSubmit(onSubmit))}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your one-time code..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground">
              You can find one-time code on{" "}
              <a
                href="https://my.remarkable.com/device/desktop/connect"
                className="font-medium underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noreferrer"
              >
                your reMarkable account.
              </a>
            </p>

            <DialogFooter className="mt-4">
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

AddDeviceDialog.displayName = "AddDeviceDialog";