import express from 'express'
const app = express();
import admin from 'firebase-admin'
import serviceAccount from './privatekey' assert { type: "json" };

app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});


async function sendMessage(fcmTokens, display) {
    // Fetch the tokens from an external datastore (e.g. database)

    // Send a message to devices with the registered tokens
    await admin.messaging().sendMulticast({
        tokens: fcmTokens, // ['token_1', 'token_2', ...]
        data: {
            // Add params here
            notifee: JSON.stringify(display),
        },
    });

}

// Send messages to our users
app.post('/send-notification', async function(req, res) {
    const { fcmTokens, display } = req.body
    await sendMessage(fcmTokens, display)
    return res.send("success");
})

app.listen(3000, "localhost", () => {
    console.log('Server start with 3000')
})
