"use client";

import { FC, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signUserOut = async () => {
        try {
            await signOut();
        } catch (error) {
            toast.error("Failed to sign out.");
        }
    };
    return (
        <Button
            onClick={signUserOut}
            variant="default"
            size="lg"
            isLoading={isLoading}
        >
            Sign Out
        </Button>
    );
};

export default SignOutButton;
