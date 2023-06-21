"use client";

import { FC, useState } from "react";
import Button from "./ui/Button";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <Button variant="default" size="lg">
            Sign In
        </Button>
    );
};

export default SignInButton;
