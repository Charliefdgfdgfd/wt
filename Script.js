const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Setup storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

// Endpoint to handle file uploads
app.post('/upload', upload.single('audio'), (req, res) => {
    const { userName, code } = req.body;
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    console.log(`Received file: ${req.file.filename}`);
    console.log(`User: ${userName}, Code: ${code}`);

    // Simulate playback and deletion after playback
    setTimeout(() => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted:', req.file.filename);
            }
        });
    }, 5000); // Delete after 5 seconds

    res.send('File received and will be deleted after playback.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
