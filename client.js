const net = require('net');
const fs = require("fs");
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write('QA');
});

client.on('data', function(data) {
    let questions = [];
    let answers = [];
    fs.readFile("qa.json", (file)=>{
        JSON.parse(file, (q,a)=>{
            if(q != undefined)
            {
                questions.append(q);
                answers.append(a);
            }
        })
    });
    console.log(data);
    if(data === 'ACK')
    {
        fs.readFile('qa.json', (err, questions)=>{

        });
    }
    else
    {
        client.destroy();
    }
});

client.on('close', function() {
    console.log('Connection closed');
});