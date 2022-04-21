const { initializeApp } = require("firebase/app");
const firebaseConfig = require('../config/config');

const db = initializeApp(firebaseConfig);

module.exports = db;