
const http = require('http');

function check(path) {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'GET'
    };

    const req = http.request(options, res => {
        console.log(`[${path}] Status: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`[${path}] Body length: ${data.length}`);
            if (res.statusCode !== 200) {
                console.log(`[${path}] Response: ${data.substring(0, 200)}...`);
            } else {
                console.log(`[${path}] Success. First 50 chars: ${data.substring(0, 50)}...`);
            }
        });
    });

    req.on('error', error => {
        console.error(`[${path}] Error: ${error.message}`);
    });

    req.end();
}

console.log('Testing running server...');
check('/api/cultures');
check('/api/products');
