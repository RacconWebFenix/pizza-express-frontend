import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PizzaInput } from "@/components/ui/PizzaInput";

interface PizzaTextFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "number" | "email" | "password";
    required?: boolean;
}

export function PizzaTextField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
    required,
}: PizzaTextFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PizzaInput
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    type={type}
                    error={error?.message}
                    required={required}
                    value={field.value || ""} // Ensure controlled input doesn't get undefined
                />
            )}
        />
    );
}
