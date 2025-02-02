import { object, string } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

import { Env } from "./utils"

export interface User {
	id: string,
	firstName: string,
	lastName: string,
	email: string
}

export const subjects = createSubjects({
	user: object({
		id: string(),
		firstName: string(),
		lastName: string(),
		email: string(),
	}),
})

export async function getUser(email: string, env: Env): Promise<User> {
	// Check if user data exists in Cloudflare KV
	let user = await env.MinersOnline_AuthServer.get(`user_data-${email}`, 'json') as User;

	// If user data does not exist, create a new user
	if (!user) {
		user = {
			id: crypto.randomUUID(), // Generate a unique user ID
			firstName: "Unnamed",
			lastName: "User",
			email: email, // Storing email as part of user data
		};

		// Save the newly created user to Cloudflare KV
		await env.MinersOnline_AuthServer.put(`user_data-${email}`, JSON.stringify(user));
	}

	return user;
}