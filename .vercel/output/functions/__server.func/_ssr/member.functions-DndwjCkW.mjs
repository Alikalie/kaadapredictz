import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { r as createSsrRpc } from "./createSsrRpc-D8gkU3RZ.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dcy-eaQM.mjs";
import { a as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/member.functions-DndwjCkW.js
var saveMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	full_name: stringType().trim().min(2).max(120),
	phone: stringType().trim().max(40),
	country: stringType().trim().max(80)
}).parse(input)).handler(createSsrRpc("48f6db4bcc53abba68e02014180ae43bc7920ce0dc7b1b3e50d3af7ea970aa84"));
var requestVip = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	package_id: stringType().uuid(),
	message: stringType().trim().max(1e3)
}).parse(input)).handler(createSsrRpc("167d9a3ce945a8344adf7bf76d74efef7753a6e90a1bd2cc45c4da44b67966f6"));
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("62e0ae4f81420872f2ae5314f20cb77ea5c7726b0583f420bafce31083d55a54"));
//#endregion
export { requestVip as n, saveMyProfile as r, getMyAccount as t };
