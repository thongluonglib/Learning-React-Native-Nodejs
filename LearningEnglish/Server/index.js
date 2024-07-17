var express = require('express')
const app = express();
const sql = require('mssql');
const { executeProcedure, dbConnect } = require('./utils/db');

app.use(express.json());
dbConnect(sql);
app.get('/', function (req, res) {
    return res.send('Hello')
})

app.get('/get-vocalbulary', async function (req, res) {
    res.header({"Access-Control-Allow-Origin": "*"})
    const result = await executeProcedure(sql, 'dbo.sp_getvocabulary', {})
    console.log('result', result)
    return res.send(result.recordset)
})

app.listen(3000, "localhost", () => {
    console.log('Server start with port 3000')
})