import { createAuthClient } from "better-auth/react"
import { usernameClient, oidcClient, jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        usernameClient(),
        oidcClient(),
        jwtClient()
    ]
})