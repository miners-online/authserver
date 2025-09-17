import type { D1Database } from "@cloudflare/workers-types";
import { betterAuth } from "better-auth";

let _realHandler: ReturnType<typeof betterAuth> | null = null;

// Exported variable required by Better Auth CLI
export const auth: ReturnType<typeof betterAuth> = new Proxy(
  {} as ReturnType<typeof betterAuth>, // <-- cast empty object to satisfy TS
  {
    get(_, prop) {
      if (!_realHandler) {
        throw new Error(
          `Auth handler not initialized. Call initAuth(env) first. Tried to access "${String(prop)}"`
        );
      }
      return Reflect.get(_realHandler, prop);
    },
    set(_, prop, value) {
      if (!_realHandler) {
        throw new Error(
          `Auth handler not initialized. Call initAuth(env) first. Tried to set "${String(prop)}"`
        );
      }
      return Reflect.set(_realHandler, prop, value);
    },
  }
);

// Must be called at runtime with actual bindings
export function initAuth(env: { DB: D1Database }) {
  if (!_realHandler) {
    _realHandler = betterAuth({
      database: env.DB,
    });
  }
  return _realHandler;
}
