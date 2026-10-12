import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as Route } from "./legal._slug-WKdto0NY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal._slug-CQDGTrYI.js
var import_jsx_runtime = require_jsx_runtime();
function Legal() {
	const p = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Policies",
		title: p.title,
		copy: "Last updated by the KAADA PREDICTZ team."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl whitespace-pre-line px-4 py-12 leading-8 text-muted-foreground",
		children: p.text
	})] });
}
//#endregion
export { Legal as component };
