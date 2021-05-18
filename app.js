const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const bodyParser=require('body-parser');
const path=require('path');

app.use(bodyParser.urlencoded({ extended: true }));

//importing util instances instance
const Users=require('./utils/USERS');
const Auth=require('./utils/authentication');

//specifying static folder(public)
app.use(express.static('public'));

// setup view engine (i.e. : ejs)
app.set('view engine','ejs');

//getting pages

app.get('/',(req,res)=>{
    let error='';
    error=req.query.error;
    console.log(error);
    res.render('index');
});
app.post('/',(req,res)=>{
    const authStatus=Auth.authenticateJoin(req.body.username,req.body.room);
    console.log(authStatus);
    if(authStatus=='clear'){    //authentication clear
        //redirecting to game route with query string including username and room
        res.redirect('/game?username='+req.body.username+'&room='+req.body.room);
    }
    else{   //not authenticated
        res.redirect('/?error='+authStatus);
    }

});
app.get('/game',(req,res)=>{
    //req.query contains username and room info sending to client page via ejs parameter
    res.render('game',{userData:req.query});
});

//socket connection
io.on('connection',(socket)=>{

    socket.on('on join',({playerUsername,room})=>{

        const ID =socket.id;
        socket.join(room);
        //emit current info to newly joined
        socket.emit('new join info',Users.getUsers(room));
        //adding this player to server data : USERS
        Users.addUser(ID,playerUsername,room);
        //broadcast new player
        socket.broadcast.to(room).emit('player added',{playerUsername,ID});
    });
    //receive the position from client
    socket.on('self position',({x,y,room})=>{
        const ID=socket.id;
        //broadcast this position to other players
        socket.broadcast.to(room).emit('get position',{ID,x,y});
    });

    //incoming signal for game start
    socket.on('send game start',(room)=>{
        // update room status
        Users.setRoomStatus(room,'running');
        //broascast start event to all players
        socket.broadcast.to(room).emit('receive game start');
    });
    //receive game won info
    socket.on('send game won',(room)=>{
        const ID=socket.id;
        //roadcast winner
        socket.broadcast.to(room).emit('receive game won',ID);   
    });
    //receive game restart signal
    socket.on('send game restart',(room)=>{
        // update room status
        Users.setRoomStatus(room,'waiting');
        //emit the restart signal
        socket.broadcast.to(room).emit('receive game restart'); 
    });
})



//server listening to specified port
const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log('server listening at : '+PORT);
});