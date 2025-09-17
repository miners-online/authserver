import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/mysql2";

import { username, oidcProvider  } from "better-auth/plugins"

const db = drizzle(process.env.DATABASE_URL!);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "mysql",
  }), 
  plugins: [ 
    username(),
    oidcProvider({ // used to host an OIDC provider not third party login
      loginPage: "/sign-in", // path to the login page
    })
  ] 
});