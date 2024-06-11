# Learning-React-Native-Nodejs

Nodejs: 
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