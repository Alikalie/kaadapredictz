import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback.functions-CXJKB-48.js
var sendFeedback_createServerFn_handler = createServerRpc({
	id: "818152a5f73402dbcb2f910ed4c59624a33c31422c72c570b0fb0298b67de84c",
	name: "sendFeedback",
	filename: "src/lib/feedback.functions.ts"
}, (opts) => sendFeedback.__executeServer(opts));
var sendFeedback = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	full_name: stringType().trim().min(2).max(100),
	email: stringType().email().max(254),
	whatsapp: stringType().trim().max(40),
	subject: stringType().trim().min(2).max(150),
	message: stringType().trim().min(10).max(4e3)
}).parse(input)).handler(sendFeedback_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const reference = `KP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
	const { error } = await supabaseAdmin.from("feedback").insert({
		...data,
		category: "general",
		reference
	});
	if (error) throw new Error("Your message could not be sent. Please try again.");
	return { reference };
});
//#endregion
export { sendFeedback_createServerFn_handler };
