import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as settled, i as publicContentQuery } from "./public-content-3e7hakun.mjs";
import { i as TrustNotice, t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as Input } from "./input-CiqlLNuO.mjs";
import { t as PredictionTable } from "./prediction-table-DgFBqx21.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-BrGbZYtM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Results() {
	const { data } = useSuspenseQuery(publicContentQuery);
	const [category, setCategory] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [date, setDate] = (0, import_react.useState)("");
	const past = data.predictions.filter((p) => settled(p.status) || new Date(p.kickoff).getTime() < Date.now()).sort((a, b) => Date.parse(b.kickoff) - Date.parse(a.kickoff));
	const done = past.filter((p) => settled(p.status));
	const wins = done.filter((p) => p.status === "won").length;
	const decided = done.filter((p) => p.status !== "void").length;
	const shown = past.filter((p) => (category === "all" || p.category_id === category) && (status === "all" || (status === "unsettled" ? !settled(p.status) : p.status === status)) && (!date || p.kickoff.slice(0, 10) === date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "The public record",
		title: "Results & Past Matches",
		copy: "Wins, losses, void selections and past fixtures awaiting a recorded result."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 grid gap-px bg-border sm:grid-cols-3",
				children: [
					["Settled", done.length],
					["Won", wins],
					["Win rate (excludes void)", decided ? `${Math.round(wins / decided * 100)}%` : "—"]
				].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-4xl font-black",
						children: v
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: category === "all" ? "default" : "outline",
					onClick: () => setCategory("all"),
					children: "All categories"
				}), data.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: category === c.id ? "default" : "outline",
					onClick: () => setCategory(c.id),
					children: c.name
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-end gap-2",
				children: [
					[
						["all", "All results"],
						["won", "Won"],
						["lost", "Lost"],
						["void", "Void"],
						["unsettled", "Awaiting result"]
					].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: status === value ? "secondary" : "ghost",
						onClick: () => setStatus(String(value)),
						children: label
					}, value)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto grid gap-1 text-xs text-muted-foreground",
						children: ["Match date (UTC)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							"aria-label": "Match date"
						})]
					}),
					date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setDate(""),
						children: "Clear date"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionTable, { items: shown }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
			})
		]
	})] });
}
//#endregion
export { Results as component };
