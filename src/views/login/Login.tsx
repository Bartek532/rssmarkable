import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Logo from "public/svg/logo.svg";

import { AUTH_PROVIDER } from "../../../types/auth.types";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { onPromise } from "../../utils/functions";
import { loginUserSchema } from "../../utils/validation";

import type { Login } from "../../../types/auth.types";
import type { ClientSafeProvider } from "next-auth/react";

interface LoginProps {
  readonly providers: Record<AUTH_PROVIDER, ClientSafeProvider>;
}

export const LoginView = memo<LoginProps>(({ providers }) => {
  const router = useRouter();
  const [isFormValidated, setIsFormValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<Login>({
    resolver: zodResolver(loginUserSchema),
  });

  useEffect(() => {
    if (isValidating) {
      setIsFormValidated(true);
    }
  }, [isValidating]);

  const onSubmit = async (data: Login) => {
    const loadingToast = toast.loading("Signing in...");
    const result = await signIn("credentials", {
      ...data,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    });

    if (result?.error) {
      return toast.error(result.error, { id: loadingToast });
    }

    toast.dismiss(loadingToast);
    return router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-start  py-12 px-4  dark:bg-slate-900 sm:px-6 lg:flex-none lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              to begin your journey 🚀
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="mt-1 flex w-full flex-col items-stretch justify-center gap-2">
                {Object.values(providers)
                  .filter(
                    (provider) => provider.id !== AUTH_PROVIDER.CREDENTIALS,
                  )
                  .map((provider) => {
                    const Icon = dynamic(
                      () => import(`public/svg/social/${provider.id}.svg`),
                    );

                    return (
                      <Button
                        key={provider.id}
                        variant="secondary"
                        className="inline-flex w-full justify-center gap-4 py-2.5"
                        onClick={onPromise(() =>
                          signIn(provider.id, {
                            callbackUrl: `${window.location.origin}/dashboard`,
                          }),
                        )}
                      >
                        <span className="sr-only">
                          Sign in with {provider.name}
                        </span>

                        <div className="h-6 w-6">
                          <Icon />
                        </div>
                        <span>{provider.name}</span>
                      </Button>
                    );
                  })}
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300 dark:text-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                className="space-y-6"
                onSubmit={onPromise(handleSubmit(onSubmit))}
              >
                <Input
                  type="email"
                  {...register("email")}
                  error={errors.email}
                  isValidated={isFormValidated}
                >
                  Email
                </Input>
                <Input
                  type="password"
                  {...register("password")}
                  error={errors.password}
                  isValidated={isFormValidated}
                >
                  Password
                </Input>
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    Don&apos;t have an account yet?
                    <Link
                      href="/register"
                      className="pl-2 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Sign up!
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/images/entry-page-background.jpg"
          fill
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
});

LoginView.displayName = "LoginView";
