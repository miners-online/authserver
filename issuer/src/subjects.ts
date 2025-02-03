import { object, string } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

import { Env } from "./utils"

export interface User {
	id: string,
	firstName: string,
	lastName: string,
	email: string,
	isSetUp: number
}

export const subjects = createSubjects({
	user: object({
		id: string(),
	}),
})

export async function getUserByID(id: string, env: Env): Promise<User|undefined> {
	const result = await env.MinersOnline_Auth_D1.prepare(
		"SELECT * FROM User WHERE id = ?",
	  )
		.bind(id)
		.first();
	
	if (result == null) {
		return undefined;
	}

	return result as unknown as User
}

export async function getUser(email: string, env: Env): Promise<User|undefined> {
	const result = await env.MinersOnline_Auth_D1.prepare(
		"SELECT * FROM User WHERE email = ?",
	  )
		.bind(email)
		.first();
	
	if (result == null) {
		return undefined;
	}

	return result as unknown as User
}

export async function updateUser(id: string, email: string, firstName: string, lastName: string, isSetUp: number, env: Env): Promise<User|boolean> {
	// Update the user in the database
	const result = await env.MinersOnline_Auth_D1.prepare(
		"UPDATE User SET email = ?, firstName = ?, lastName = ?, isSetUp = ? WHERE id = ?"
	)
	.bind(email, firstName, lastName, isSetUp, id)
	.run();

	if (!result.success) {
		return false;
	}

	// Return the updated user
	return result as unknown as User
}

export async function createUser(email: string, firstName: string, lastName: string, isSetUp: number, env: Env): Promise<User> {
	// Insert the user into the database
	const result = await env.MinersOnline_Auth_D1.prepare(
	  "INSERT INTO User (id, email, firstName, lastName, isSetUp) VALUES (?, ?, ?, ?, ?)"
	)
	.bind(crypto.randomUUID(), email, firstName, lastName, isSetUp)
	.run();

 
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
		user = await createUser(email, "Unnamed", "User", 0, env);
	}

	return user;
}