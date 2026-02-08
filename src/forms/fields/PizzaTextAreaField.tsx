import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PizzaTextarea } from "@/components/ui/PizzaTextarea";

interface PizzaTextAreaFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}

export function PizzaTextAreaField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    required,
    rows = 4,
}: PizzaTextAreaFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PizzaTextarea
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    error={error?.message}
                    required={required}
                    rows={rows}
                    value={field.value || ""}
                />
            )}
        />
    );
}
