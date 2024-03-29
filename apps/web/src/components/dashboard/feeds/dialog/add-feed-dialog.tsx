"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { FILE_TYPE } from "../../../../types/feed.types";
import { onPromise } from "../../../../utils";
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

import { addFeed, importFeeds } from "./actions";
import { addFeedSchema } from "./validation";

import type { AddFeedInput } from "./validation";
import type { DialogProps } from "@radix-ui/react-dialog";

type AddFeedDialogProps = DialogProps;

export const AddFeedDialog = memo<AddFeedDialogProps>(
  ({ children, ...props }) => {
    const form = useForm<AddFeedInput>({
      resolver: zodResolver(addFeedSchema),
    });

    const urlContent = form.watch("url");
    const fileContent = form.watch("file");

    useEffect(() => {
      if (!urlContent && fileContent?.size) {
        form.clearErrors("url");
      }
      if (!fileContent?.size && urlContent) {
        form.clearErrors("file");
      }
    }, [fileContent, urlContent, form]);

    const onSubmit = async (data: AddFeedInput) => {
      const { url, file } = data;
      if (!url && !file) {
        return;
      }

      if (url) {
        const loadingToast = toast.loading("Adding feed...");
        const { message, success } = await addFeed({ url });

        if (success) {
          toast.success(message, { id: loadingToast });
        } else {
          toast.error(message, { id: loadingToast });
        }
      }

      if (file) {
        const content = await file.text();
        const loadingToast = toast.loading("Uploading feed...");
        const { message, success } = await importFeeds({
          content,
          type: FILE_TYPE.OPML,
        });

        if (success) {
          toast.success(message, { id: loadingToast });
        } else {
          toast.error(message, { id: loadingToast });
        }
      }
    };

    return (
      <Dialog {...props}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="space-y-2 sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add feed and always be on track!</DialogTitle>
            <DialogDescription>
              Pass an url to requested feed or upload via file.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={onPromise(form.handleSubmit(onSubmit))}
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pass feed url here..."
                        disabled={!!fileContent?.size}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-3">
                <span className="text-sm">or</span>

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".opml"
                          className="cursor-pointer"
                          disabled={!!urlContent}
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-4">
                <Button disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

AddFeedDialog.displayName = "AddFeedDialog";
