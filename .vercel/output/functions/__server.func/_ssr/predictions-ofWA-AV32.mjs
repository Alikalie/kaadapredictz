import { g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as settled } from "./public-content-3e7hakun.mjs";
import { i as TrustNotice, t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as PredictionTable } from "./prediction-table-DgFBqx21.mjs";
import { t as q } from "./predictions-CGh9dNHv.mjs";
import { t as CategoryButtons } from "./category-buttons-DkVsSf6z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions-ofWA-AV32.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { data } = useSuspenseQuery(q);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname !== "/predictions" && pathname !== "/predictions/") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Prediction center",
			title: "Football Predictions",
			copy: "Published selections from the KAADA PREDICTZ analysts."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryButtons, { categories: data.categories }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionTable, { items: data.predictions.filter((p) => !settled(p.status)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	] });
}
//#endregion
export { Page as component };
