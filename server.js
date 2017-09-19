const net = require('net');
const port = 8124;

const server = net.createServer((client) => {
    console.log('Client connected');
    client.setEncoding('utf8');

    client.id = Date.now();

    client.on('data', (data) => {
        console.log(data);
        if(data === 'QA')
        {
            client.write('ACK');

        }
        else
        {
            client.write('DEC');
        }
    });

    client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});