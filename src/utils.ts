export interface Env {
    MinersOnline_AuthServer: KVNamespace
}

export interface AuthClient {
    redirectURIs: string[]
    name: string
}

export type AuthClients = Record<string, AuthClient>;