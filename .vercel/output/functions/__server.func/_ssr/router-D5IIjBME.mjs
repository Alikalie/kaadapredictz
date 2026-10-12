import { r as __toESM } from "../_runtime.mjs";
import { K as redirect, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./createSsrRpc-D8gkU3RZ.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as publicContentQuery, r as pageMeta } from "./public-content-3e7hakun.mjs";
import { n as SiteShell } from "./site-shell-C3fk-1Mw.mjs";
import { t as supabase } from "./client-BV7ZnbDg.mjs";
import { t as Route$10 } from "./auth-BdbAdaJT.mjs";
import { t as Route$11 } from "./dashboard-PFQ0DHgQ.mjs";
import { t as Route$12 } from "./guides._slug-C8dKXVpz.mjs";
import { t as Route$13 } from "./legal._slug-WKdto0NY.mjs";
import { t as Route$14 } from "./prediction._slug-DU14iUQD.mjs";
import { t as q } from "./predictions-CGh9dNHv.mjs";
import { t as Route$15 } from "./predictions._category-CW69JREF.mjs";
import { t as contentQuery } from "./routes-d5g_oql7.mjs";
import { t as q$1 } from "./vip-DI6rmjIq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D5IIjBME.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DegwMZ7T.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-32 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl font-black",
				children: "That page is offside."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "The page may have moved or the link is no longer active."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Back home"
				})
			})
		]
	}) });
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => reportLovableError(error, { boundary: "tanstack_root_error_component" }), [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-32 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-black",
				children: "This page didn’t load."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Please try again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: () => {
					router.invalidate();
					reset();
				},
				children: "Try again"
			})
		]
	}) });
}
var Route$9 = createRootRouteWithContext()({
	loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KAADA PREDICTZ" },
			{
				name: "description",
				content: "Football predictions, analysis, results and betting guides."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				type: "image/jpeg",
				href: "/kaada-predictz-logo.jpeg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	const content = Route$9.useLoaderData();
	if (content && !queryClient.getQueryData(publicContentQuery.queryKey)) queryClient.setQueryData(publicContentQuery.queryKey, content);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-DHG7L41S.mjs");
var Route$8 = createFileRoute("/")({
	loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
	head: () => ({ meta: [
		{ title: "KAADA PREDICTZ — Football Predictions & Analysis" },
		{
			name: "description",
			content: "Daily football predictions, transparent results, market guides and VIP analysis."
		},
		{
			property: "og:title",
			content: "KAADA PREDICTZ — Football Predictions & Analysis"
		},
		{
			property: "og:description",
			content: "Read the game with daily football analysis and transparent performance."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./route-Di7iQBCH.mjs");
var Route$7 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({ to: "/auth" });
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./about-CgGZ28_8.mjs");
var Route$6 = createFileRoute("/about")({
	loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery),
	head: () => pageMeta("About", "Independent football analysis and transparent prediction results."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin-2aDc4m8M.mjs");
var Route$5 = createFileRoute("/admin")({
	head: () => pageMeta("Admin", "Secure KAADA PREDICTZ content management."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./contact-CsqpZGfE.mjs");
var Route$4 = createFileRoute("/contact")({
	loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery),
	head: () => pageMeta("Contact", "Send questions and feedback to KAADA PREDICTZ."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./guides-9BBZSzUR.mjs");
var Route$3 = createFileRoute("/guides")({
	loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery),
	head: () => pageMeta("Tips & Guides", "Football market guides and analysis from KAADA PREDICTZ."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./predictions-ofWA-AV32.mjs");
var Route$2 = createFileRoute("/predictions")({
	loader: ({ context }) => context.queryClient.ensureQueryData(q),
	head: () => ({ meta: [
		{ title: "Football Predictions — KAADA PREDICTZ" },
		{
			name: "description",
			content: "Browse current football predictions by market."
		},
		{
			property: "og:title",
			content: "Football Predictions — KAADA PREDICTZ"
		},
		{
			property: "og:description",
			content: "Daily football selections with odds and analysis."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./results-BrGbZYtM.mjs");
var Route$1 = createFileRoute("/results")({
	loader: ({ context }) => context.queryClient.ensureQueryData(publicContentQuery),
	head: () => pageMeta("Results & Past Matches", "Past KAADA PREDICTZ predictions, settled outcomes and match history."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./vip-DmFuXk5N.mjs");
var Route = createFileRoute("/vip")({
	loader: ({ context }) => context.queryClient.ensureQueryData(q$1),
	head: () => ({ meta: [
		{ title: "VIP Predictions — KAADA PREDICTZ" },
		{
			name: "description",
			content: "Explore premium football analysis packages."
		},
		{
			property: "og:title",
			content: "KAADA VIP"
		},
		{
			property: "og:description",
			content: "Premium football analysis and early market alerts."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AboutRoute = Route$6.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$9
});
var AdminRoute = Route$5.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var ContactRoute = Route$4.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$9
});
var GuidesRoute = Route$3.update({
	id: "/guides",
	path: "/guides",
	getParentRoute: () => Route$9
});
var PredictionsRoute = Route$2.update({
	id: "/predictions",
	path: "/predictions",
	getParentRoute: () => Route$9
});
var ResultsRoute = Route$1.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => Route$9
});
var VipRoute = Route.update({
	id: "/vip",
	path: "/vip",
	getParentRoute: () => Route$9
});
var AuthenticatedDashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var GuidesSlugRoute = Route$12.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => GuidesRoute
});
var LegalSlugRoute = Route$13.update({
	id: "/legal/$slug",
	path: "/legal/$slug",
	getParentRoute: () => Route$9
});
var PredictionSlugRoute = Route$14.update({
	id: "/prediction/$slug",
	path: "/prediction/$slug",
	getParentRoute: () => Route$9
});
var PredictionsCategoryRoute = Route$15.update({
	id: "/$category",
	path: "/$category",
	getParentRoute: () => PredictionsRoute
});
var AuthenticatedRouteRouteChildren = { AuthenticatedDashboardRoute };
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var GuidesRouteChildren = { GuidesSlugRoute };
var GuidesRouteWithChildren = GuidesRoute._addFileChildren(GuidesRouteChildren);
var PredictionsRouteChildren = { PredictionsCategoryRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AboutRoute,
	AdminRoute,
	AuthRoute,
	ContactRoute,
	GuidesRoute: GuidesRouteWithChildren,
	PredictionsRoute: PredictionsRoute._addFileChildren(PredictionsRouteChildren),
	ResultsRoute,
	VipRoute,
	LegalSlugRoute,
	PredictionSlugRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
