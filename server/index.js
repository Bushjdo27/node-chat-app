const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname,'..','/public');
const PORT = process.env.PORT || 3000
const app = express();

const server = http.createServer(app);
const io = socketIO(server); 
app.use(express.static(publicPath))

io.on('connection' , (socket)=>{
    // args : it represent for the individual socket to all of the users connected
    // to server

    socket.emit('newMessage' , generateMessage('admin' , 'Welcome to chat app'))

    socket.broadcast.emit('newMessage',generateMessage('admin' , 'New User joined'))

    socket.on('createMessage' , (message , callback)=>{
        console.log('Message from Client is : ',message);
        io.emit('newMessage' , generateMessage(message.from,message.text));
        callback('Called from Server'); //Call function in Client Side
    })
     // Broadcast to all User is connecting
        // User nao dang lang nghe su kien "newMessage" -> se nhan dc message nay 
     // socket.broadcast.emit('newMessage' , {
        //     from: 'admin',
        //     text: `${message.from} has joined room`,
        //     createdAt: new Date().getTime()
        // })
    
    socket.on('disconnect' , function(){
        console.log('Disconect user')
    })
})

server.listen(PORT , ()=>{
    console.log(`Server is listen at ${PORT}...`)
})
