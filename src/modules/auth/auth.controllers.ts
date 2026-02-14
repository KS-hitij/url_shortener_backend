import e, { Request, Response } from "express";
import status from "http-status";
import authService from "./auth.services.js";

const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //business logic
        return res.status(status.OK).json({ message: "Sign In Success" });
    } catch (err: any) {
        if (err.message === "User Not Found" || err.message === "Invalid Credentials") {
            return res.status(status.BAD_REQUEST).json({ message: "Invalid Credentials" });
        }
        return res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}

const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        await authService.signUpService(email, password, name);
        return res.status(status.OK).json({ message: "Sign Up Success" });
    } catch (err: any) {
        if (err.message === "Invalid Credentials") {
            return res.status(status.BAD_REQUEST).json({ message: "Invalid Credentials" });
        }
        if (err.message === "Email already exists") {
            return res.status(status.CONFLICT).json({ message: "Email Already Signed Up" });
        }
        return res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}