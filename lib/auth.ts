import { betterAuth } from "better-auth";
import { jwt, oidcProvider } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_HOME_URL as string,
    "https://auth.minersonline.uk",
    "http://localhost:3000",
  ],
  socialProviders: { 
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [ 
    jwt(),
    oidcProvider({
      useJWTPlugin: true,
      loginPage: "/sign-in",
    })
  ] 
});