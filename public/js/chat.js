const socket = io();

function scrollToBottom(){
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child')
    // Height
    const clientHeight = messages.prop('clientHeight')
    const scrollTop = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight()
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect' , function(){
   const params = $.deparam(window.location.search);
   socket.emit('join' , params , function(err){
    if(err){
        alert(err)
        window.location.href = '/'
    }else{
        console.log('No Error')
    }
   })
})

socket.on('disconnect' , function(){
    console.log('Disconnect from server')
})
socket.on('updateUserList' , function(users){
    $('#users').html('')
    const ol = $('<ol></ol>');
    users.forEach(function(user){
        ol.append($('<li></li>').text(user))
    })
    $('#users').append(ol)
})
socket.on('newMessage' , function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a') 
    const template = $('#message-template').html();
    const html = Mustache.render(template , {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
        });
    $('#messages').append(html);
    scrollToBottom()
})

socket.on('newLocationMessage' , function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a') 
    const template = $('#location-template').html();
    const html = Mustache.render(template , {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
        });
    $('#messages').append(html)
    scrollToBottom()
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

const locationButton = $('#send-location');

locationButton.on('click' , function(){
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage' , {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    } , function(){
        alert('Unable to fetch location')
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