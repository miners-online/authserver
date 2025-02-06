'use client';

import { login, logout } from "@/utils/auth/actions";
import { useUser } from "@/utils/auth/context/UserProvider";
import UserProfile from "@/components/UserProfile";


export default function HomePage() {
    const { user } = useUser();

    return (
        <>
        {user ? (
            <>
                <UserProfile
                    email={user.email}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    id={user.id}
                    photo="https://kzmg7ue4pcfxgfykz2pi.lite.vusercontent.net/placeholder.svg?height=128&width=128"
                    editable
                />
                <form action={logout}>
                    <button>Logout</button>
                </form> 
            </>
        ) : (
            <>
            </>
        ) }
        </>
    )
}
