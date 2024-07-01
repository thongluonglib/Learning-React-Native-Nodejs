import express from "express";
import sql from 'mssql'
import { dbConnect, executeProcedure } from './src/utils/db.mjs'
const app = express();
app.use(express.json())
dbConnect(sql)

app.post('/create-book', async (req, res) => {
    const data = await executeProcedure(sql, 'sp_createbook', {
        sBookName: req.body.bookName + index,
        sBookType: req.body.bookType
    })
    return res.send(data)
})
app.post('/get-books', async (req, res) => {
    console.log('req.body', req.body)
    const data = await executeProcedure(sql, 'sp_getbooks', {
        pageNumber: req.body.pageNumber || 0,
        limit: req.body.limit || 20
    })
    let dataFormat
    try {
        dataFormat = JSON.parse(data.recordset[0].result)
    } catch (error) {
        console.log(error)
    }
    if(dataFormat) {
        return res.send(dataFormat)
    }
    return res.send(data)
})

app.listen(3000, () => {
    console.log('Server start with port 3000')
})