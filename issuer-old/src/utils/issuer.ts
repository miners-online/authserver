import { Context } from "hono"
import { SubjectSchema } from "@openauthjs/openauth/subject"
import { IssuerInput, Prettify } from "@openauthjs/openauth/issuer"
import { Provider } from "@openauthjs/openauth/provider/index"
import { encryptionKeys, KeyPair, legacySigningKeys, signingKeys } from "@openauthjs/openauth/keys"
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"

export function issuer(ctx: Context) {
    const url = new URL(ctx.req.url)
    const host = ctx.req.header("x-forwarded-host") ?? url.host
    return url.protocol + "//" + host
}

type WrappedIssuerInput = IssuerInput<
  Record<string, Provider<any>>,
  SubjectSchema,
  {
    [key in string]: Prettify<
      {
        provider: key;
      } & (Provider<any> extends Provider<infer T> ? T : {})
    >
  }[string]
>;

export interface IssuerWrapper {
    getSigningKey(): Promise<KeyPair>;
    getEncryptionKey(): Promise<KeyPair>;
    getInput(): WrappedIssuerInput;
}

export function issuerWrapper(input: WrappedIssuerInput): IssuerWrapper {
    let storage = input.storage
    if (process.env.OPENAUTH_STORAGE) {
        const parsed = JSON.parse(process.env.OPENAUTH_STORAGE)
        if (parsed.type === "dynamo") storage = DynamoStorage(parsed.options)
        if (parsed.type === "memory") storage = MemoryStorage()
        if (parsed.type === "cloudflare")
            throw new Error(
                "Cloudflare storage cannot be configured through env because it requires bindings.",
            )
    }
    if (!storage)
        throw new Error(
            "Store is not configured. Either set the `storage` option or set `OPENAUTH_STORAGE` environment variable.",
        )
    const allSigning = Promise.all([
        signingKeys(storage),
        legacySigningKeys(storage),
    ]).then(([a, b]) => [...a, ...b])
    const allEncryption = encryptionKeys(storage)
    const signingKey = allSigning.then((all) => all[0])
    const encryptionKey = allEncryption.then((all) => all[0])


    async function getSigningKey() {
        return signingKey;
    }

    async function getEncryptionKey() {
        return encryptionKey;
    }

    function getInput() {
        return input;
    }
    
    return {
        getSigningKey,
        getEncryptionKey,
        getInput
    };
}