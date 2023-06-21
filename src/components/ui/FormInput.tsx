import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={cn(
                    "flex h-10 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 dark:placeholder:text-black focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-emerald-500 dark:focus:ring-offset-1 dark:bg-white",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
FormInput.displayName = "Input";

export { FormInput };
