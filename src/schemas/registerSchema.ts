import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email no válido").nonempty("El email es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{6,}$/,
      "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial"
    )
    .nonempty("La contraseña es requerida"),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
