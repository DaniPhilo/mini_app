const firebase = require('../db/firebase');
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const storage = getStorage();

const addImage = async (req, res) => {
    try {

        const file = req.file.buffer;
        const fileName = req.file.originalname.split('.')[0] + '.jpg';

        const metadata = {
            contentType: 'image/jpg'
        };

        const storageRef = ref(storage, 'images/' + fileName);

        const snapshot = await uploadBytes(storageRef, file, metadata)
        const url = await getDownloadURL(snapshot.ref);
        return url
    }
    catch (error) {
        console.log(error)
        console.log(error.message);
    }
}

module.exports = addImage;