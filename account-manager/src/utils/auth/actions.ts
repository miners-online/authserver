"use server"

import { redirect } from "next/navigation"
import { headers as getHeaders, cookies as getCookies } from "next/headers"
import { subjects, User } from "@/utils/auth/subjects"
import { client, setTokens } from "@/utils/auth"

export async function getUser(access: string): Promise<User|undefined> {
    // Make a request to the authentication provider and pass the access token in the headers.
    const response = await fetch("https://authserver.minersonline.uk/userinfo", {
        headers: { Authorization: `Bearer ${access}` },
    })

    // Read the response from the request
    const body = (await response.text());

    // Convert into a JS object with JSON
    const data = JSON.parse(body);

    if (data == undefined) {
        return undefined;
    }

    return data as User;
}

export async function auth() {
    const cookies = await getCookies()
    const accessToken = cookies.get("access_token")
    const refreshToken = cookies.get("refresh_token")

    if (!accessToken) {
        return false
    }

    const verified = await client.verify(subjects, accessToken.value, {
        refresh: refreshToken?.value,
    })

    if (verified.err) {
        return false
    }
    if (verified.tokens) {
        await setTokens(verified.tokens.access, verified.tokens.refresh)
    }

    const user = await getUser(accessToken.value);
    if (user == undefined) {
        return false
    }

    return user;
}

export async function login() {
    const cookies = await getCookies()
    const accessToken = cookies.get("access_token")
    const refreshToken = cookies.get("refresh_token")

    if (accessToken) {
        const verified = await client.verify(subjects, accessToken.value, {
            refresh: refreshToken?.value,
        })
        if (!verified.err && verified.tokens) {
            await setTokens(verified.tokens.access, verified.tokens.refresh)
            redirect("/")
        }
    }

    const headers = await getHeaders()
    const host = headers.get("host")
    const protocol = host?.includes("localhost") ? "http" : "https"
    const { url } = await client.authorize(`${protocol}://${host}/api/callback`, "code")
    redirect(url)
}

export async function logout() {
    const cookies = await getCookies()
    cookies.delete("access_token")
    cookies.delete("refresh_token")

    redirect("/")
}