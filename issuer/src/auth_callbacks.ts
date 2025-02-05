import { isDomainMatch } from "@openauthjs/openauth/util"
import { authorisedClients } from "./clients"
import { Resend } from "resend";
import { Env } from "./utils/types";

export async function allowDomain(
    input: {
      clientID: string
      redirectURI: string
      audience?: string
    },
    req: Request,
  ): Promise<boolean> {
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
}

export async function sendCode(email: string, code: string, env: Env) {
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
}