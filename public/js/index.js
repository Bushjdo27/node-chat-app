const socket = io();

socket.on('connect' , function(){
    //console.log('Connect success')
    socket.on('welcome-chat-app' , function(message){
        console.log(message)
    })
})

socket.on('newMessage' , function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a') 
    const template = $('#message-template').html();
    const html = Mustache.render(template , {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
        });
    $('#messages').append(html)
})


$('#message-form').on('submit', function(e){
    e.preventDefault();
    
    console.log($('input[name=message]').val())
    socket.emit('createMessage' , {
        from: 'User',
        text: $('input[name=message]').val()
    } , function(response){
        $('input[name=message]').val('')
        console.log("Sended")
    })
})

/*
socket.on('newMessage' , function(message){
    // Create <li> for render message
    const li = $('<li></li>');
    // Add content for li
    li.text(`${message.from} : ${message.text}`)
    // Add li to <ol>
    $('#messages').append(li)
})

*/