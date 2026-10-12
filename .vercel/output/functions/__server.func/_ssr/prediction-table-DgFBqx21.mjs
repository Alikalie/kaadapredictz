import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Clock3, k as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { r as StatusBadge } from "./site-shell-C3fk-1Mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prediction-table-DgFBqx21.js
var import_jsx_runtime = require_jsx_runtime();
function PredictionTable({ items }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border border-dashed border-border p-10 text-center text-muted-foreground",
		children: "No predictions match this view."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto border border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[760px] text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "Published football predictions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border bg-muted/50 text-[10px] font-black uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Competition / kickoff",
						"Fixture",
						"Selection",
						"Odds",
						"Result",
						"Analysis"
					].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-5 py-3",
						children: label
					}, label)) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0 hover:bg-accent/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-primary",
								children: p.league
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 whitespace-nowrap text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3" }),
									new Date(p.kickoff).toLocaleString("en-GB", {
										timeZone: "UTC",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit"
									}),
									" UTC"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-display text-sm font-bold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/prediction/$slug",
								params: { slug: p.slug },
								className: "hover:text-primary",
								children: [
									p.home_team,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2 text-xs text-muted-foreground",
										children: "vs"
									}),
									p.away_team
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: p.selection
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: p.prediction_categories?.name ?? p.market
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4 font-display text-lg font-black",
							children: Number(p.odds).toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/prediction/$slug",
								params: { slug: p.slug },
								"aria-label": `Analysis for ${p.home_team} vs ${p.away_team}`,
								className: "text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5" })
							})
						})
					]
				}, p.id)) })
			]
		})
	});
}
//#endregion
export { PredictionTable as t };
