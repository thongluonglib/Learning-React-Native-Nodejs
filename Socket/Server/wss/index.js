const server = require('http').createServer();
const io = require('socket.io')(server);

const rooms = new Map()
io.on('connection', async (socket) => {
    console.log("Client connected!!!", socket.id)
    socket.on('event', (data) => {
        // Send clientId to client
        socket.emit({
            clientId: socket.id
        })
        
        // Send message to group
        // socket.to(rooms.get(socket.id).groupName).emit(data?.chat)
        console.log('data', data)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected!!!')
        rooms.delete(socket.id)
    });

    socket.on('join-group', (data) => {
        const groupName = data?.groupName
        socket.join(`${groupName}`);
        rooms.set(socket.id, {
            clientId: socket.id,
            groupName,
            join_date: new Date()
        });
        console.log('Get group name----', rooms.get(socket.id).groupName)
    })

    if(rooms.get(socket.id).groupName) {
        // Create message event of group
        socket.to(rooms.get(socket.id).groupName).on("message", () => {
            socket.to(rooms.get(socket.id).groupName).emit(data)
        })
    }
    socket.on('leave-room', (data) => {
        socket.leave(rooms.get(socket.id))
        rooms.delete(socket.id)
        console.log("Client has leaved room: ", socket.id, rooms)
    })
});
server.listen(5005, () => {
    console.log('Server socket start at port 5005')
});