import * as z from "zod";

const user = z.object({
    name: z.string().min(3, "Name not valid"),
    email: z.email("Email not valid"),
    password: z.string().min(8, "Password not valid").regex(/[a-z]/).regex(/[0-9]/).regex(/[A-Z]/).regex(/[^a-zA-Z0-9]/)
})

export const validation = { user };