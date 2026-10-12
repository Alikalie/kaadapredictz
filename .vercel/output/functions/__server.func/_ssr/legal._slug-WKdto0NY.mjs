import { Y as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as publicContentQuery, n as getSetting, o as str, r as pageMeta } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal._slug-WKdto0NY.js
var $$splitComponentImporter = () => import("./legal._slug-CQDGTrYI.mjs");
var Route = createFileRoute("/legal/$slug")({
	loader: async ({ params, context }) => {
		const data = await context.queryClient.ensureQueryData(publicContentQuery);
		const p = getSetting(data.settings, "legal")[params.slug];
		if (!p || typeof p !== "object") throw notFound();
		return {
			title: str(p.title, "Policy"),
			text: str(p.text)
		};
	},
	head: ({ loaderData }) => pageMeta(loaderData?.title ?? "Legal", loaderData?.text.slice(0, 150) || "KAADA PREDICTZ policies."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
