import { t as createOpenAI } from "../_libs/ai-sdk__openai+zod.mjs";
import { t as streamText } from "../_libs/ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/responses.server-DPANfu_h.js
var LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
function createLovableAiGatewayRunIdFetch(initialRunId) {
	let runId = initialRunId?.trim() || void 0;
	let resolveRunId = () => {};
	let runIdResolved = false;
	const runIdReady = new Promise((resolve) => {
		resolveRunId = resolve;
	});
	const publishRunId = (value) => {
		const nextRunId = value?.trim() || void 0;
		if (!runId && nextRunId) runId = nextRunId;
		if (!runIdResolved) {
			runIdResolved = true;
			resolveRunId(runId);
		}
	};
	if (runId) publishRunId(runId);
	return {
		fetch: async (input, init) => {
			const headers = new Headers(init?.headers);
			if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
			try {
				const response = await fetch(input, {
					...init,
					headers
				});
				publishRunId(response.headers.get(LOVABLE_AIG_RUN_ID_HEADER) ?? void 0);
				return response;
			} catch (error) {
				publishRunId(void 0);
				throw error;
			}
		},
		getRunId: () => runId,
		waitForRunId: () => runId ? Promise.resolve(runId) : runIdReady
	};
}
function getLovableAiGatewayRunId(request) {
	return request.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || void 0;
}
function getLovableAiGatewayResponseHeaders(providerHeaders, init) {
	const headers = new Headers(init);
	const exposedHeaders = new Set((headers.get("Access-Control-Expose-Headers") ?? "").split(",").map((header) => header.trim()).filter(Boolean));
	new Headers(providerHeaders).forEach((value, name) => {
		if (name.toLowerCase().startsWith("x-lovable-aig-")) {
			headers.set(name, value);
			exposedHeaders.add(name);
		}
	});
	headers.forEach((_, name) => {
		if (name.toLowerCase().startsWith("x-lovable-aig-")) exposedHeaders.add(name);
	});
	if (exposedHeaders.size > 0) headers.set("Access-Control-Expose-Headers", Array.from(exposedHeaders).join(", "));
	return headers;
}
async function withLovableAiGatewayRunIdHeader(response, gateway, init) {
	if (!response.body) {
		const runId = gateway.getRunId();
		const headers = getLovableAiGatewayResponseHeaders(void 0, response.headers);
		new Headers(init).forEach((value, name) => headers.set(name, value));
		if (runId) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: getLovableAiGatewayResponseHeaders(void 0, headers)
		});
	}
	const reader = response.body.getReader();
	const firstChunk = reader.read();
	const runId = await gateway.waitForRunId();
	const headers = getLovableAiGatewayResponseHeaders(void 0, response.headers);
	new Headers(init).forEach((value, name) => headers.set(name, value));
	if (runId) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
	const body = new ReadableStream({
		async start(controller) {
			try {
				const first = await firstChunk;
				if (first.done) {
					controller.close();
					return;
				}
				controller.enqueue(first.value);
				while (true) {
					const chunk = await reader.read();
					if (chunk.done) break;
					controller.enqueue(chunk.value);
				}
				controller.close();
			} catch (error) {
				controller.error(error);
			}
		},
		cancel(reason) {
			return reader.cancel(reason);
		}
	});
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers: getLovableAiGatewayResponseHeaders(void 0, headers)
	});
}
function createResponsesCall(request, config, messages, instructions) {
	const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
	const provider = createOpenAI({
		baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
		apiKey: config.apiKey,
		headers: {
			"Lovable-API-Key": config.apiKey,
			"X-Lovable-AIG-SDK": "vercel-ai-sdk"
		},
		fetch: runIdFetch.fetch
	});
	const reasoning = config.model !== "openai/chat-latest";
	const result = streamText({
		model: provider.responses(config.model),
		...instructions ? { instructions } : {},
		messages,
		abortSignal: request.signal,
		maxRetries: 0,
		providerOptions: { openai: {
			store: false,
			...reasoning ? {
				forceReasoning: true,
				reasoningEffort: "low",
				reasoningSummary: "auto",
				include: ["reasoning.encrypted_content"]
			} : {}
		} }
	});
	return {
		result,
		response: () => withLovableAiGatewayRunIdHeader(result.toUIMessageStreamResponse({ sendReasoning: true }), runIdFetch)
	};
}
//#endregion
export { createResponsesCall };
