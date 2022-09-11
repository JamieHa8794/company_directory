const { db, syncAndSeed } = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')


app.get('/', (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname, 'index.html'))
    }
    catch(err){
        next(err);
    }
})


const init = async () =>{
    try{
        const port = process.env.PORT || 3000;
        app.listen(port, ()=>console.log(`listening on port ${port}`))
        await syncAndSeed();
    }
    catch(err){
        console.log(err);
    }
}

init();