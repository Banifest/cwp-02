const net = require('net');
const fs = require("fs");
const shuffle = require('shuffle-array');
const port = 8124;

const client = new net.Socket();

process.on('uncaughtException', function (err) {
    console.log(err);
});

class pair{
    constructor(f, s)
    {
        this.first = f;
        this.second = s;
    }
}

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write('QA');
});

client.on('data', function(data) {
    let questions = [];
    fs.readFile("qa.json", (err, file)=>{
        JSON.parse(file, (q,a)=>{
            if(q != undefined || a != '{}')
            {
                questions.push(new pair(q,a));
              //  console.log(q);
                //console.log(a);
            }
        });

        shuffle(questions);

        for(const que of questions)
        {
            console.log(que);
        }

        console.log(data);
        if(data === 'ACK')
        {

        }
        else
        {
            client.destroy();
        }
        client.destroy();
        });


});

client.on('close', function() {
    console.log('Connection closed');
});