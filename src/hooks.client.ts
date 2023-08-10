console.log('client hooks initialized');

// Before we call Sentry.init, we temporarily set our fetch proxy as window.fetch.
// This is necessary because Sentry.init (BrowserTracing) will patch window.fetch.
const currentFetch = window.fetch;
window.fetch = window.__sentry_fetch_proxy;

SentryInit();

// After we call Sentry.init, we restore what was previously window.fetch function.
// internally, somewhere in the patch chain, this will now call our, now instrumented, fetch proxy.
window.__sentry_fetch_proxy = window.fetch;
window.fetch = currentFetch;

// beautiful, isn't it?

export const handleError = (error: Error) => {
	console.error(error);
	return {
		status: 500,
		body: {
			error: error.message
		}
	};
};

// Simulated Sentry.init function.
// This is reduced to the important part: patching fetch (which is usually triggerd by the BrowserTracing integration)
function SentryInit() {
	const originalFetch = window.fetch;
	window.fetch = function (input, init) {
		console.log('FETCH FETCH FETCH');
		return originalFetch(input, init);
	};
}
