import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/neon-http';

import { username, oidcProvider, jwt, deviceAuthorization } from "better-auth/plugins"

let schema: Record<string, unknown>;

try {
  // Dynamic import
  schema = await import("@/auth-schema");
} catch (_) {
  console.warn("@/auth-schema not found, using default schema");
  schema = {}; // fallback or default schema
}

const db = drizzle(process.env.DATABASE_URL!);

export const auth = betterAuth({
  socialProviders: {
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }), 
  disabledPaths: [
    "/token", // disable the default jwt token endpoint as we are using OIDC
  ],
  plugins: [ 
    username(),
    jwt({
      jwt: {
        issuer: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
      }
    }),
    deviceAuthorization({ 
      expiresIn: "30m",
      interval: "5s",
    }), 
    oidcProvider({ // used to host an OIDC provider not third party login
      useJWTPlugin: true,
      loginPage: "/auth/sign-in", // path to the login page
      trustedClients: [
        {
          clientId: "miners-online-home",
          clientSecret: process.env.MINERS_ONLINE_HOME_CLIENT_SECRET as string,
          name: "Miners Online Home",
          type: "web",
          redirectURLs: [
            "http://localhost:4000/api/auth/callback/miners-online",
            "https://www.minersonline.uk/api/auth/callback/miners-online"
          ],
          disabled: false,
          skipConsent: true,
          metadata: {}
        }
      ],
      metadata: {
        issuer: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
      }
    })
  ] 
});