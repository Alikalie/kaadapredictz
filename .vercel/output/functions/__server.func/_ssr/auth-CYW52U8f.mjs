import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as supabase } from "./client-BV7ZnbDg.mjs";
import { t as Input } from "./input-CiqlLNuO.mjs";
import { t as Route } from "./auth-BdbAdaJT.mjs";
import { r as saveMyProfile } from "./member.functions-DndwjCkW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CYW52U8f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Auth() {
	const [signup, setSignup] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const saveProfile = useServerFn(saveMyProfile);
	const navigate = Route.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "KAADA members"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-3xl font-black",
				children: signup ? "Create your account" : "Member login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-5",
				onSubmit: async (e) => {
					e.preventDefault();
					const d = new FormData(e.currentTarget);
					setBusy(true);
					setMessage("");
					try {
						const credentials = {
							email: String(d.get("email")),
							password: String(d.get("password"))
						};
						if (signup) {
							const { data, error } = await supabase.auth.signUp({
								...credentials,
								options: { data: { full_name: String(d.get("full_name")) } }
							});
							if (error) throw error;
							if (!data.session) throw new Error("Account created, but automatic sign-in was unavailable. Please log in.");
							await saveProfile({ data: {
								full_name: String(d.get("full_name")),
								phone: String(d.get("phone")),
								country: String(d.get("country"))
							} });
						} else {
							const { error } = await supabase.auth.signInWithPassword(credentials);
							if (error) throw error;
						}
						await navigate({ to: "/dashboard" });
					} catch (e) {
						setMessage(e instanceof Error ? e.message : "Unable to access your account.");
					} finally {
						setBusy(false);
					}
				},
				children: [
					signup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "full_name",
								required: true,
								minLength: 2
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Phone / WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "phone",
								type: "tel",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Country", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "country",
								required: true
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							name: "email",
							required: true,
							autoComplete: "email"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							name: "password",
							minLength: 8,
							required: true,
							autoComplete: signup ? "new-password" : "current-password"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						children: busy ? "Please wait…" : signup ? "Create member account" : "Log in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => {
							setSignup(!signup);
							setMessage("");
						},
						children: signup ? "Already a member? Log in" : "New member? Register"
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-primary",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/legal/$slug",
						params: { slug: "privacy" },
						className: "text-center text-xs text-muted-foreground",
						children: "Privacy"
					})
				]
			})
		]
	});
}
//#endregion
export { Auth as component };
