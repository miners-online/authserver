export interface Env {
    MinersOnline_AuthServer: KVNamespace
    RESEND_API_KEY: string
}

export interface AuthClient {
    redirectURIs: string[]
    name: string
}

export type AuthClients = Record<string, AuthClient>;


