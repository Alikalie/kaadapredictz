import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dcy-eaQM.mjs";
import { a as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/member.functions-g3SoOg-h.js
var saveMyProfile_createServerFn_handler = createServerRpc({
	id: "48f6db4bcc53abba68e02014180ae43bc7920ce0dc7b1b3e50d3af7ea970aa84",
	name: "saveMyProfile",
	filename: "src/lib/member.functions.ts"
}, (opts) => saveMyProfile.__executeServer(opts));
var saveMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	full_name: stringType().trim().min(2).max(120),
	phone: stringType().trim().max(40),
	country: stringType().trim().max(80)
}).parse(input)).handler(saveMyProfile_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("profiles").upsert({
		id: context.userId,
		...data
	});
	if (error) throw new Error("Your profile could not be saved.");
	return { ok: true };
});
var requestVip_createServerFn_handler = createServerRpc({
	id: "167d9a3ce945a8344adf7bf76d74efef7753a6e90a1bd2cc45c4da44b67966f6",
	name: "requestVip",
	filename: "src/lib/member.functions.ts"
}, (opts) => requestVip.__executeServer(opts));
var requestVip = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	package_id: stringType().uuid(),
	message: stringType().trim().max(1e3)
}).parse(input)).handler(requestVip_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("vip_requests").insert({
		user_id: context.userId,
		...data
	});
	if (error) throw new Error("Your VIP request could not be sent.");
	return { ok: true };
});
var getMyAccount_createServerFn_handler = createServerRpc({
	id: "62e0ae4f81420872f2ae5314f20cb77ea5c7726b0583f420bafce31083d55a54",
	name: "getMyAccount",
	filename: "src/lib/member.functions.ts"
}, (opts) => getMyAccount.__executeServer(opts));
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyAccount_createServerFn_handler, async ({ context }) => {
	const [profile, requests, roles, subscription, predictions] = await Promise.all([
		context.supabase.from("profiles").select("*").eq("id", context.userId).maybeSingle(),
		context.supabase.from("vip_requests").select("id,status,message,created_at,vip_packages(name,price,currency,duration_days)").eq("user_id", context.userId).order("created_at", { ascending: false }),
		context.supabase.from("user_roles").select("role").eq("user_id", context.userId),
		context.supabase.from("vip_subscriptions").select("expires_at").eq("user_id", context.userId).maybeSingle(),
		context.supabase.from("predictions").select("*,prediction_categories(name,slug)").eq("access_level", "vip").neq("status", "draft").order("kickoff")
	]);
	const error = profile.error ?? requests.error ?? roles.error ?? subscription.error ?? predictions.error;
	if (error) throw new Error(error.message);
	return {
		email: context.claims.email ?? "",
		profile: profile.data,
		requests: requests.data ?? [],
		roles: (roles.data ?? []).map((r) => r.role),
		subscription: subscription.data,
		vipPredictions: predictions.data ?? []
	};
});
//#endregion
export { getMyAccount_createServerFn_handler, requestVip_createServerFn_handler, saveMyProfile_createServerFn_handler };
