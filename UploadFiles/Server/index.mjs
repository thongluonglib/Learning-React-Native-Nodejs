import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });
app.get('/', function (req, res) {
    res.sendFile('views/index.html', { root: __dirname })
})
app.post('/upload-image', upload.array('photos', 6), function (req, res) {
    console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });

})

app.listen(3000, 'localhost', () => {
    console.log('Server start with port 3000')
})