import express from 'express'
import { User, realm } from './utils/Realm.mjs';
import bcrypt from 'bcrypt'
const app = express();
app.use(express.json())

app.get('/get-all-user', (req, res) => {
    const users = realm.objects(User);
    return res.send(users)
})

app.get('/get-user-by-id', (req, res) => {
    const { userId } = req.query
    // Way1: get user by id 
    // const users = realm.objects(User);
    // const user = users.filtered("_id = $0", Realm.BSON.ObjectId(userId));

    // Way2: get user by id 
    const user = realm.objectForPrimaryKey(User, Realm.BSON.ObjectId(userId))
    return res.send(user)
})

app.post('/create-user', async (req, res) => {
    const { userName, password, dayofBirth, status } = req.body
    let user;
    const passwordEncode = await bcrypt.hash(password, 8)
    realm.write(() => {
        user = realm.create(User, {
            userName,
            password: passwordEncode,
            dayofBirth,
            status,
        })
    })
    return res.send(user)
})

app.put('/update-user-by-id', (req, res) => {
    let user
    const { userName, dayofBirth, status } = req.body
    realm.write(() => {
        const { userId = '6671740b70bc6c7776e27c8a' } = req.query
        user = realm.objectForPrimaryKey(User, Realm.BSON.ObjectId(userId))
        user.userName = userName
        user.status = status
    })
    return res.send(user)
})


app.listen(3000, () => {
    console.log("Server start with port 3000")
})