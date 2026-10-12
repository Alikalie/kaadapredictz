import { b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as publicContentQuery } from "./public-content-3e7hakun.mjs";
import { t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-9BBZSzUR.js
var import_jsx_runtime = require_jsx_runtime();
function Guides() {
	const { data } = useSuspenseQuery(publicContentQuery);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname !== "/guides" && pathname !== "/guides/") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Knowledge center",
			title: "Tips & Guides",
			copy: "Market insight from the KAADA PREDICTZ editorial team."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl divide-y divide-border px-4 py-10 lg:px-8",
			children: data.articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guides/$slug",
				params: { slug: a.slug },
				className: "block py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							a.category,
							" · ",
							a.read_minutes,
							" min read"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold hover:text-primary",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl leading-7 text-muted-foreground",
						children: a.excerpt
					})
				]
			}, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	] });
}
//#endregion
export { Guides as component };
