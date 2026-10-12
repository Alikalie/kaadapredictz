import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createSsrRpc, t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { O as BookOpen, a as Target, g as LoaderCircle, h as LogOut, o as ShieldCheck, r as User, x as Crown } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dcy-eaQM.mjs";
import { t as supabase } from "./client-BV7ZnbDg.mjs";
import { t as Input } from "./input-CiqlLNuO.mjs";
import { n as vipActive } from "./prediction-metrics-Bq_Ay-DL.mjs";
import { a as objectType, s as stringType } from "../_libs/zod.mjs";
import { r as saveMyProfile, t as getMyAccount } from "./member.functions-DndwjCkW.mjs";
import { t as Route } from "./dashboard-PFQ0DHgQ.mjs";
import { t as PredictionTable } from "./prediction-table-DgFBqx21.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-qRgGv96U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var listExplainablePredictions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("187da00af631a14151c5a77de44987cca0542a75c5090925010c0404bffced03"));
var explainPrediction = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ prediction_id: stringType().uuid() }).strict().parse(input)).handler(createSsrRpc("2cfd765b8f2b9e3c5f29e9589aea8f131330db67b15d7524f3bf87b19b9179d9"));
function PredictionExplanation() {
	const list = useServerFn(listExplainablePredictions);
	const explain = useServerFn(explainPrediction);
	const { data: predictions = [], isLoading, error: loadError } = useQuery({
		queryKey: ["explainable-predictions"],
		queryFn: () => list()
	});
	const [id, setId] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 border-t border-border pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Prediction review"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-black",
				children: "Understand a published prediction"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 flex flex-col items-start gap-4",
				onSubmit: async (e) => {
					e.preventDefault();
					setBusy(true);
					setError("");
					setText("");
					try {
						const result = await explain({ data: { prediction_id: id } });
						setText(result.text);
					} catch (err) {
						setError(err instanceof Error ? err.message : "Explanation failed.");
					} finally {
						setBusy(false);
					}
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid w-full max-w-xl gap-2 text-sm",
					children: ["Published prediction", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Published prediction",
						className: "h-11 w-full rounded-md border border-input bg-background px-3",
						required: true,
						value: id,
						disabled: busy || isLoading,
						onChange: (e) => {
							setId(e.target.value);
							setText("");
							setError("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: isLoading ? "Loading predictions…" : "Choose a prediction"
						}), predictions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.home_team,
								" vs ",
								p.away_team,
								" · ",
								p.selection,
								" · ",
								p.status
							]
						}, p.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !id || busy,
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), busy ? "Reviewing prediction…" : "Explain prediction"]
				})]
			}),
			loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-4 text-destructive",
				children: "Published predictions could not be loaded."
			}),
			!isLoading && !loadError && !predictions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "No published predictions are available."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-4 text-sm text-destructive",
				children: error
			}),
			text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "mt-6 max-w-3xl whitespace-pre-wrap text-sm leading-7",
				children: text
			})
		]
	});
}
function Dashboard() {
	const fetchAccount = useServerFn(getMyAccount);
	const save = useServerFn(saveMyProfile);
	const qc = useQueryClient();
	const navigate = Route.useNavigate();
	const { data, isLoading, error } = useQuery({
		queryKey: ["my-account"],
		queryFn: () => fetchAccount()
	});
	const [msg, setMsg] = (0, import_react.useState)("");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-20",
		children: "Loading your dashboard…"
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-20 text-destructive",
		children: "Could not load your account."
	});
	const p = data.profile;
	const isAdmin = data.roles.includes("super_admin");
	const activeVip = vipActive(data.subscription?.expires_at);
	const name = p?.full_name || data.email;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-16 place-items-center bg-primary font-display text-2xl font-black text-primary-foreground",
						children: name.slice(0, 1).toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Member dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 font-display text-3xl font-black",
							children: ["Welcome, ", name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: data.email
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Admin board"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: async () => {
							await supabase.auth.signOut();
							await navigate({ to: "/" });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Log out"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-px bg-border py-px sm:grid-cols-3 my-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {}),
						label: "Membership",
						value: activeVip ? "VIP ACTIVE" : "FREE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
						label: "VIP requests",
						value: String(data.requests.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}),
						label: "Account role",
						value: isAdmin ? data.roles.join(", ").replaceAll("_", " ") : "Member"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-black",
						children: "My profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-5 grid gap-4",
						onSubmit: async (e) => {
							e.preventDefault();
							const d = new FormData(e.currentTarget);
							setMsg("");
							try {
								await save({ data: {
									full_name: String(d.get("full_name")),
									phone: String(d.get("phone")),
									country: String(d.get("country"))
								} });
								await qc.invalidateQueries({ queryKey: ["my-account"] });
								setMsg("Profile saved.");
							} catch (err) {
								setMsg(err instanceof Error ? err.message : "Save failed.");
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "full_name",
									defaultValue: p?.full_name ?? "",
									required: true,
									minLength: 2
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: ["Phone / WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "phone",
									defaultValue: p?.phone ?? ""
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: ["Country", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "country",
									defaultValue: p?.country ?? ""
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-2 text-sm",
								children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: data.email,
									disabled: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Save profile" }),
							msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								className: "text-sm text-primary",
								children: msg
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-black",
								children: "My VIP requests"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/vip",
									children: "Request VIP"
								})
							})]
						}),
						data.requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-muted-foreground",
							children: "No requests yet. Choose a VIP package to get started."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 divide-y divide-border",
							children: data.requests.map((r) => {
								const pkg = r.vip_packages;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold",
										children: pkg?.name ?? "VIP package"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [new Date(r.created_at).toLocaleDateString(), pkg?.price != null ? ` · ${pkg.currency} ${pkg.price}` : ""]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "status",
										children: r.status
									})]
								}, r.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/predictions",
									className: "text-primary font-bold",
									children: "Today's predictions →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/results",
									className: "text-primary font-bold",
									children: "Past results →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "text-primary font-bold",
									children: "Contact support →"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 border-t border-border pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-black",
						children: "VIP odds"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: data.subscription?.expires_at ? `Subscription ${activeVip ? "expires" : "expired"}: ${new Date(data.subscription.expires_at).toLocaleString()}` : "No active VIP subscription"
					})]
				}), activeVip || isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionTable, { items: data.vipPredictions }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vip",
						children: "Request VIP access"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionExplanation, {})
		]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 bg-background p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-black capitalize",
			children: value
		})] })]
	});
}
//#endregion
export { Dashboard as component };
