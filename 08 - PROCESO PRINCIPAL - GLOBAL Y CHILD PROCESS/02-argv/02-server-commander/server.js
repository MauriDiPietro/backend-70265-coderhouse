import express from 'express';
import { program } from 'commander';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

program
    .option('-p <port>', 'port server', 8080)    //-p 8080
            //FLAG      DESCRIPTION    DEFAULT
    .option('-env <environment>', 'env server', 'dev')  //-env prod

program.parse();

// console.log(program.opts());
//{ p: '9500', Env: 'prod' }

// console.log(program.args);  // [ '1', '2', 'abc' ]

const PORT = program.opts().p
const mode = program.opts().Env

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`mode: ${mode}`);
});

