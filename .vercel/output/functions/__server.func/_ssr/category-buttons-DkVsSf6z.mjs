import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category-buttons-DkVsSf6z.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryButtons({ categories, selected }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Prediction categories",
		className: "mb-8 flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: selected ? "outline" : "default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/predictions",
				children: "All tips"
			})
		}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: selected === c.slug ? "default" : "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/predictions/$category",
				params: { category: c.slug },
				children: c.name
			})
		}, c.id))]
	});
}
//#endregion
export { CategoryButtons as t };
