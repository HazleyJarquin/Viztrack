"use client";
import { CustomInput } from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "@/hooks/useLoginForm";
import { MailIcon, LockIcon, Loader2Icon } from "lucide-react";

export default function LoginPage() {
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
    </form>
  );
}
