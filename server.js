const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const app = express();

app.use(express.json()); //using middlewares

//declare routes to access the app on the browser

app.get('/', (req, res) => {
    res.send('hello node API')
})
app.get('/blog', (req, res) => {
    res.send('hello blog')
})
// to get all products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)

        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//to get products with an ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        //product not found to be updated
        if(!product){
            return res.status(404).json({message: `can not find a product an ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})
//delete or remove product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `can not find a product with an ID ${id}`});
        }
        const deletedProduct = await Product.findById(id);
        res.status(200).json(deletedProduct);
        
    } catch (error) {
        res.status(500).json({messsage: error.message})
        
    }
})




app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})





mongoose.
connect('mongodb+srv://admin:12345@cluster0.dk4hacl.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, ()=>{
        console.log("Node API app is running ...")
    })
    console.log('connected to mongodb')
})
.catch((error) =>{
    console.log(error)
})