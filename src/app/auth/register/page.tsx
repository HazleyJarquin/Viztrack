import { CustomInput } from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

export default function RegisterPage() {
  return (
    <form className="w-full h-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-deepBlue text-xl font-bold">Registro</h1>
      <CustomInput
        placeholder="Nombre"
        type="email"
        icon={UserIcon}
        iconPosition="left"
      />
      <CustomInput
        placeholder="Correo Electrónico"
        type="email"
        icon={MailIcon}
        iconPosition="left"
      />
      <CustomInput
        placeholder="Contraseña"
        type="password"
        icon={LockIcon}
        iconPosition="left"
      />

      <Button type="submit" className="w-full bg-deepBlue text-white">
        Registrarse
      </Button>
    </form>
  );
}
