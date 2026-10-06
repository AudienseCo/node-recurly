'use strict';

const assert = require('assert');
const client = require('../lib/client');

describe('Client request', () => {

	it('should pass an error to the callback when the HTTP client rejects the request', (done) => {
		const recurly = client.create({ API_USERNAME: 'user', API_PASSWORD: 'password' });
		let syncReturned = false;

		recurly.request(['/v2/subscriptions/manual id', 'GET'], (response) => {
			assert.strictEqual(syncReturned, true);
			assert.strictEqual(response.status, 'error');
			assert.strictEqual(response.description.code, 'ERR_UNESCAPED_CHARACTERS');
			done();
		});
		syncReturned = true;
	});
});
