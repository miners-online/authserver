import { issuer } from "@openauthjs/openauth"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import {
    type ExecutionContext,
    type KVNamespace,
} from "@cloudflare/workers-types"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

import { Env } from "./utils"
import { subjects, getUser } from "./subjects"
import { allowDomain, sendCode } from "./auth_callbacks"


export async function issuer_handler(request: Request, env: Env, ctx: ExecutionContext) {
    const app = issuer({
        allow: allowDomain,
        storage: CloudflareStorage({
            namespace: env.MinersOnline_AuthServer,
        }),
        subjects,
        providers: {
            password: PasswordProvider(
                PasswordUI({
                    sendCode: async (email, code) => {
                        sendCode(email, code, env);
                    },
                }),
            ),
        },
        success: async (ctx, value) => {
            if (value.provider === "password") {
                return ctx.subject("user", {
                    ...await getUser(value.email, env),
                })
            }
            throw new Error("Invalid provider")
        },
    });
    

    return app.fetch(request, env, ctx);
}
