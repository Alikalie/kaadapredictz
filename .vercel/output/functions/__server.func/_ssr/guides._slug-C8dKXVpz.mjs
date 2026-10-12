import { Y as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as publicContentQuery, r as pageMeta } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides._slug-C8dKXVpz.js
var $$splitComponentImporter = () => import("./guides._slug-CUbMmKNt.mjs");
var Route = createFileRoute("/guides/$slug")({
	loader: async ({ context, params }) => {
		const article = (await context.queryClient.ensureQueryData(publicContentQuery)).articles.find((a) => a.slug === params.slug);
		if (!article) throw notFound();
		return article;
	},
	head: ({ loaderData }) => pageMeta(loaderData?.title ?? "Football guide", loaderData?.excerpt ?? "KAADA PREDICTZ football market guide.", "article"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
