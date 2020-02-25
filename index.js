var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)

server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server listening on port '+ server.address().port)
})

var listUser = []
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('user_login', (user_name) => {
        console.log(user_name + 'has joined this room!')

        if(listUser.indexOf(user_name) > -1){
            return
        }
        listUser.push(user_name)
        socket.use = user_name
        socket.broadcast.emit('user_joined', user_name + 'has joined the room')
    })

    socket.on('msg', (sender, mgs_content) => {
        console.log(sender + ': ' + mgs_content)
        let message = { "message": mgs_content, "sender": sender }
        socket.emit('message', mgs_content)
    })

    socket.on('disconneted', () => {
        console.log(user_name + ' has left')
        socket.broadcast.emit('user_left', 'user has left')
    })

})
