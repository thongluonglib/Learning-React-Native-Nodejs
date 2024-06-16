const sqlConfig = {
    user: 'sa',
    password: 'john',
    database: 'LearningDB',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    },
}
async function dbConnect(sql){
    await sql.connect(sqlConfig)
}
const executeProcedure = async (sql, procName, params = {}) => {
    try {
        await sql.connect(sqlConfig)
        // const result = await sql.query(`selecct * from UserSystem`)
        const request = new sql.Request()
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                request.input(key, params[key])
            }
        }
        // request.output('output_parameter', sql.Int)
        const result = await request.execute(procName)
        return result

    }
    catch (error) {
        console.log('Error: ', error)
    }
}
module.exports = {
    executeProcedure,
    dbConnect
}