import { object, string } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

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