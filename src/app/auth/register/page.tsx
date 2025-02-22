"use client";
import { CustomInput } from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { useRegisterUserForm } from "@/hooks/useRegisterUserForm";
import { ArrowLeftIcon, Loader2Icon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const { register, handleSubmit, onSubmit, errors, isDirty, isPending } =
    useRegisterUserForm();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-center justify-center gap-2"
    >
      <div className="w-full flex items-center justify-between">
        <Link href="/auth/login">
          <ArrowLeftIcon className="hover:text-muted-foreground" />
        </Link>
        <h1 className="text-deepBlue text-xl font-bold flex-1 text-center">
          Registrarse
        </h1>
        <div className="w-6"></div>
      </div>

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
          "Registrarse"
        )}
      </Button>
    </form>
  );
}
