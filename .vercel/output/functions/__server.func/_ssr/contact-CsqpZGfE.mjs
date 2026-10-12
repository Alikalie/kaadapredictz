import { r as __toESM } from "../_runtime.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createSsrRpc, t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as publicContentQuery } from "./public-content-3e7hakun.mjs";
import { c as Send, m as Mail } from "../_libs/lucide-react.mjs";
import { n as FaTelegramPlane, r as FaWhatsapp, t as FaFacebookF } from "../_libs/react-icons.mjs";
import { t as PageHeader } from "./site-shell-C3fk-1Mw.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as Input } from "./input-CiqlLNuO.mjs";
import { t as Textarea } from "./textarea-Zwyns5GP.mjs";
import { a as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CsqpZGfE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sendFeedback = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	full_name: stringType().trim().min(2).max(100),
	email: stringType().email().max(254),
	whatsapp: stringType().trim().max(40),
	subject: stringType().trim().min(2).max(150),
	message: stringType().trim().min(10).max(4e3)
}).parse(input)).handler(createSsrRpc("818152a5f73402dbcb2f910ed4c59624a33c31422c72c570b0fb0298b67de84c"));
function Contact() {
	const { data } = useSuspenseQuery(publicContentQuery);
	const setting = data.settings.find((s) => s.key === "contact")?.value;
	const contact = typeof setting === "object" && setting && !Array.isArray(setting) ? setting : {};
	const email = typeof contact.email === "string" ? contact.email : "fofanahalikalie0@gmail.com";
	const whatsapp = typeof contact.whatsapp === "string" ? contact.whatsapp : "";
	const telegram = typeof contact.telegram === "string" ? contact.telegram : "https://t.me/kaadapredictz";
	const facebook = typeof contact.facebook === "string" ? contact.facebook : "https://facebook.com/kaadapredictz";
	const send = useServerFn(sendFeedback);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Support",
		title: "Contact KAADA PREDICTZ",
		copy: "Questions, corrections, VIP requests and account support."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[.75fr_1.25fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-black",
			children: "Support channels"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${email}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), email]
					})
				}),
				whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWhatsapp, {}), "WhatsApp support"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "justify-start",
					disabled: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWhatsapp, {}), "WhatsApp number coming soon"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: telegram,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTelegramPlane, {}), "Telegram"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: facebook,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFacebookF, {}), "Facebook"]
					})
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-5 border-l border-border pl-0 lg:pl-10",
			onSubmit: async (e) => {
				e.preventDefault();
				const form = e.currentTarget;
				const d = new FormData(form);
				setBusy(true);
				setMessage("");
				try {
					const r = await send({ data: {
						full_name: String(d.get("full_name")),
						email: String(d.get("email")),
						whatsapp: String(d.get("whatsapp")),
						subject: String(d.get("subject")),
						message: String(d.get("message"))
					} });
					setMessage(`Message received. Reference: ${r.reference}`);
					form.reset();
				} catch (error) {
					setMessage(error instanceof Error ? error.message : "Message could not be sent.");
				} finally {
					setBusy(false);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-black",
					children: "Send support a message"
				}),
				[
					[
						"Name",
						"full_name",
						"text"
					],
					[
						"Email",
						"email",
						"email"
					],
					[
						"WhatsApp number (optional)",
						"whatsapp",
						"tel"
					],
					[
						"Subject",
						"subject",
						"text"
					]
				].map(([label, name, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name,
						type,
						required: name !== "whatsapp",
						maxLength: name === "email" ? 254 : 150
					})]
				}, name)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-2 text-sm",
					children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "message",
						required: true,
						minLength: 10,
						maxLength: 4e3,
						rows: 6
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: busy,
					type: "submit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), busy ? "Sending…" : "Send message"]
				}),
				message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "text-sm text-primary",
					children: message
				})
			]
		})]
	})] });
}
//#endregion
export { Contact as component };
