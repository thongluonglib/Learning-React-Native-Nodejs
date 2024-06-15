const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log("Client connected!!!")
    socket.on('message', (data) => {
        console.log('data', data)
    })
    socket.on('disconnect', () => { 
        console.log('Client disconnected!!!')
    });

});
server.listen(5005, () => {
    console.log('Server socket start at port 5005')
});