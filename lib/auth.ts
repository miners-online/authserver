import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/mysql2";

import { username, oidcProvider  } from "better-auth/plugins"

import * as schema from "@/auth-schema";

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
    provider: "mysql",
    schema: schema
  }), 
  plugins: [ 
    username(),
    oidcProvider({ // used to host an OIDC provider not third party login
      loginPage: "/auth/sign-in", // path to the login page
    })
  ] 
});