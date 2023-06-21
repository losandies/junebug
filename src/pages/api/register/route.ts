import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { firstName, lastName, email, password } = body;

        if (!(firstName || lastName || email || password)) {
            return new NextResponse("Missing Fields", { status: 400 });
        }

        const userExists = await db.user.findUnique({
            where: {
                email: email,
            },
        });

        if (userExists) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        if (!userExists) {
            const newUser = await db.user.create({
                data: {
                    name: firstName.concat(" ", lastName),
                    email,
                    password: hashedPassword,
                },
            });

            return NextResponse.json(newUser);
        }
    } catch (error: any) {
        console.log(error, "REGISTRATION ERROR");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
