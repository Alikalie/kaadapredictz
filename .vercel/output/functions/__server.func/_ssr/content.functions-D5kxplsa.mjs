import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-D5kxplsa.js
function publicClient() {
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
	const url = process.env["SUPABASE_URL"];
	if (!key || !url) throw new Error("Content service is not configured.");
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
var getPublicContent_createServerFn_handler = createServerRpc({
	id: "d02d33bcd1641fee1a4168974507a03d2bce23ba82be7c02dd6e7a8d0960a808",
	name: "getPublicContent",
	filename: "src/lib/content.functions.ts"
}, (opts) => getPublicContent.__executeServer(opts));
var getPublicContent = createServerFn({ method: "GET" }).handler(getPublicContent_createServerFn_handler, async () => {
	const db = publicClient();
	const [categories, predictions, articles, packages, sections, settings] = await Promise.all([
		db.from("prediction_categories").select("*").eq("is_active", true).order("sort_order"),
		db.from("predictions").select("*, prediction_categories(name,slug)").eq("access_level", "public").neq("status", "draft").order("kickoff"),
		db.from("articles").select("*").eq("status", "published").order("published_at", { ascending: false }),
		db.from("vip_packages").select("*").eq("is_active", true).order("sort_order"),
		db.from("page_sections").select("*").eq("is_active", true).order("sort_order"),
		db.from("site_settings").select("*").eq("is_public", true)
	]);
	const error = categories.error ?? predictions.error ?? articles.error ?? packages.error ?? sections.error ?? settings.error;
	if (error) throw new Error(error.message);
	return {
		categories: categories.data ?? [],
		predictions: predictions.data ?? [],
		articles: articles.data ?? [],
		packages: packages.data ?? [],
		sections: sections.data ?? [],
		settings: settings.data ?? []
	};
});
//#endregion
export { getPublicContent_createServerFn_handler };
