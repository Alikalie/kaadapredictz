import { r as __toESM } from "../_runtime.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as cn, r as createSsrRpc, t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { D as CalendarClock, S as Cookie, _ as LayoutDashboard, a as Target, b as FileText, d as Plus, f as PenLine, h as LogOut, i as Trash2, l as Search, n as Users, p as Menu, s as Settings, t as X, u as RefreshCw, v as Layers, x as Crown, y as Inbox } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dcy-eaQM.mjs";
import { t as supabase } from "./client-BV7ZnbDg.mjs";
import { t as Input } from "./input-CiqlLNuO.mjs";
import { t as predictionMetrics } from "./prediction-metrics-Bq_Ay-DL.mjs";
import { t as Textarea } from "./textarea-Zwyns5GP.mjs";
import { a as objectType, c as unknownType, i as enumType, o as recordType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-2aDc4m8M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var entity = enumType([
	"predictions",
	"prediction_categories",
	"articles",
	"vip_packages",
	"page_sections",
	"site_settings",
	"feedback",
	"profiles",
	"vip_requests",
	"vip_subscriptions"
]);
var getAdminData = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e"));
var saveAdminRecord = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	entity,
	id: stringType().optional(),
	values: recordType(unknownType())
}).parse(input)).handler(createSsrRpc("697091183a48c7df886f475d5fafdb951ec26ab85abe665cbc5823205898d346"));
var deleteAdminRecord = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	entity: enumType([
		"predictions",
		"prediction_categories",
		"articles",
		"vip_packages",
		"page_sections",
		"site_settings",
		"feedback",
		"vip_requests"
	]),
	id: stringType().min(1)
}).parse(input)).handler(createSsrRpc("f620d6f53c15ac8037f7e44924ca83463da8fd7096a10262868e1c9d66b67f79"));
function AdminAccuracy({ rows }) {
	const metrics = predictionMetrics(rows.map((r) => ({
		status: String(r.status),
		kickoff: String(r.kickoff),
		result_recorded_at: r.result_recorded_at ? String(r.result_recorded_at) : null
	})));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8 border-b border-border pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-black",
				children: "Prediction performance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-5 grid grid-cols-2 gap-5 md:grid-cols-4",
				children: [
					["Accuracy", metrics.accuracy === null ? "—" : `${metrics.accuracy}%`],
					["Won", metrics.won],
					["Lost", metrics.lost],
					["Awaiting result", metrics.pending]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl font-black text-primary",
					children: value
				})] }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-xs text-muted-foreground",
				children: "Wins ÷ wins and losses. Void selections excluded. All published public and VIP picks."
			}),
			metrics.months.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: metrics.months.map((m) => {
					const rate = m.won + m.lost ? Math.round(m.won / (m.won + m.lost) * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[70px_1fr_90px] items-center gap-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.month }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
								"aria-label": `Accuracy ${m.month}`,
								value: rate,
								max: 100,
								className: "accuracy-progress w-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								rate,
								"% · ",
								m.won + m.lost,
								" picks"
							] })
						]
					}, m.month);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No recorded outcomes yet."
			})
		]
	});
}
var sections = [
	["predictions", "Predictions & results"],
	["prediction_categories", "Categories"],
	["articles", "Tips & guides"],
	["vip_packages", "VIP packages"],
	["page_sections", "About & page content"],
	["site_settings", "Site settings"],
	["feedback", "Support inbox"],
	["profiles", "Members"],
	["vip_requests", "VIP requests"],
	["vip_subscriptions", "VIP subscriptions"]
];
var editable = {
	predictions: [
		"slug",
		"league",
		"home_team",
		"away_team",
		"kickoff",
		"category_id",
		"market",
		"selection",
		"odds",
		"confidence",
		"analysis",
		"venue",
		"status",
		"is_featured",
		"access_level"
	],
	prediction_categories: [
		"name",
		"slug",
		"description",
		"sort_order",
		"is_active"
	],
	articles: [
		"slug",
		"title",
		"excerpt",
		"content",
		"category",
		"author",
		"read_minutes",
		"status",
		"published_at"
	],
	vip_packages: [
		"name",
		"slug",
		"price",
		"currency",
		"duration_days",
		"description",
		"benefits",
		"is_active",
		"sort_order"
	],
	page_sections: [
		"page_slug",
		"section_type",
		"heading",
		"content",
		"sort_order",
		"is_active"
	],
	site_settings: [
		"key",
		"value",
		"is_public"
	],
	feedback: ["status"],
	profiles: [
		"full_name",
		"phone",
		"country",
		"membership_status"
	],
	vip_requests: ["status"],
	vip_subscriptions: ["user_id", "expires_at"]
};
var createable = [
	"predictions",
	"prediction_categories",
	"articles",
	"vip_packages",
	"page_sections",
	"site_settings",
	"vip_subscriptions"
];
var deletable = [
	"predictions",
	"prediction_categories",
	"articles",
	"vip_packages",
	"page_sections",
	"site_settings",
	"feedback",
	"vip_requests"
];
var sectionIcons = {
	predictions: Target,
	prediction_categories: Layers,
	articles: FileText,
	vip_packages: Crown,
	page_sections: LayoutDashboard,
	site_settings: Settings,
	feedback: Inbox,
	profiles: Users,
	vip_requests: Crown,
	vip_subscriptions: CalendarClock
};
var contactFields = [
	["name", "Support name"],
	["email", "Email"],
	["whatsapp", "WhatsApp number (with country code)"],
	["telegram", "Telegram link"],
	["facebook", "Facebook link"],
	["address", "Address"]
];
var labels = {
	home_team: "Home team",
	away_team: "Away team",
	category_id: "Category",
	published_at: "Published at",
	read_minutes: "Read time (minutes)",
	duration_days: "Duration (days)",
	is_active: "Active",
	is_featured: "Featured",
	sort_order: "Order",
	page_slug: "Page",
	section_type: "Section type",
	membership_status: "Membership"
};
function Admin() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setReady(true);
		});
		const { data } = supabase.auth.onAuthStateChange((_e, s) => {
			setSession(s);
			setReady(true);
		});
		return () => data.subscription.unsubscribe();
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-20",
		children: "Checking administrator access…"
	});
	return session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {});
}
function AdminLogin() {
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Secure administration"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-black",
				children: "Admin login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-5",
				onSubmit: async (e) => {
					e.preventDefault();
					const d = new FormData(e.currentTarget);
					setBusy(true);
					setMessage("");
					const { error } = await supabase.auth.signInWithPassword({
						email: String(d.get("email")),
						password: String(d.get("password"))
					});
					if (error) setMessage(error.message);
					setBusy(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: ["Username or email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "email",
							type: "email",
							required: true,
							autoComplete: "username"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "password",
							type: "password",
							required: true,
							autoComplete: "current-password"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						children: busy ? "Signing in…" : "Login to admin board"
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: message
					})
				]
			})
		]
	});
}
function Dashboard() {
	const getData = useServerFn(getAdminData);
	const save = useServerFn(saveAdminRecord);
	const remove = useServerFn(deleteAdminRecord);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const [entity, setEntity] = (0, import_react.useState)("predictions");
	const [data, setData] = (0, import_react.useState)({});
	const [message, setMessage] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const load = async () => {
		setLoading(true);
		setMessage("");
		try {
			setData(await getData());
		} catch (e) {
			setMessage(e instanceof Error ? e.message : "Could not load admin data.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const rows = (data[entity] ?? []).filter((r) => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen lg:grid lg:grid-cols-[260px_minmax(0,1fr)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `admin-sidebar ${sidebarOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-50 w-[260px] flex-col border-r border-border bg-card lg:sticky lg:top-0 lg:flex lg:h-screen`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl font-black",
							children: ["KAADA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "PREDICTZ"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Administration"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"aria-label": "Close sidebar",
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							onClick: () => setSidebarOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-6 pb-2 pt-6 text-xs font-bold text-muted-foreground",
						children: "WORKSPACE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Admin sections",
						className: "flex-1 space-y-1 overflow-y-auto px-3",
						children: [sections.map(([id, label]) => {
							const Icon = sectionIcons[id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: entity === id ? "secondary" : "ghost",
								className: `h-11 w-full justify-start gap-3 ${entity === id ? "text-primary" : ""}`,
								onClick: () => {
									setEntity(id);
									setSearch("");
									setSidebarOpen(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: label
								})]
							}, id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "h-11 w-full justify-start gap-3",
							onClick: () => {
								setEntity("site_settings");
								setEditing((data.site_settings ?? []).find((r) => r.key === "cookies") ?? {
									key: "cookies",
									value: { text: "We use essential cookies to keep you signed in and improve your experience." },
									is_public: true
								});
								setSidebarOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cookie, { className: "size-4" }), "Cookie notice"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: "Site administrator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Secure workspace"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full justify-start",
							onClick: () => void supabase.auth.signOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Log out"]
						})]
					})
				]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-background/80 lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex h-20 items-center justify-between gap-4 border-b border-border px-5 lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"aria-label": "Open sidebar",
								variant: "outline",
								size: "icon",
								className: "lg:hidden",
								onClick: () => setSidebarOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Workspace / Overview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-xl font-bold",
								children: "Admin board"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => void load(),
							"aria-label": "Refresh",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: loading ? "animate-spin" : "" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 lg:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
							className: "min-w-0",
							children: [
								entity === "predictions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAccuracy, { rows: data.predictions ?? [] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mb-5 max-w-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"aria-label": "Search records",
										placeholder: "Search records…",
										value: search,
										onChange: (e) => setSearch(e.target.value),
										className: "pl-9"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-2xl font-black",
										children: sections.find((s) => s[0] === entity)?.[1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [rows.length, " records"]
									})] }), createable.includes(entity) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => setCreating(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add new"]
									})]
								}),
								message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "mb-5 border-l-2 border-destructive px-4 text-sm text-destructive",
									children: message
								}),
								loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full min-w-[760px] text-left text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-3",
													children: "Record"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-3",
													children: "Details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-3",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-3 text-right",
													children: "Actions"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => {
											const id = String(row.id ?? row.key ?? row.user_id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-t border-border",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-4 py-4 font-bold",
														children: String(row.title ?? row.name ?? (row.home_team ? `${row.home_team} vs ${row.away_team}` : void 0) ?? row.subject ?? row.heading ?? row.full_name ?? row.key ?? id)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "max-w-md truncate px-4 py-4 text-muted-foreground",
														children: String(row.home_team ? `${row.home_team} vs ${row.away_team}` : row.email ?? row.description ?? row.message ?? row.page_slug ?? "—")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-4 py-4",
														children: String(row.status ?? row.membership_status ?? (row.is_active === true ? "Active" : row.is_active === false ? "Inactive" : "—"))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-4 py-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex justify-end gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "icon",
																variant: "outline",
																"aria-label": "Edit",
																onClick: () => setEditing(row),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {})
															}), deletable.includes(entity) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																size: "icon",
																variant: "outline",
																"aria-label": "Delete",
																onClick: async () => {
																	if (!window.confirm("Delete this record permanently?")) return;
																	try {
																		await remove({ data: {
																			entity,
																			id
																		} });
																		await load();
																	} catch (e) {
																		setMessage(e instanceof Error ? e.message : "Delete failed.");
																	}
																},
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
															})]
														})
													})
												]
											}, id);
										}) })]
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
						open: creating || Boolean(editing),
						entity,
						row: editing,
						categories: data.prediction_categories ?? [],
						members: data.profiles ?? [],
						onClose: () => {
							setCreating(false);
							setEditing(null);
						},
						onSave: async (id, values) => {
							const existing = (data[entity] ?? []).some((r) => String(r.id ?? r.key ?? r.user_id) === id);
							await save({ data: {
								entity,
								id: existing ? id : void 0,
								values
							} });
							setCreating(false);
							setEditing(null);
							await load();
						}
					})
				]
			})
		]
	});
}
function RecordDialog({ open, entity, row, categories, members, onClose, onSave }) {
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[88vh] max-w-2xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
				row ? "Edit" : "Add",
				" ",
				sections.find((s) => s[0] === entity)?.[1]
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: async (e) => {
					e.preventDefault();
					const d = new FormData(e.currentTarget);
					const values = {};
					for (const key of editable[entity]) {
						const raw = d.get(key);
						if (entity === "site_settings" && row?.key === "contact" && key === "value") values[key] = {
							...row.value,
							...Object.fromEntries([
								"name",
								"email",
								"whatsapp",
								"telegram",
								"facebook",
								"address"
							].map((k) => [k, String(d.get(`contact_${k}`) ?? "")]))
						};
						else if (entity === "site_settings" && row?.key === "cookies" && key === "value") values[key] = {
							...row.value,
							text: String(d.get("cookie_text") ?? "")
						};
						else if (key === "expires_at") values[key] = new Date(String(raw)).toISOString();
						else if ([
							"is_active",
							"is_featured",
							"is_public"
						].includes(key)) values[key] = raw === "on";
						else if ([
							"odds",
							"confidence",
							"sort_order",
							"read_minutes",
							"price",
							"duration_days"
						].includes(key)) values[key] = Number(raw);
						else if (key === "benefits") values[key] = String(raw).split("\n").map((s) => s.trim()).filter(Boolean);
						else if (["content", "value"].includes(key)) try {
							values[key] = JSON.parse(String(raw || "{}"));
						} catch {
							setError(`${labels[key] ?? key} must be valid JSON.`);
							return;
						}
						else if ([
							"category_id",
							"venue",
							"published_at",
							"heading",
							"full_name",
							"phone",
							"country"
						].includes(key)) values[key] = raw ? String(raw) : null;
						else values[key] = String(raw ?? "");
					}
					setBusy(true);
					setError("");
					try {
						await onSave(row ? String(row.id ?? row.key ?? row.user_id) : void 0, values);
					} catch (e) {
						setError(e instanceof Error ? e.message : "Save failed.");
					} finally {
						setBusy(false);
					}
				},
				children: [
					editable[entity].map((key) => {
						const value = row?.[key];
						const label = labels[key] ?? key.replaceAll("_", " ");
						if (entity === "site_settings" && row?.key === "contact" && key === "value") {
							const contact = value ?? {};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4",
								children: contactFields.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2 text-sm",
									children: [l, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: `contact_${k}`,
										type: k === "email" ? "email" : "text",
										defaultValue: String(contact[k] ?? "")
									})]
								}, k))
							}, key);
						}
						if (entity === "site_settings" && row?.key === "cookies" && key === "value") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Cookie notice text", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "cookie_text",
								rows: 5,
								defaultValue: String(value?.text ?? "")
							})]
						}, key);
						if (key === "access_level") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Audience", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: key,
								defaultValue: String(value ?? "public"),
								className: "h-10 border border-input bg-background px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "public",
									children: "Public"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "vip",
									children: "VIP members"
								})]
							})]
						}, key);
						if (key === "user_id") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Member", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: key,
								required: true,
								defaultValue: String(value ?? ""),
								className: "h-10 border border-input bg-background px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Choose member"
								}), members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: String(m.id),
									children: String(m.full_name ?? m.id)
								}, String(m.id)))]
							})]
						}, key);
						if ([
							"is_active",
							"is_featured",
							"is_public"
						].includes(key)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: key,
								type: "checkbox",
								defaultChecked: Boolean(value)
							}), label]
						}, key);
						if (key === "category_id") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm capitalize",
							children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: key,
								defaultValue: String(value ?? ""),
								className: "h-10 border border-input bg-background px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "No category"
								}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: String(c.id),
									children: String(c.name)
								}, String(c.id)))]
							})]
						}, key);
						const large = [
							"analysis",
							"content",
							"excerpt",
							"description",
							"benefits",
							"message",
							"value"
						].includes(key);
						const shown = ["content", "value"].includes(key) ? JSON.stringify(value ?? {}, null, 2) : Array.isArray(value) ? value.join("\n") : String(value ?? "");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm capitalize",
							children: [label, large ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: key,
								rows: key === "content" || key === "value" ? 7 : 4,
								defaultValue: [
									"kickoff",
									"published_at",
									"expires_at"
								].includes(key) && shown ? new Date(shown).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16) : shown
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: key,
								type: key === "kickoff" || key === "published_at" || key === "expires_at" ? "datetime-local" : [
									"odds",
									"confidence",
									"sort_order",
									"read_minutes",
									"price",
									"duration_days"
								].includes(key) ? "number" : "text",
								step: key === "odds" || key === "price" ? "0.01" : void 0,
								defaultValue: [
									"kickoff",
									"published_at",
									"expires_at"
								].includes(key) && shown ? new Date(shown).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16) : shown
							})]
						}, key);
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						children: busy ? "Saving…" : "Save changes"
					})
				]
			})]
		})
	});
}
//#endregion
export { Admin as component };
