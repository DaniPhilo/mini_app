const firebase = require('../db/db');
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const storage = getStorage();

const addImage = async (req, res) => {
    try {

        const file = req.file;
        const fileName = file.originalname;

        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + fileName);

        uploadBytes(storageRef, file.buffer, metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                const response = { message: 'File uploaded in: ', url: url }
                res.status(200).render('index', { response });
            })
        });
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}
module.exports = addImage;
