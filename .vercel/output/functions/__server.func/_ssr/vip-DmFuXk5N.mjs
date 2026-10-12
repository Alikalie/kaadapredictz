import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Check, x as Crown } from "../_libs/lucide-react.mjs";
import { i as TrustNotice, t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as supabase } from "./client-BV7ZnbDg.mjs";
import { n as requestVip } from "./member.functions-DndwjCkW.mjs";
import { t as q } from "./vip-DI6rmjIq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vip-DmFuXk5N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { data } = useSuspenseQuery(q);
	const request = useServerFn(requestVip);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "KAADA VIP",
		title: "More analysis. More context.",
		copy: "Choose the package you want and send a membership request."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: data.packages.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `border p-7 ${i === 1 ? "border-primary bg-accent/30" : "border-border bg-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-8 font-display text-2xl font-black",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: p.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-7 font-display text-4xl font-black",
							children: [
								p.currency,
								" ",
								Number(p.price).toFixed(0),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-sans text-xs text-muted-foreground",
									children: [
										"/ ",
										p.duration_days,
										" days"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "my-7 space-y-3",
							children: p.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" }), b]
							}, b))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							disabled: Boolean(busy),
							onClick: async () => {
								const { data: session } = await supabase.auth.getSession();
								if (!session.session) {
									setMessage("Log in or register before requesting VIP.");
									return;
								}
								setBusy(p.id);
								setMessage("");
								try {
									await request({ data: {
										package_id: p.id,
										message: `Request for ${p.name}`
									} });
									setMessage(`${p.name} request sent. Support will contact you.`);
								} catch (e) {
									setMessage(e instanceof Error ? e.message : "Request failed.");
								} finally {
									setBusy("");
								}
							},
							children: busy === p.id ? "Sending…" : "Request VIP"
						})
					]
				}, p.id))
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between gap-4 border border-primary p-4 text-sm text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message }), message.startsWith("Log") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: "Member login"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
			})
		]
	})] });
}
//#endregion
export { Page as component };
