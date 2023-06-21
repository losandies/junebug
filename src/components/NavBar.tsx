import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import SignInButton from "./SignInButton";
import Paragraph from "./ui/Paragraph";

import SignOutButton from "./SignOutButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface NavbarProps {}

const Navbar = async ({}) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-black z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="container mx-auto w-full flex justify-between items-center">
                <Link
                    href="/"
                    className={buttonVariants({ variant: "link", size: "lg" })}
                >
                    <Paragraph size={"default"} className="mt-2">
                        Junebug.
                    </Paragraph>
                </Link>

                <div className="md:hidden mr-4">
                    <ThemeToggle />
                </div>

                <div className="hidden md:flex gap-4">
                    <ThemeToggle />
                    <Link
                        href="/documentation"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "lg",
                        })}
                    >
                        Learn More
                    </Link>

                    {session ? (
                        <>
                            <Link
                                className={buttonVariants({ variant: "ghost" })}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
