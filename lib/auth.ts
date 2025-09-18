import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/mysql2";

import { username, oidcProvider  } from "better-auth/plugins"

let schema: any;

try {
  // Dynamic import
  schema = await import("@/auth-schema");
} catch (err) {
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
  plugins: [ 
    username(),
    oidcProvider({ // used to host an OIDC provider not third party login
      loginPage: "/auth/sign-in", // path to the login page
    })
  ] 
});