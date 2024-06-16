var express = require('express')
const app = express();
const sql = require('mssql');
const bcrypt = require('bcrypt')
const { executeProcedure, dbConnect } = require('./utils/db');

app.use(express.json());
dbConnect(sql);
app.get('/', function (req, res) {
    return res.send('Hello')
})

app.get('/get-all-user', async function (req, res) {
    const result = await executeProcedure(sql, 'dbo.sp_getalluser', {})
    console.log('result', result)
    return res.send(result.recordset)
})
app.post('/create-user', async function (req, res) {
    const bPassword = await bcrypt.hashSync(req.body.password, 8)
    const result = await executeProcedure(sql, 'dbo.sp_createuser', {
        sName: req.body?.username,
        sPassword: bPassword
    })
    console.log('result', result)
    return res.send(result)
})

app.listen(3000, "localhost", () => {
    console.log('Server start with port 3000')
})