import { issuer } from "@openauthjs/openauth"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import {
    type ExecutionContext,
    type KVNamespace,
} from "@cloudflare/workers-types"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

import { isDomainMatch } from "@openauthjs/openauth/util"

import { Env } from "./utils"
import { authorisedClients } from "./clients"
import { subjects } from "./subjects"

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
        allow: async (input, req) => {
            const redir = new URL(input.redirectURI).hostname
            if (redir === "localhost" || redir === "127.0.0.1") {
                return true
            }

            const client = authorisedClients[input.clientID];
            if (client != undefined) {
                if (client.redirectURIs.includes(input.redirectURI)) {
                    return true;
                }
            }

            const forwarded = req.headers.get("x-forwarded-host")
            const host = forwarded
                ? new URL(`https://` + forwarded).hostname
                : new URL(req.url).hostname
      
            return isDomainMatch(redir, host)
        },
        storage: CloudflareStorage({
            namespace: env.MinersOnline_AuthServer,
        }),
        subjects,
        providers: {
            password: PasswordProvider(
                PasswordUI({
                    sendCode: async (email, code) => {
                        console.log(email, code)
                        await env.MinersOnline_AuthServer.put(`user_code-${email}`, code);
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
