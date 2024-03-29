"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SYNC_DEFAULT_FOLDER } from "@rssmarkable/shared";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { registerUserSchema, type RegisterData } from "@/types/auth.types";
import { onPromise } from "@/utils/functions";

export const RegisterForm = memo(() => {
  const router = useRouter();
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    const loadingToast = toast.loading("Registering...");
    const { error } = await supabase().auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          folder: SYNC_DEFAULT_FOLDER,
        },
      },
    });

    if (error) {
      return toast.error(error.message, { id: loadingToast });
    }

    toast.success("Successfully registered!", { id: loadingToast });
    return router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground">
            Already have an account?
            <Link
              href="/auth/login"
              className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
            >
              Sign in!
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
});

RegisterForm.displayName = "RegisterForm";
