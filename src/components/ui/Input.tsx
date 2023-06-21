import { cn } from "@/lib/utils";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    placeholder?: string;
}

const Input: FC<InputProps> = ({
    className,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    placeholder,
}) => {
    return (
        <input
            id={id}
            type={type}
            autoComplete={id}
            disabled={disabled}
            placeholder={placeholder}
            {...register(id, { required })}
            className={cn(
                "flex h-10 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 dark:placeholder:text-black focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-emerald-500 dark:focus:ring-offset-1 dark:bg-white dark:text-black",
                className,
                errors[id] && "focus:ring-rose-500",
                disabled && "opacity-50 cursor-default"
            )}
        />
    );
};

export default Input;
