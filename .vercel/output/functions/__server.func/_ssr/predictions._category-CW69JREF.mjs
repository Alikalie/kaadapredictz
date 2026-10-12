import { Y as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicContent } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions._category-CW69JREF.js
var q = queryOptions({
	queryKey: ["public-content"],
	queryFn: () => getPublicContent()
});
var $$splitComponentImporter = () => import("./predictions._category-CWQykm5p.mjs");
var Route = createFileRoute("/predictions/$category")({
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(q);
		if (!data.categories.some((c) => c.slug === params.category)) throw notFound();
		return data;
	},
	head: ({ params }) => ({ meta: [
		{ title: `${params.category.replaceAll("-", " ")} Predictions — KAADA PREDICTZ` },
		{
			name: "description",
			content: "Current football market selections and analysis."
		},
		{
			property: "og:title",
			content: `${params.category} predictions — KAADA PREDICTZ`
		},
		{
			property: "og:description",
			content: "Current football market selections and analysis."
		},
		{
			property: "og:type",
			content: "website"
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
