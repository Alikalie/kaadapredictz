import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dcy-eaQM.mjs";
import { a as objectType, c as unknownType, i as enumType, n as booleanType, o as recordType, r as coerce, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-BUKvPvQI.js
var entity = enumType([
	"predictions",
	"prediction_categories",
	"articles",
	"vip_packages",
	"page_sections",
	"site_settings",
	"feedback",
	"profiles",
	"vip_requests",
	"vip_subscriptions"
]);
async function assertAdmin(context) {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "super_admin"
	});
	if (error || !data) throw new Error("Administrator access required.");
}
var getAdminData_createServerFn_handler = createServerRpc({
	id: "0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e",
	name: "getAdminData",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminData.__executeServer(opts));
var getAdminData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminData_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context);
	const names = entity.options;
	const result = {};
	for (const name of names) {
		const { data, error } = await context.supabase.from(name).select("*").limit(500);
		if (error) throw new Error(error.message);
		result[name] = data ?? [];
	}
	return result;
});
var schemas = {
	predictions: objectType({
		slug: stringType().min(2),
		league: stringType().min(2),
		home_team: stringType().min(2),
		away_team: stringType().min(2),
		kickoff: stringType().min(5),
		category_id: stringType().uuid().nullable(),
		market: stringType().min(1),
		selection: stringType().min(1),
		odds: coerce.number().positive(),
		confidence: coerce.number().int().min(0).max(100),
		analysis: stringType(),
		venue: stringType().nullable(),
		status: enumType([
			"draft",
			"published",
			"pending",
			"won",
			"lost",
			"void"
		]),
		is_featured: booleanType(),
		access_level: enumType(["public", "vip"])
	}),
	prediction_categories: objectType({
		name: stringType().min(1),
		slug: stringType().min(1),
		description: stringType(),
		sort_order: coerce.number().int(),
		is_active: booleanType()
	}),
	articles: objectType({
		slug: stringType().min(1),
		title: stringType().min(1),
		excerpt: stringType(),
		content: stringType(),
		category: stringType(),
		author: stringType(),
		read_minutes: coerce.number().int().positive(),
		status: enumType([
			"draft",
			"published",
			"archived"
		]),
		published_at: stringType().nullable()
	}),
	vip_packages: objectType({
		name: stringType().min(1),
		slug: stringType().min(1),
		price: coerce.number().nonnegative(),
		currency: stringType().min(3),
		duration_days: coerce.number().int().positive(),
		description: stringType(),
		benefits: arrayType(stringType()),
		is_active: booleanType(),
		sort_order: coerce.number().int()
	}),
	page_sections: objectType({
		page_slug: stringType().min(1),
		section_type: stringType().min(1),
		heading: stringType().nullable(),
		content: recordType(unknownType()),
		sort_order: coerce.number().int(),
		is_active: booleanType()
	}),
	site_settings: objectType({
		key: stringType().min(1).optional(),
		value: recordType(unknownType()),
		is_public: booleanType()
	}),
	feedback: objectType({ status: enumType([
		"new",
		"open",
		"in_progress",
		"replied",
		"closed"
	]) }),
	profiles: objectType({
		full_name: stringType().nullable(),
		phone: stringType().nullable(),
		country: stringType().nullable(),
		membership_status: stringType().min(1)
	}),
	vip_requests: objectType({ status: stringType().min(1) }),
	vip_subscriptions: objectType({
		user_id: stringType().uuid(),
		expires_at: stringType().datetime({ offset: true })
	})
};
var saveAdminRecord_createServerFn_handler = createServerRpc({
	id: "697091183a48c7df886f475d5fafdb951ec26ab85abe665cbc5823205898d346",
	name: "saveAdminRecord",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveAdminRecord.__executeServer(opts));
var saveAdminRecord = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	entity,
	id: stringType().optional(),
	values: recordType(unknownType())
}).parse(input)).handler(saveAdminRecord_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context);
	const values = schemas[data.entity].parse(data.values);
	const db = context.supabase;
	const { error } = await (data.entity === "vip_subscriptions" ? db.from(data.entity).upsert(values, { onConflict: "user_id" }) : data.id ? db.from(data.entity).update(values).eq(data.entity === "site_settings" ? "key" : "id", data.id) : db.from(data.entity).insert(values));
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteAdminRecord_createServerFn_handler = createServerRpc({
	id: "f620d6f53c15ac8037f7e44924ca83463da8fd7096a10262868e1c9d66b67f79",
	name: "deleteAdminRecord",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteAdminRecord.__executeServer(opts));
var deleteAdminRecord = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	entity: enumType([
		"predictions",
		"prediction_categories",
		"articles",
		"vip_packages",
		"page_sections",
		"site_settings",
		"feedback",
		"vip_requests"
	]),
	id: stringType().min(1)
}).parse(input)).handler(deleteAdminRecord_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context);
	const { error } = await context.supabase.from(data.entity).delete().eq(data.entity === "site_settings" ? "key" : "id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteAdminRecord_createServerFn_handler, getAdminData_createServerFn_handler, saveAdminRecord_createServerFn_handler };
