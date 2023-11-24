
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello, this is a WebSocket server!');
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

	ws.on('message', (message) => {
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.on('close', () => {
	});
});

server.listen(process.env.PORT||8081);
