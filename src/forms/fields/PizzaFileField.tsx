import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PizzaFileInput } from "@/components/ui/PizzaFileInput";

interface PizzaFileFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    required?: boolean;
    preview?: string | null;
    onPreviewClick?: () => void;
    onRemove?: () => void;
}

export function PizzaFileField<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    required,
    preview,
    onPreviewClick,
    onRemove,
}: PizzaFileFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PizzaFileInput
                    onChange={(file) => {
                        field.onChange(file); // Update RHF state with File object or null
                    }}
                    label={label}
                    placeholder={placeholder}
                    error={error?.message}
                    required={required}
                    preview={preview}
                    onPreviewClick={onPreviewClick}
                    onRemove={() => {
                        if (onRemove) onRemove();
                        field.onChange(null); // Clear RHF state
                    }}
                />
            )}
        />
    );
}
