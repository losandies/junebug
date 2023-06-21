"use client";

import AuthForm from "@/components/AuthForm";

import { FC, useState } from "react";

import { RemoveScrollBar } from "react-remove-scroll-bar";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <>
            <RemoveScrollBar />
            <h1 className="hidden md:block absolute text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] right-0 -bottom-3 font-bold dark:text-white pointer-events-none">
                Junebug.
            </h1>
            <div className="inset-0 mx-auto container flex-col h-screen flex items-center justify-center">
                <div className="mx-auto flex w-full text-black dark:text-white flex-col justify-center items-center p-10 max-w-lg md:ring-2 md:ring-emerald-500 dark:ring-white rounded-md bg-white dark:bg-black">
                    <AuthForm />
                </div>
            </div>
        </>
    );
};

export default page;
