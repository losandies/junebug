import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Junebug",
    description: "A place for bugs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn("text-slate-900 antialiased", inter.className)}
        >
            <body className="bg-white dark:bg-black antialiased">
                <Providers>
                    {children}
                    <Navbar />
                </Providers>
            </body>
        </html>
    );
}
