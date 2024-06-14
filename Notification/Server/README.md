# Learning-React-Native-Nodejs

1. Start server: node index.mjs
2. go to postman and send notification to client 
-- POST localhost:3000/send-notification
{
    "fcmTokens": [
        "eEt4XYTnRRex06...."
    ],
    "display": {
        "title": "Notification Title",
        "body": "Main body content of the notification",
        "android": {
            "channelId": "default",
            "pressAction": {
                "id": "default",
                "launchActivity": "com.petproject.MainActivity"
            }
        },
        "ios": {
            "foregroundPresentationOptions": {
                "badge": true,
                "sound": true,
                "banner": true,
                "list": true
            }
        }
    }
}