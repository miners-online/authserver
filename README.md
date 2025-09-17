Prerequisites:

- [Vercel CLI](https://vercel.com/docs/cli) installed globally

To develop locally:

```
npm install
vc dev
```

```
open http://localhost:3000
```

To build locally:

```
npm install
vc build
```

To deploy:

```
npm install
vc deploy
```

To run generate migrations:

```
npx @better-auth/cli@latest generate
npx drizzle-kit generate
```

To run migrations:

```
npx drizzle-kit migrate
```