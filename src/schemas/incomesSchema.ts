import { z } from "zod";

export const incomeSchema = z.object({
  month: z.string().nonempty("El mes es requerido"),
  income: z.string().nonempty("El ingreso es requerido"),
  user_email: z
    .string()
    .email("Email no válido")
    .nonempty("El email es requerido"),
});

export type IncomeFormInputs = z.infer<typeof incomeSchema>;
