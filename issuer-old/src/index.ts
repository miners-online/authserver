import { issuer_handler } from "./issuer";
import { Env } from "./utils/types"


export default {
	async fetch(request, env: Env, ctx): Promise<Response> {
		return issuer_handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
