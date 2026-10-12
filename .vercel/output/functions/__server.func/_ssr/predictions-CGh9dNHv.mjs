import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicContent } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions-CGh9dNHv.js
var q = queryOptions({
	queryKey: ["public-content"],
	queryFn: () => getPublicContent()
});
//#endregion
export { q as t };
