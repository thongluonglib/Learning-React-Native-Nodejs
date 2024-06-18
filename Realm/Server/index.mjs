import express from 'express'
import { User, realm } from './utils/Realm.mjs';
const app = express();
app.use(express.json())

app.get('/get-all-user', (req, res) => {
    const users = realm.objects(User);
    console.log('users', JSON.stringify(users, null, 2))
    return res.send(users)
})

app.get('/get-user-by-id', (req, res) => {
    const { userId } = req.query
    // Way1: get user by id 
    // const users = realm.objects(User);
    // const user = users.filtered("_id = $0", Realm.BSON.ObjectId(userId));

    // Way2: get user by id 
    const user = realm.objectForPrimaryKey(User, Realm.BSON.ObjectId(userId))
    console.log('user', JSON.stringify(user, null, 2))
    return res.send(user)
})

app.post('/create-user', (req, res) => {
    const { userName, password, dayofBirth, status } = req.body
    let user;
    console.log('req.body', JSON.stringify(req.body, null, 2))
    realm.write(() => {
        user = realm.create(User, {
            userName,
            password,
            dayofBirth,
            status,
        })
    })
    return res.send(user)
})

app.put('/update-user-by-id', (req, res) => {
    let user
    const { userName, password, dayofBirth, status } = req.body
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