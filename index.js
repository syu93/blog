const server = require('./server');

// Launch the server
const app = server();

console.log(`[Server] Listening on port ${app.settings.port} ...`);
const httpd = app.listen(app.settings.port);