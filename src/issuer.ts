import { issuer } from "@openauthjs/openauth"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import {
    type ExecutionContext,
    type KVNamespace,
} from "@cloudflare/workers-types"
import { subjects } from "./subjects"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

import { Env } from "./utils"

async function getUser(email: string) {
    // Get user from database
    // Return user ID
    return {
        id: "123",
        firstName: "John",
        lastName: "Doe",
    }
}


export async function issuer_handler(request: Request, env: Env, ctx: ExecutionContext) {
    return issuer({
        storage: CloudflareStorage({
            namespace: env.MinersOnline_AuthServer,
        }),
        subjects,
        providers: {
            password: PasswordProvider(
                PasswordUI({
                    sendCode: async (email, code) => {
                        console.log(email, code)
                    },
                }),
            ),
        },
        success: async (ctx, value) => {
            if (value.provider === "password") {
                return ctx.subject("user", {
                    ...await getUser(value.email),
                })
            }
            throw new Error("Invalid provider")
        },
    }).fetch(request, env, ctx)
}
