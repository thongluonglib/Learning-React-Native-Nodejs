import express from 'express'
import {listChannel} from './fakeData.mjs'
const app  = express();
app.use(express.json());

app.post('/get-list-channel', (req, res) => {
    console.log('listChannel', JSON.stringify(listChannel, null, 2))
    res.send(listChannel)
})
app.post('/get-timeout', async (req, res) => {
    console.log('listChannel', JSON.stringify(listChannel, null, 2))
    setTimeout(() => {
        res.status(400).send({
            message: 'This is an error!'
         });
    }, 3000)
})
app.listen(3000, () => {
    console.log('Server start with port', 3000)
})