import { validation } from "../../lib/validation.js";
import prisma from "../../lib/db.js";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

const signUpService = async (email: string, password: string, name: string) => {
    const result = validation.user.safeParse({ name, email, password });
    if (!result.success) {
        throw new Error("Invalid Credentials");
    }
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, name, password: passwordHash }
        });
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            throw new Error("Email already exists");
        }
        throw new Error("Unknown error");
    }
}

const signInService = async (email: string, password: string) => {
    const userFound = await prisma.user.findFirst({ where: { email } });
    if (!userFound) {
        throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) {
        throw new Error("Invalid Credentials");
    }

}

const authService = { signUpService };
export default authService;