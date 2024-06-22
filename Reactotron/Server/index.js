var express = require('express')
const app = express();

app.use(express.json())

const mockData = [
    {
        id: 1,
        name: 'Hello'
    },
    {
        id: 2,
        name: 'Hello'
    },
    {
        id: 3,
        name: 'Hello'
    },
]

app.get('/get-all-user', async function (req, res) {
    await new Promise((resolve) => setTimeout(() => { resolve() }, 3000))
    return res.send(mockData)
})

app.listen(3000, function () {
    console.log('Server start with port 3000')
})