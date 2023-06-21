"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { FormInput } from "./ui/FormInput";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";
import AuthSocialBtn from "./AuthSocialBtn";
import { FieldValues, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";
import Input from "./ui/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AuthFormProps {}

type AuthVariant = "LOGIN" | "REGISTER";

const AuthForm: FC<AuthFormProps> = ({}) => {
    const [variant, setVariant] = useState<AuthVariant>("LOGIN");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const toggleVairant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        if (variant === "REGISTER") {
            try {
                await axios.post("/api/register", data);
                await signIn("credentials", data);
            } catch (error: any) {
                toast.error("Oh no! Something went wrong.");
            }
            setIsLoading(false);
        }

        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            }).then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentails");
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged In");
                    router.push("/dashboard");
                }
            });
        }
    });

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth Social Sign In
        signIn(action, {
            redirect: false,
        })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentials");
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged In");
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="w-[85%]">
            <LargeHeading size={"sm"}>Hello, hello!</LargeHeading>
            <Paragraph size={"sm"} className="text-slate-500 mt-2 mb-4">
                Please enter your information to{" "}
                {variant === "LOGIN" ? "sign in!" : "register!"}
            </Paragraph>
            <form onSubmit={onSubmit} className="space-y-4 mb-5">
                {variant === "LOGIN" ? null : (
                    <div className="flex space-x-4 ">
                        <Input
                            id="firstName"
                            type="text"
                            register={register}
                            errors={errors}
                            className=""
                            placeholder="First Name"
                            disabled={isLoading}
                        />
                        <Input
                            id="lastName"
                            type="text"
                            register={register}
                            errors={errors}
                            className=""
                            placeholder="Last Name"
                            disabled={isLoading}
                        />
                    </div>
                )}

                <Input
                    id="email"
                    type="email"
                    register={register}
                    errors={errors}
                    className=""
                    placeholder="Email"
                    disabled={isLoading}
                />
                <Input
                    id="password"
                    type="password"
                    register={register}
                    errors={errors}
                    className=""
                    placeholder="Password"
                    disabled={isLoading}
                />
                <Button size="full" variant="default" disabled={isLoading}>
                    {variant === "LOGIN" ? "Login" : "Register"}
                </Button>
            </form>

            <div className="w-full h-12 flex items-center justify-center relative">
                <div className="bg-black dark:bg-white w-full h-[1px]"></div>
                <div className="absolute px-2 flex justify-center bg-white dark:bg-black z-50 ">
                    Or continue with
                </div>
            </div>

            <div className="my-6 flex gap-2">
                <AuthSocialBtn
                    icon={BsGithub}
                    onClick={() => socialAction("github")}
                />
                <AuthSocialBtn
                    icon={BsGoogle}
                    onClick={() => socialAction("google")}
                />
            </div>
            <div className="w-full flex justify-center">
                <Paragraph size="xs">
                    {variant === "LOGIN"
                        ? "New to Junebug? Create an account "
                        : "Already have an account? Log in "}
                    <span
                        className="underline cursor-pointer text-emerald-500"
                        onClick={() => toggleVairant()}
                    >
                        here.
                    </span>
                </Paragraph>
            </div>
        </div>
    );
};

export default AuthForm;
