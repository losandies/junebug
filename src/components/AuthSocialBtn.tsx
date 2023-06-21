"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface AuthSocialBtnProps {
    icon: IconType;
    onClick: () => void;
}

const AuthSocialBtn: FC<AuthSocialBtnProps> = ({ icon: Icon, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex transition w-full h-12 justify-center items-center rounded-md hover:bg-emerald-500 hover:bg-opacity-20 dark:bg-white dark:hover:bg-emerald-500 dark:hover:bg-opacity-none px-4 py-2 text-slate-600 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
            <Icon size={20} />
        </button>
    );
};

export default AuthSocialBtn;
