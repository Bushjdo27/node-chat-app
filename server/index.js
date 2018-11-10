const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage ,generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/user');

const publicPath = path.join(__dirname,'..','/public');
const PORT = process.env.PORT || 3000
const app = express();

const server = http.createServer(app);
const io = socketIO(server); 

const users = new Users();

app.use(express.static(publicPath))

io.on('connection' , (socket)=>{
    // args : it represent for the individual socket to all of the users connected
    // to server

    

    // ---- Room Socket ----

    socket.on('join' , (params , callback)=>{
        
        if(!isRealString(params.name) || !isRealString(params.room)){
            
            return callback('Name and room name are required')
            
        }
        socket.join(params.room);
        users.removeUser(socket.id); // remove user in old room
        users.addUser(socket.id , params.name ,params.room)
        // socket.leave('fans group');  out room fans group

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        //------
        // io.emit -> io.to('fans group').emit;
        socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to chat app'))
        // socket.broadcast.emit -> socket.broadcast.to('fans group').emit
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin' , `${params.name} has joined`))
        callback()
    })
    socket.on('createMessage' , (message , callback)=>{
        
        //callback('Called from Server'); //Call function in Client Side

        const user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage' , generateMessage(user.name,message.text));
            callback()
        }
    })

    socket.on('createLocationMessage', function(coords){
        //const user = users.getUser(socket.id);
        //io.emit('newLocationMessage', generateLocationMessage('Admin' ,coords.latitude, coords.longitude))
        const user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name ,coords.latitude, coords.longitude))
            
        }
    })
    
    socket.on('disconnect' , function(){
        const user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin' , `${user.name} has left`));
        }
    })
})

server.listen(PORT , ()=>{
    console.log(`Server is listen at ${PORT}...`)
})
