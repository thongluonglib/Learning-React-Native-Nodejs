var express = require('express')

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World')
})

app.listen(3000, 'localhost', () => {
    console.log('Server Start 3000')
})