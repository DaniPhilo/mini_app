require('dotenv').config();

// import connect DB:
const connectDB = require('./db/mongoDB');

const express = require('express');
const app = express();

const router = require('./routes/routes.js');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api', router);

app.listen(port, async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log(`Server listening on port ${port}...`);
    } catch (error) {
        console.log(error);
    } 
});