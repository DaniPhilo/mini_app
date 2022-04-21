const express = require('express');
const router = express.Router();

const multer = require('multer');

const addImage = require('../controllers/controllers');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('uploaded_file');

router.get('/', (req, res) => res.render('index'));
router.post('/', upload, addImage);


module.exports = router;