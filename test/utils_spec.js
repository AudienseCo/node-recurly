'use strict';

const assert = require('assert');
const utils = require('../lib/utils');

describe('Route params', () => {

	it('should keep a recurly uuid unchanged', () => {
		const route = utils.addParams(['/v2/subscriptions/:uuid', 'GET'], { uuid: '3f7828c12232050d1f0ec74e71be769a' });

		assert.deepStrictEqual(route, ['/v2/subscriptions/3f7828c12232050d1f0ec74e71be769a', 'GET']);
	});

	it('should escape characters that the HTTP client rejects in the request path', () => {
		const route = utils.addParams(['/v2/subscriptions/:uuid', 'GET'], { uuid: 'manual idé\n' });

		assert.deepStrictEqual(route, ['/v2/subscriptions/manual%20id%C3%A9%0A', 'GET']);
	});

	it('should keep a param inside its path segment', () => {
		const route = utils.addParams(['/v2/accounts/:account_code', 'GET'], { account_code: '../plans/x?y' });

		assert.deepStrictEqual(route, ['/v2/accounts/..%2Fplans%2Fx%3Fy', 'GET']);
	});

	it('should escape params placed in the query string', () => {
		const route = utils.addParams(
			['/v2/subscriptions/:uuid/postpone?next_renewal_date=:next_renewal_date', 'PUT'],
			{ uuid: 'abc', next_renewal_date: '2026-10-05T00:00:00Z' }
		);

		assert.deepStrictEqual(route, ['/v2/subscriptions/abc/postpone?next_renewal_date=2026-10-05T00%3A00%3A00Z', 'PUT']);
	});
});
