import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as publicContentQuery } from "./public-content-3e7hakun.mjs";
import { i as TrustNotice, t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CgGZ28_8.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const { data } = useSuspenseQuery(publicContentQuery);
	const cards = data.sections.filter((s) => s.page_slug === "about");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Our approach",
		title: "About KAADA PREDICTZ",
		copy: "Independent football analysis with a transparent record of every selection."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-4 px-4 py-12 sm:grid-cols-2",
		children: [cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border border-border bg-card p-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold",
				children: card.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-8 text-muted-foreground",
				children: typeof card.content === "object" && card.content && !Array.isArray(card.content) && typeof card.content.body === "string" ? card.content.body : ""
			})]
		}, card.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
		})]
	})] });
}
//#endregion
export { About as component };
