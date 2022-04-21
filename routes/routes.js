const express = require('express');
const router = express.Router();

const multer = require('multer');

const { saveProduct, getAllProducts, getProductByName } = require('../controllers/controllers');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('uploaded_file');

router.route('/')
    .get((req, res) => res.render('index'))
    .post(upload, saveProduct);
router.route('/products')
    .get(getAllProducts)
    .post(getProductByName)

module.exports = router;