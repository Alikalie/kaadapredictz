import { Y as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicContent } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prediction._slug-DU14iUQD.js
var q = queryOptions({
	queryKey: ["public-content"],
	queryFn: () => getPublicContent()
});
var $$splitComponentImporter = () => import("./prediction._slug-Cbd-VaBw.mjs");
var Route = createFileRoute("/prediction/$slug")({
	loader: async ({ context, params }) => {
		const d = await context.queryClient.ensureQueryData(q);
		if (!d.predictions.some((p) => p.slug === params.slug)) throw notFound();
		return d;
	},
	head: ({ params }) => ({ meta: [
		{ title: `${params.slug.replaceAll("-", " ")} — KAADA PREDICTZ` },
		{
			name: "description",
			content: "Match prediction, odds and analyst notes."
		},
		{
			property: "og:title",
			content: "Match analysis — KAADA PREDICTZ"
		},
		{
			property: "og:description",
			content: "Match prediction, odds and analyst notes."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { q as n, Route as t };
