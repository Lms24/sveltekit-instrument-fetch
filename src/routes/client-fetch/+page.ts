// import { dev } from '$app/environment';

import { browser } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load = async ({ fetch }) => {
	console.log('client load executed');

	let res;

	if (browser) {
		res = await (await fetch('/api/message/1')).text();
	} else {
		res = 'wait for hydration...';
	}

	return {
		msg: res
	};
};
