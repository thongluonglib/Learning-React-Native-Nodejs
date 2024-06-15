var express = require('express')

const app = express();


app.listen(3000, "localhost", () => {
    console.log('Server start with port 3000')
})