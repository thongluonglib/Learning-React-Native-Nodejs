const server = require('http').createServer();
const io = require('socket.io')(server);

const rooms = new Map()
io.on('connection', async (socket) => {
    console.log("Client connected!!!", socket.id)

    socket.on('disconnect', () => {
        console.log('Client disconnected!!!')
        rooms.delete(socket.id)
    });

    // Create room
    socket.on('join-room', (data) => {
        const roomName = data?.roomName
        socket.join(`${roomName}`);
        rooms.set(socket.id, {
            clientId: socket.id,
            roomName,
            join_date: new Date()
        });
        console.log(`Client ${socket.id} Has joined room: ${rooms.get(socket.id).roomName}`)

    })
    // Create message chat-meesage event of room
    socket.on("chat-message", (data) => {
        console.log('chat-message', data?.roomName)
        io.to(`${data?.roomName}`).emit("chat-message", {
            ...data,
            clientId: socket.id
        })
    })

    // Leave room
    socket.on('leave-room', (data) => {
        socket.leave(rooms.get(socket.id))
        rooms.delete(socket.id)
        console.log("Client has leaved room: ", socket.id, rooms)
    })
});

server.listen(5005, () => {
    console.log('Server socket start at port 5005')
});