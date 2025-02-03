/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { issuer, TokenVerifyError } from "./patches/issuer"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import {
    type ExecutionContext,
    type KVNamespace,
} from "@cloudflare/workers-types"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

import { Env } from "./utils"
import { subjects, getOrCreateUser, getUserByID, updateUser } from "./subjects"
import { allowDomain, sendCode } from "./auth_callbacks"
import { SubjectSchema } from "@openauthjs/openauth/subject"

export async function issuer_handler(request: Request, env: Env, ctx: ExecutionContext) {
    const {app, verifyToken} = issuer({
        allow: allowDomain,
        storage: CloudflareStorage({
            namespace: env.MinersOnline_Auth_KV,
        }),
        subjects,
        providers: {
            password: PasswordProvider(
                PasswordUI({
                    sendCode: async (email, code) => {
                        console.log("send code", email, code)
                        sendCode(email, code, env);
                    },
                }),
            ),
        },
        success: async (ctx, value) => {
            if (value.provider === "password") {
                return ctx.subject("user", {
                    id: (await getOrCreateUser(value.email, env)).id,
                })
            }
            throw new Error("Invalid provider")
        },
    });

    app.get("/userinfo", async (c) => {
        const res = await verifyToken(c);
        if (res.body) {
            const err = res as TokenVerifyError
            return c.json(
                {
                  error: err.body.error,
                  error_description: err.body.error_description,
                },
                err.status,
            )
        }

        const id = (res as SubjectSchema).id as unknown as string;

        const data = await getUserByID(id, env);

        return c.json(data);
    })

    app.post("/userinfo", async (c) => {
        const res = await verifyToken(c);
        if (res.body) {
            const err = res as TokenVerifyError
            return c.json(
                {
                  error: err.body.error,
                  error_description: err.body.error_description,
                },
                err.status,
            )
        }

        const id = (res as SubjectSchema).id as unknown as string;

        const fd = await c.req.formData();
        const firstName = fd.get("firstName")?.toString();
        const lastName = fd.get("lastName")?.toString();

        const data = await getUserByID(id, env);

        if (data != undefined && firstName != undefined && lastName != undefined) {
            const upRes = await updateUser(id, data.email, firstName, lastName, 1, env);
            if (upRes == false) {
                return c.json({
                    error: "Failed to update user"
                });
            }
            return c.json(upRes);
        }

        return c.json({
            error: "Failed to update user"
        });
    })

    return app.fetch(request, env, ctx);
}
