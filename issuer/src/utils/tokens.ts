import { Context } from "hono"
import { ContentfulStatusCode } from "hono/utils/http-status"
import { jwtVerify } from "jose"
import { SubjectSchema } from "@openauthjs/openauth/subject"
import type { v1 } from "@standard-schema/spec"
import { issuer, IssuerWrapper } from "./issuer"

/**
 * @internal
 */
export interface TokenVerifyError {
    body: {
      error: string
      error_description: string
    }
    status: ContentfulStatusCode
}

export async function verifyToken(c: Context, wrapper: IssuerWrapper) {
    const header = c.req.header("Authorization")

    if (!header) {
        return {
            body: {
                error: "invalid_request",
                error_description: "Missing Authorization header"
            },
            status: 400
        } as TokenVerifyError
    }

    const [type, token] = header.split(" ")

    if (type !== "Bearer") {
        return {
            body: {
                error: "invalid_request",
                error_description: "Missing or invalid Authorization header"
            },
            status: 400
        } as TokenVerifyError
    }

    if (!token) {
        return {
            body: {
                error: "invalid_request",
                error_description: "Missing token",
            },
            status: 400
        } as TokenVerifyError
    }

    const result = await jwtVerify<{
        mode: "access"
        type: keyof SubjectSchema
        properties: v1.InferInput<SubjectSchema["user"]>
    }>(token, () => wrapper.getSigningKey().then((item) => item.public), {
        issuer: issuer(c),
    })

    const validated = await wrapper.getInput().subjects["user"]["~standard"].validate(result.payload.properties)

    if (!validated.issues && result.payload.mode === "access") {
        return validated.value as SubjectSchema
    }

    return {
        body: {
            error: "invalid_token",
            error_description: "Invalid token",
        }
    } as TokenVerifyError
}