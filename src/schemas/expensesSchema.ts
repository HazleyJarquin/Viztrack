import { z } from "zod";

const monthSchema = z
  .string()
  .refine(
    (val) =>
      [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ].includes(val),
    {
      message:
        "El mes debe ser uno de los siguientes: Enero, Febrero, Marzo, ... Diciembre",
    }
  );
export const expensesSchema = z.object({
  month: monthSchema,
  income: z.string().nonempty("El ingreso es requerido"),
  expense: z.string().nonempty("El gasto es requerido"),
  userEmail: z
    .string()
    .email("Email no válido")
    .nonempty("El email es requerido"),
});

export type ExpensesFormInputs = z.infer<typeof expensesSchema>;
