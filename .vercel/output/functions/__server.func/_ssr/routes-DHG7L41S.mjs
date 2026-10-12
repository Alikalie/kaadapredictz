import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as getSetting, o as str } from "./public-content-3e7hakun.mjs";
import { A as ArrowRight, E as ChartColumn, a as Target, w as CircleCheck, x as Crown } from "../_libs/lucide-react.mjs";
import { i as TrustNotice } from "./site-shell-C3fk-1Mw.mjs";
import { t as PredictionTable } from "./prediction-table-DgFBqx21.mjs";
import { t as contentQuery } from "./routes-d5g_oql7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DHG7L41S.js
var import_jsx_runtime = require_jsx_runtime();
var football_hero_default = "/assets/football-hero-BoHXFRqW.jpg";
function Index() {
	const { data } = useSuspenseQuery(contentQuery);
	const future = data.predictions.filter((p) => new Date(p.kickoff) > /* @__PURE__ */ new Date());
	const featured = future.find((p) => p.is_featured) ?? future[0];
	const completed = data.predictions.filter((p) => [
		"won",
		"lost",
		"void"
	].includes(p.status));
	const won = completed.filter((p) => p.status === "won").length;
	const rate = completed.length ? Math.round(won / completed.length * 100) : 0;
	const L = getSetting(data.settings, "landing");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "football-hero relative overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: football_hero_default,
					width: 1536,
					height: 1024,
					alt: "Football on a floodlit stadium pitch",
					className: "football-hero-image absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "football-hero-shade absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl animate-rise",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-5xl font-black leading-tight md:text-6xl",
								children: str(getSetting(data.settings, "brand").name, "KAADA PREDICTZ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 font-display text-2xl font-bold text-primary",
								children: [
									str(L.title_line1, "Read the game."),
									" ",
									str(L.title_line2, "Back your judgment.")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base leading-7 text-foreground",
								children: str(L.intro, "Data-informed match previews, clear market selections and a public record of every result.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/predictions",
										children: ["Today’s predictions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dashboard",
										children: "Member dashboard"
									})
								})]
							})
						]
					})
				}),
				featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative border-t border-border bg-background/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/prediction/$slug",
						params: { slug: featured.slug },
						className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "eyebrow",
								children: ["Featured fixture · ", featured.league]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-lg font-bold",
								children: [
									featured.home_team,
									" vs ",
									featured.away_team
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-bold",
								children: [
									featured.selection,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-4 text-primary",
										children: Number(featured.odds).toFixed(2)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "text-primary" })
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 py-12 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-px bg-border sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
							value: `${future.length}`,
							label: "Live picks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {}),
							value: `${rate}%`,
							label: "Recorded win rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
							value: `${completed.length}`,
							label: "Settled selections"
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				eyebrow: "Today’s board",
				title: "The latest predictions",
				to: "/predictions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionTable, { items: future.slice(0, 5) })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-16 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					eyebrow: "Market finder",
					title: "Choose your angle",
					to: "/predictions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-px bg-border md:grid-cols-4",
					children: data.categories.slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/predictions/$category",
						params: { category: c.slug },
						className: "group bg-card p-5 hover:bg-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-black group-hover:text-primary",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-5 size-4 text-primary" })
						]
					}, c.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1.2fr] lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-primary p-8 text-primary-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-12 text-xs font-black uppercase tracking-widest",
						children: "KAADA VIP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl font-black",
						children: str(L.vip_title, "More context. Deeper analysis.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-6 opacity-80",
						children: str(L.vip_text, "Unlock expanded analyst notes, early market alerts and priority updates.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/vip",
							children: ["Explore VIP plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				eyebrow: "Knowledge center",
				title: "Learn the markets",
				to: "/guides"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 divide-y divide-border border-y border-border",
				children: data.articles.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/guides/$slug",
					params: { slug: a.slug },
					className: "group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-black text-primary",
							children: ["0", data.articles.indexOf(a) + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold group-hover:text-primary",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								a.category,
								" · ",
								a.read_minutes,
								" min read"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
					]
				}, a.id))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 pb-16 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustNotice, {})
		})
	] });
}
function Stat({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 bg-background p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl font-black",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		})] })]
	});
}
function SectionHead({ eyebrow, title, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-3xl font-black md:text-4xl",
			children: title
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "hidden items-center gap-1 text-sm font-bold text-primary sm:flex",
			children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		})]
	});
}
//#endregion
export { Index as component };
