import { object, string, number, boolean } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

import { Env } from "./utils"

export interface User {
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	isSetUp: boolean
}

export const subjects = createSubjects({
	user: object({
		id: number(),
		firstName: string(),
		lastName: string(),
		email: string(),
		isSetUp: boolean(),
	}),
})

export async function getUser(email: string, env: Env): Promise<User|undefined> {
	const result = await env.MinersOnline_Auth_D1.prepare(
		"SELECT * FROM User WHERE email = ?",
	  )
		.bind(email)
		.first();
	
	console.log("get", email, result)

	if (result == null) {
		return undefined;
	}

	return result as unknown as User
}

export async function createUser(email: string, firstName: string, lastName: string, isSetUp: boolean, env: Env): Promise<User> {
	// Insert the user into the database
	const result = await env.MinersOnline_Auth_D1.prepare(
	  "INSERT INTO User (email, firstName, lastName, isSetUp) VALUES (?, ?, ?, ?)"
	)
	.bind(email, firstName, lastName, isSetUp)
	.run();

	console.log("create", email, result)
  
	if (!result.success) {
		throw new Error("Failed to create user");
	}

	// If insertion was successful, return the created user with email and name
	return result as unknown as User
  }

export async function getOrCreateUser(email: string, env: Env): Promise<User> {
	let user = await getUser(email, env);

	// If user data does not exist, create a new user
	if (user == undefined) {
		user = await createUser(email, "Unnamed", "User", false, env);
	}

	return user;
}