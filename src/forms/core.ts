import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type FormPresenterProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = unknown,
    TTransformedValues = undefined
> = {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    onSubmit: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : SubmitHandler<TTransformedValues>;
    isSubmitting: boolean;
    apiError?: string | null;
};

export function toFormError(err: unknown): string {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    return "Ocorreu um erro inesperado. Tente novamente.";
}
