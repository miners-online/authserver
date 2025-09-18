import { createAuthClient } from "better-auth/react"
import { usernameClient, oidcClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        usernameClient(),
        oidcClient(),
    ]
})