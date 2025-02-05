export interface Env {
    MinersOnline_Auth_KV: KVNamespace
    MinersOnline_Auth_D1: D1Database
    RESEND_API_KEY: string
}

export interface AuthClient {
    redirectURIs: string[]
    name: string
}

export type AuthClients = Record<string, AuthClient>;


