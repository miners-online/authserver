"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/utils/auth/subjects";
import { auth } from "@/utils/auth/actions";

interface UserContextType {
    user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchUser() {
        try {
            const user = await auth(); // Fetch user from auth system
            if (user == false) {
                setUser(undefined)
            } else {
                setUser(user);
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
        }

        fetchUser();
    }, []);

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
