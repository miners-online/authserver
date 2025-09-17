import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: varchar("username", { length: 255 }).unique(),
  displayUsername: text("display_username"),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const oauthApplication = mysqlTable("oauth_application", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name"),
  icon: text("icon"),
  metadata: text("metadata"),
  clientId: varchar("client_id", { length: 255 }).unique(),
  clientSecret: text("client_secret"),
  redirectURLs: text("redirect_ur_ls"),
  type: text("type"),
  disabled: boolean("disabled").default(false),
  userId: varchar("user_id", { length: 36 }).references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const oauthAccessToken = mysqlTable("oauth_access_token", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accessToken: varchar("access_token", { length: 255 }).unique(),
  refreshToken: varchar("refresh_token", { length: 255 }).unique(),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  clientId: varchar("client_id", { length: 36 }).references(
    () => oauthApplication.clientId,
    { onDelete: "cascade" },
  ),
  userId: varchar("user_id", { length: 36 }).references(() => user.id, {
    onDelete: "cascade",
  }),
  scopes: text("scopes"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const oauthConsent = mysqlTable("oauth_consent", {
  id: varchar("id", { length: 36 }).primaryKey(),
  clientId: varchar("client_id", { length: 36 }).references(
    () => oauthApplication.clientId,
    { onDelete: "cascade" },
  ),
  userId: varchar("user_id", { length: 36 }).references(() => user.id, {
    onDelete: "cascade",
  }),
  scopes: text("scopes"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  consentGiven: boolean("consent_given"),
});
