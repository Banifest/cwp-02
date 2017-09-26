const net = require('net');
const port = 8124;

const server = net.createServer((client) => {
    console.log('Client connected');
    client.setEncoding('utf8');

    client.id = Date.now();

    client.on('data', (data) => {
        console.log(data);
        if(!client.ACK)
        {
            if(data === 'QA')
            {
                client.write('ACK');
                client.ACK = true;
            }
            else
            {
                client.write('DEC');
                client.ACK = false;
            }
        }
        else
        {
            if(Math.random()>0.5)
            {
                console.log('Да');
                client.write('да');
            }
            else
            {
                console.log('Нет');
                client.write('нет');
            }
        }
    });

    client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});