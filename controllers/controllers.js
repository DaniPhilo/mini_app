const firebase = require('../db/db');
const { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } = require("firebase/storage");

const storage = getStorage();

const addImage = async (req, res) => {
    try {

        const file = req.file;
        const fileName = file.originalname;

        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + fileName);
        // const uploadTask = uploadBytesResumable(storageRef, file.buffer, metadata);

        // res.send(file)

        // Listen for state changes, errors, and completion of the upload.


        uploadBytes(storageRef, file.buffer, metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                const response = { message: 'File uploaded in: ', url: url }
                res.status(200).render('index', { response });
            })
        });
        // uploadTask.on('state_changed',
        //     (snapshot) => {
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         // A full list of error codes is available at
        //         // https://firebase.google.com/docs/storage/web/handle-errors
        //         switch (error.code) {
        //             case 'storage/unauthorized':
        //                 // User doesn't have permission to access the object
        //                 break;
        //             case 'storage/canceled':
        //                 // User canceled the upload
        //                 break;

        //             // ...

        //             case 'storage/unknown':
        //                 // Unknown error occurred, inspect error.serverResponse
        //                 break;
        //         }
        //     },
        //     () => {
        //         // Upload completed successfully, now we can get the download URL
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             const response = {message: 'File updated in: ' + downloadURL}
        //             res.render('index', { response });;
        //         });
        //     }
        // );

        // Step 1. Create reference for file name in cloud storage 
        // const imageRef = ref(storage, fileName);
        // Step 2. Upload the file in the bucket storage
        // uploadBytes(imageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        //   });
        // const snapshot = await imageRef.put(file);
        // Step 3. Grab the public url
        // const downloadURL = await snapshot.ref.getDownloadURL();


    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}
module.exports = {
    addImage
}