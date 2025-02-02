import { issuer } from "@openauthjs/openauth"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import {
    type ExecutionContext,
    type KVNamespace,
} from "@cloudflare/workers-types"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

import { isDomainMatch } from "@openauthjs/openauth/util"

import { Resend } from "resend";

import { Env } from "./utils"
import { authorisedClients } from "./clients"
import { subjects, User } from "./subjects"

async function getUser(email: string, env: Env): Promise<User> {
    // Check if user data exists in Cloudflare KV
    let user = await env.MinersOnline_AuthServer.get(`user_data-${email}`, 'json') as User;

    // If user data does not exist, create a new user
    if (!user) {
        user = {
            id: crypto.randomUUID(), // Generate a unique user ID
            firstName: "Unnamed",
            lastName: "User",
            email: email, // Storing email as part of user data
        };

        // Save the newly created user to Cloudflare KV
        await env.MinersOnline_AuthServer.put(`user_data-${email}`, JSON.stringify(user));
    }

    return user;
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
                        const resend = new Resend(env.RESEND_API_KEY);

                        const { data, error } = await resend.emails.send({
                            from: "security@minersonline.uk",
                            to: email,
                            subject: "Miners Online confirmation code",
                            html: `<p>Your Miners Online confirmation code is <code>${code}</code></p>
                            <p>Please keep this code secret.</p>
                            <hr/>
                            <p>If this wasn't you, then someone is probably trying to get into your Miners Online account - you should update all your passwords immediately.</p>`,
                        });

                        console.log(email, code, data)
                        if (error) {
                            console.error(error)
                        }
                        // await env.MinersOnline_AuthServer.put(`user_code-${email}`, code);
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
    }).fetch(request, env, ctx)
}
