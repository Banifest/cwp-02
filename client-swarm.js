const child_process = require("child_process");

let countProcess = process.argv[2];

for(let i=0;i<countProcess;i++)
{
    child_process.exec('node client.js');
}