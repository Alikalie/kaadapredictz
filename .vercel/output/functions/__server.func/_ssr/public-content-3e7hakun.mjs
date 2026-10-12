import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { r as createSsrRpc } from "./createSsrRpc-D8gkU3RZ.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-content-3e7hakun.js
var getPublicContent = createServerFn({ method: "GET" }).handler(createSsrRpc("d02d33bcd1641fee1a4168974507a03d2bce23ba82be7c02dd6e7a8d0960a808"));
var publicContentQuery = queryOptions({
	queryKey: ["public-content"],
	queryFn: () => getPublicContent(),
	staleTime: 3e4
});
function pageMeta(title, description, type = "website") {
	const fullTitle = `${title} — KAADA PREDICTZ`;
	return { meta: [
		{ title: fullTitle },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: fullTitle
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: type
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
var settled = (status) => [
	"won",
	"lost",
	"void"
].includes(status);
/** Read an admin-managed site setting as a plain object. */
function getSetting(settings, key) {
	const v = settings?.find((s) => s.key === key)?.value;
	return v && typeof v === "object" && !Array.isArray(v) ? v : {};
}
var str = (v, fallback = "") => typeof v === "string" && v.trim() ? v : fallback;
//#endregion
export { settled as a, publicContentQuery as i, getSetting as n, str as o, pageMeta as r, getPublicContent as t };
