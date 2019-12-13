const express = require('express')
http = require('http')
app = express()
server = http.createServer(app),
    io = require('socket.io').listen(server);
app.get('/', (req, res) => {
    res.send('Chat Server is running on port 3000')
})

io.on('connnection', (socket) => {
    console.log('user connected')
    socket.on('join', (userName) => {
        console.log(userName + 'has joined this room!')
        socket.broadcast.emit('userjoinedthechat', userName + 'has joined the room')
    })

    socket.on('messagedetected', (senderName, messageContent) => {
        console.log(senderName + ': ' + messageContent)
        let message = { "message": messageContent, "sender": senderName }
        socket.emit('message', messageContent)
    })
    
    socket.on('disconneted', () => {
        console.log(userName + ' has left')
        socket.broadcast.emit('userdisconnnected', 'user has left')
    })
    
})


server.listen(3000, () => {
    console.log('Node app is running on port 3000')
})