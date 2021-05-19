/*----------------requiring libs ----------------*/
const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const bodyParser=require('body-parser');
const path=require('path');

/*------------------setup client properties-----------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
//specifying static folder(public)
app.use(express.static('public'));
// setup view engine (i.e. : ejs)
app.set('view engine','ejs');

/*----------importing util instances instance---------------------*/
const Users=require('./utils/USERS');
const Auth=require('./utils/authentication');
/*----------------------------------------------------------------*/

/*--------------get/post express methods--------------------------*/
//get request method for home
app.get('/',(req,res)=>{
    let result='';  //to store the query results after redirections
    if(req.query.error){
        result=req.query.error;
    }
    else if(req.query.success){
        result=req.query.success;
    }
    res.render('index');
});
//post request method for joining
app.post('/',(req,res)=>{
    //authenticate login cred
    const authStatus=Auth.authenticateJoin(req.body.username,req.body.room);
    if(authStatus=='clear'){    //authentication clear
        //redirecting to game route with query string including username and room
        res.redirect('/game?username='+req.body.username+'&room='+req.body.room);
    }
    else{   //not authenticated : redirect with error
        res.redirect('/?error='+authStatus);
    }
});
//post method for new room creating
app.post('/new',(req,res)=>{
    //if room creating succefull redirect to home with succefull error
    if(Users.createRoom(req.body.roomName)){
        const success='login to created room';
        res.redirect('/?success='+success);
    }
    else{   //else redirect with error: not created
        const error='room already exists'; 
        res.redirect('/?error='+error);
    }
});
//get request method for game page
app.get('/game',(req,res)=>{
    //req.query contains username and room info sending to client page via ejs parameter
    res.render('game',{userData:req.query});
});
/*----------------------------------------------------------------*/


/*-------------------socket connections---------------------------*/
//connection event when a client joins an socket instance created
io.on('connection',(socket)=>{
    // on join event received from client on join with their username and room
    socket.on('on join',({playerUsername,room})=>{
        const ID =socket.id;    //getting socket id
        socket.join(room);      //join the client the the room
        socket.emit('new join info',Users.getUsers(room));  //emit current info to newly joined
        Users.addUser(ID,playerUsername,room);  //adding this player to server data : USERS
        //broadcast new player info to other players
        socket.broadcast.to(room).emit('player added',{playerUsername,ID});
    });

    //receive signal from client on disconnection
    socket.on('disconnect',()=>{
        const ID=socket.id;
        //get player from server database
        const player=Users.getUser(ID);
        //remove player from server
        Users.removeUser(ID);
        //check if disconnecting user is admin
        if(player&&player.admin){
            Users.disposeRoom(player.room);
            //broadast to all about the room colapse due to admin leaving
            const error='admin left';
            socket.broadcast.to(player.room).emit('admin left',{error});
        }
        else if(player){
            //broadcast user disconnection info
            socket.broadcast.to(player.room).emit('user disconnected',{ID});
        }
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
});
/*----------------------------------------------------------------*/


/*-----------server listening to specified port--------------------*/
const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log('server listening at : '+PORT);
});
/*----------------------------------------------------------------*/