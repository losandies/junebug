"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster position="top-center" reverseOrder={true} />
            <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
    );
};

export default Providers;
