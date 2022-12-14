const { db, syncAndSeed, models: { Staff } } = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')


app.use('/dist', express.static(path.join(__dirname,'dist')))
app.use('/public', express.static(path.join(__dirname,'public')))

app.get('/staff', (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname, 'index.html'))
    }
    catch(err){
        next(err);
    }
})

app.get('/api/staff', async (req, res, next)=>{
    try{
        const staff = await Staff.findAll();
        res.send(staff)
    }
    catch(err){
        next(err);
    }
})

app.get('/api/staff/:id', async (req, res, next)=>{
    try{
        const staff = await Staff.findByPk(req.params.id)
        res.send(staff)
    }
    catch(err){
        next(err)
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

