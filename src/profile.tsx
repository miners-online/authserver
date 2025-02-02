/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { Layout } from "@openauthjs/openauth/ui/base";

export function ProfilePage() {
    return (
        <Layout>
            <h1>Profile</h1>
            <form method="post" action="#">
                <input type="hidden" name="action" value="request" />
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
                <button type="submit">Request</button>
            </form>
        </Layout>
    )
}