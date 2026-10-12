import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as TrustNotice } from "./site-shell-C3fk-1Mw.mjs";
import { t as Route } from "./guides._slug-C8dKXVpz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides._slug-CUbMmKNt.js
var import_jsx_runtime = require_jsx_runtime();
function Article() {
	const a = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-4xl px-4 py-14 lg:px-8",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-black leading-tight",
				children: a.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: ["By ", a.author]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "my-8 text-xl leading-8",
				children: a.excerpt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10 whitespace-pre-wrap leading-8 text-muted-foreground",
				children: a.content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
		]
	});
}
//#endregion
export { Article as component };
