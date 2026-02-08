import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PizzaInput } from "@/components/ui/PizzaInput";

interface PizzaMoneyFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export function PizzaMoneyField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    required,
}: PizzaMoneyFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PizzaInput
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    error={error?.message}
                    required={required}
                    type="text" // Keep as text to allow formatting if needed, or simple string input
                    value={field.value || ""}
                // Simple money input, user types string. Logic elsewhere handles conversion.
                />
            )}
        />
    );
}
