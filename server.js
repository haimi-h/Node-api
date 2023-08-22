const express = require('express');

const app = express();

//declare routes to access the app on the browser

app.get('/', (req, res) => {
    res.send('hello node API')
})

app.listen(3000, ()=>{
    console.log("Node API app is running ...")
})