import { r as __toESM } from "../_runtime.mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as publicContentQuery, n as getSetting, o as str } from "./public-content-3e7hakun.mjs";
import { m as Mail, o as ShieldCheck, p as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as FaTelegramPlane, r as FaWhatsapp, t as FaFacebookF } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-C3fk-1Mw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CookieBanner() {
	const { data } = useQuery(publicContentQuery);
	const text = str(getSetting(data?.settings, "cookies").text, "We use essential cookies to keep you signed in and improve your experience.");
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setShow(!localStorage.getItem("kp-cookie-consent"));
	}, []);
	if (!show) return null;
	const choose = (v) => {
		localStorage.setItem("kp-cookie-consent", v);
		setShow(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-label": "Cookie consent",
		className: "fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-col gap-3 border border-primary/40 bg-card p-4 shadow-2xl sm:flex-row sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex-1 text-sm text-muted-foreground",
			children: [
				text,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/legal/$slug",
					params: { slug: "cookies" },
					className: "font-bold text-primary",
					children: "Cookie Policy"
				}),
				"."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => choose("essential"),
				children: "Essential only"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => choose("all"),
				children: "Accept"
			})]
		})]
	});
}
function useSettings() {
	const { data } = useQuery(publicContentQuery);
	return data?.settings;
}
var nav = [
	["Predictions", "/predictions"],
	["Results", "/results"],
	["VIP", "/vip"],
	["Tips & Guides", "/guides"],
	["About", "/about"],
	["Contact", "/contact"]
];
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		"aria-label": "KAADA PREDICTZ home",
		className: "inline-flex shrink-0 items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/kaada-predictz-logo.jpeg",
			alt: "KAADA PREDICTZ",
			width: 128,
			height: 64,
			className: "h-12 w-24 object-contain"
		})
	});
}
function SiteShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname === "/admin" || pathname.startsWith("/admin/")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-7 lg:flex",
							children: nav.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: `text-sm font-semibold transition-colors hover:text-primary ${pathname.startsWith(to) ? "text-primary" : "text-muted-foreground"}`,
								children: label
							}, to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden items-center gap-2 lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/vip",
									children: "Join VIP"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"aria-label": "Toggle menu",
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							onClick: () => setOpen(!open),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "border-t border-border px-4 py-4 lg:hidden",
					children: nav.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to,
						onClick: () => setOpen(false),
						className: "block border-b border-border py-3 text-sm font-bold",
						children: label
					}, to))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieBanner, {})
		]
	});
}
function SiteFooter() {
	const settings = useSettings();
	const f = getSetting(settings, "footer");
	const c = getSetting(settings, "contact");
	const legal = getSetting(settings, "legal");
	const links = Array.isArray(f.links) ? f.links.filter((l) => l && typeof l.label === "string" && typeof l.url === "string") : [];
	const isInternal = (u) => u.startsWith("/");
	const wa = str(c.whatsapp).replace(/[^0-9]/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-sm leading-6 text-muted-foreground",
					children: str(f.about, "Football analysis built on form, context and transparent results.")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-black uppercase tracking-widest",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3",
					children: [links.map((l) => isInternal(l.url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.url,
						className: "text-sm text-muted-foreground hover:text-primary",
						children: l.label
					}, l.url + l.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.url,
						target: "_blank",
						rel: "noreferrer",
						className: "text-sm text-muted-foreground hover:text-primary",
						children: l.label
					}, l.url + l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "text-sm text-muted-foreground hover:text-primary",
						children: "My account"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black uppercase tracking-widest",
						children: "Contact"
					}),
					str(c.email) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${c.email}`,
						className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 shrink-0" }), c.email]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [
							wa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://wa.me/${wa}`,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "WhatsApp",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWhatsapp, {})
								})
							}),
							str(c.telegram) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: c.telegram,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "Telegram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTelegramPlane, {})
								})
							}),
							str(c.facebook) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: c.facebook,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "Facebook",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFacebookF, {})
								})
							})
						]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: str(f.copyright, "© 2026 KAADA PREDICTZ. All rights reserved.") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-4",
					children: Object.entries(legal).map(([slug, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/legal/$slug",
						params: { slug },
						className: "hover:text-primary",
						children: str(v?.title, slug)
					}, slug))
				})]
			})
		})]
	});
}
function PageHeader({ eyebrow, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-base leading-7 text-muted-foreground",
					children: copy
				})
			]
		})
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `status status-${status}`,
		children: status
	});
}
function TrustNotice() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3 border border-border bg-card p-4 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "text-foreground",
			children: "Stay in control."
		}), " Predictions are opinions based on available information. Past performance does not guarantee future results. 18+ only."] })]
	});
}
//#endregion
export { TrustNotice as i, SiteShell as n, StatusBadge as r, PageHeader as t };
