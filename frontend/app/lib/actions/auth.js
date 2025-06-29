"use server";

import { signIn, signOut, auth } from "@/lib/auth";


export const login = async () =>{
    await signIn("google", { redirectTo: "/" });
}

export const logout = async () => {
    await signOut({ redirectTo: "/" });
}

export const getSession = async () => {
    return await auth();
}

