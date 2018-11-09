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

socket.on('newLocationMessage' , function(message){
    const formattedTime = moment(message.createdAt).format('h:mm a') 
    const template = $('#location-template').html();
    const html = Mustache.render(template , {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
        });
    $('#messages').append(html)
})

//https://www.google.com/maps/q=
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
        console.log(position);
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