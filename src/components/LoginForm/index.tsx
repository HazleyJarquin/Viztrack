"use client";

import { useLoginForm } from "@/hooks/useLoginForm";
import { CustomInput } from "../CustomInput";
import { Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const LoginForm = () => {
  const { register, handleSubmit, onSubmit, errors, isDirty, isPending } =
    useLoginForm();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-center justify-center gap-2"
    >
      <h1 className="text-deepBlue text-xl font-bold">Inicio de sesión</h1>

      <CustomInput
        {...register("email")}
        placeholder="Correo Electrónico*"
        type="email"
        icon={MailIcon}
        iconPosition="left"
        error={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <CustomInput
        {...register("password")}
        placeholder="Contraseña*"
        type="password"
        icon={LockIcon}
        iconPosition="left"
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <Button
        disabled={!isDirty || isPending}
        type="submit"
        className="w-full bg-deepBlue text-white"
      >
        {isPending ? (
          <Loader2Icon className="text-white animate-spin" />
        ) : (
          "Iniciar Sesión"
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full  focus-visible:ring-gray-400"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </Button>

      <p className="text-muted-foreground">¿No tienes una cuenta?</p>
      <Link
        href="/auth/register"
        className="text-deepBlue text-sm hover:underline cursor-pointer "
      >
        Registrate
      </Link>
    </form>
  );
};
