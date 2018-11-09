const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage ,generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname,'..','/public');
const PORT = process.env.PORT || 3000
const app = express();

const server = http.createServer(app);
const io = socketIO(server); 
app.use(express.static(publicPath))

io.on('connection' , (socket)=>{
    // args : it represent for the individual socket to all of the users connected
    // to server

    socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to chat app'))

    socket.broadcast.emit('newMessage',generateMessage('Admin' , 'New User joined'))

    socket.on('createMessage' , (message , callback)=>{
        io.emit('newMessage' , generateMessage(message.from,message.text));
        callback('Called from Server'); //Call function in Client Side
    })

    socket.on('createLocationMessage', function(coords){
        io.emit('newLocationMessage', generateLocationMessage('Admin' ,coords.latitude, coords.longitude))
    })
    
    socket.on('disconnect' , function(){
        console.log('Disconect user')
    })
})

server.listen(PORT , ()=>{
    console.log(`Server is listen at ${PORT}...`)
})
