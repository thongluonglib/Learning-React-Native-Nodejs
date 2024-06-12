1. Start server nodejs: npm index.mjs
2. Goto website http://localhost:3000/ and then upload file
3. Go to folder image in server folder to see result

You can change folder image or anything name and goto code below and change ./folder_name you want
destination(req, file, callback) {
        callback(null, './images');
    },

Here you also can upload anything file different image