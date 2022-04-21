require('dotenv').config();

const express = require('express');
const app = express();

const router = require('./routes/routes.js');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})