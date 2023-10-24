const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');

const { WebSocketServer } = require('ws');

const app = express();
const server = createServer(app)
const wss = new WebSocketServer({ server });


app.use(cors("*"));

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  
    ws.send(JSON.stringify([
        3, [
            {
                message: 1
            }
        ],
        'consoleData'
    ]));
});

server.listen(3000, () => console.log(`Running on PORT: 3000`))