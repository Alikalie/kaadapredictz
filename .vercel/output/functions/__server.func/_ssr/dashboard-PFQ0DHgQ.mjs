import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as pageMeta } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-PFQ0DHgQ.js
var $$splitComponentImporter = () => import("./dashboard-qRgGv96U.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	head: () => pageMeta("My dashboard", "Your KAADA PREDICTZ member dashboard and profile."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
