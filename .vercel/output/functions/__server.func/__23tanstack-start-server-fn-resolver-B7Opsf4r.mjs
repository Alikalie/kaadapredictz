//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-B7Opsf4r.js
var manifest = {
	"0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e": {
		functionName: "getAdminData_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-BUKvPvQI.mjs")
	},
	"167d9a3ce945a8344adf7bf76d74efef7753a6e90a1bd2cc45c4da44b67966f6": {
		functionName: "requestVip_createServerFn_handler",
		importer: () => import("./_ssr/member.functions-g3SoOg-h.mjs")
	},
	"187da00af631a14151c5a77de44987cca0542a75c5090925010c0404bffced03": {
		functionName: "listExplainablePredictions_createServerFn_handler",
		importer: () => import("./_ssr/fixture.functions-CCQpmOzY.mjs")
	},
	"2cfd765b8f2b9e3c5f29e9589aea8f131330db67b15d7524f3bf87b19b9179d9": {
		functionName: "explainPrediction_createServerFn_handler",
		importer: () => import("./_ssr/fixture.functions-CCQpmOzY.mjs")
	},
	"48f6db4bcc53abba68e02014180ae43bc7920ce0dc7b1b3e50d3af7ea970aa84": {
		functionName: "saveMyProfile_createServerFn_handler",
		importer: () => import("./_ssr/member.functions-g3SoOg-h.mjs")
	},
	"62e0ae4f81420872f2ae5314f20cb77ea5c7726b0583f420bafce31083d55a54": {
		functionName: "getMyAccount_createServerFn_handler",
		importer: () => import("./_ssr/member.functions-g3SoOg-h.mjs")
	},
	"697091183a48c7df886f475d5fafdb951ec26ab85abe665cbc5823205898d346": {
		functionName: "saveAdminRecord_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-BUKvPvQI.mjs")
	},
	"818152a5f73402dbcb2f910ed4c59624a33c31422c72c570b0fb0298b67de84c": {
		functionName: "sendFeedback_createServerFn_handler",
		importer: () => import("./_ssr/feedback.functions-CXJKB-48.mjs")
	},
	"d02d33bcd1641fee1a4168974507a03d2bce23ba82be7c02dd6e7a8d0960a808": {
		functionName: "getPublicContent_createServerFn_handler",
		importer: () => import("./_ssr/content.functions-D5kxplsa.mjs")
	},
	"f620d6f53c15ac8037f7e44924ca83463da8fd7096a10262868e1c9d66b67f79": {
		functionName: "deleteAdminRecord_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-BUKvPvQI.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
