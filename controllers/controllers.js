const addImage = require('../utils/upload_firebase');
const Product = require('../models/product_models');

const saveProduct = async (req, res) => {
    try {
        const imgUrl = await addImage(req, res);
        const productData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: imgUrl
        }
        const product = await Product.create(productData);
        const response = { message: 'Product saved!' };
        res.render('index', { response });
    } catch (error) {
        console.log(error)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (error) {
        console.log(error)
    }
}

const getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.body['product-name'] });
        console.log(product)
        if(!product){
            const error = { message: 'No product with such name' }
            return res.render('index', { error } );
        }
        res.render('index', { product })
    } catch (error) {
        
    }
}

module.exports = {
    saveProduct,
    getAllProducts,
    getProductByName
}