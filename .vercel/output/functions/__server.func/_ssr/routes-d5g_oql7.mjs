import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicContent } from "./public-content-3e7hakun.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-d5g_oql7.js
var contentQuery = queryOptions({
	queryKey: ["public-content"],
	queryFn: () => getPublicContent(),
	staleTime: 3e4
});
//#endregion
export { contentQuery as t };
