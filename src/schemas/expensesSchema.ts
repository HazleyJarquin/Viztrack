import { z } from "zod";

const monthSchema = z.string().nonempty("El mes es requerido");

export const expensesSchema = z.object({
  month: monthSchema,
  description: z.string().nonempty("La descripción es requerida"),
  amount: z.string().nonempty("La cantidad es requerida"),
  userEmail: z
    .string()
    .email("Email no válido")
    .nonempty("El email es requerido"),
});

export type ExpensesFormInputs = z.infer<typeof expensesSchema>;
