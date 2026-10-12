import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as settled } from "./public-content-3e7hakun.mjs";
import { i as TrustNotice, t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as PredictionTable } from "./prediction-table-DgFBqx21.mjs";
import { t as CategoryButtons } from "./category-buttons-DkVsSf6z.mjs";
import { n as q, t as Route } from "./predictions._category-CW69JREF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions._category-CWQykm5p.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { category } = Route.useParams();
	const { data } = useSuspenseQuery(q);
	const cat = data.categories.find((c) => c.slug === category);
	const items = data.predictions.filter((p) => p.prediction_categories?.slug === category && !settled(p.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Market predictions",
		title: cat?.name ?? category.replaceAll("-", " "),
		copy: cat?.description ?? "Current selections for this market."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryButtons, {
				categories: data.categories,
				selected: category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionTable, { items }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
			})
		]
	})] });
}
//#endregion
export { Page as component };
