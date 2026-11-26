
const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./server');

test('Message Board page responds with HTTP 200', async () => {
    const server = http.createServer(app);

    await new Promise(resolve => server.listen(0, resolve));

    try {
        const port = server.address().port;

        const response = await fetch(
            `http://localhost:${port}/messageboard.html`
        );

        assert.strictEqual(response.status, 200);
    } finally {
        await new Promise((resolve, reject) => {
            server.close(error => error ? reject(error) : resolve());
        });
    }
});
