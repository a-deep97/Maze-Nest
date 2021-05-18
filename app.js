const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const bodyParser=require('body-parser');
const path=require('path');

app.use(bodyParser.urlencoded({ extended: true }));

//importing USERS instance
const Users=require('./utils/USERS');

//specifying static folder(public)
app.use(express.static('public'));

// setup view engine (i.e. : ejs)
app.set('view engine','ejs');

//getting pages

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect('/game');
});
app.get('/game',(req,res)=>{
    res.render('game');
});

//socket connection
io.on('connection',(socket)=>{

    socket.on('on join',({username})=>{

        //emit current info to newly joined
        socket.emit('new join info',Users.getUsers());
        const ID =socket.id;
        //adding this player to server data : USERS
        Users.addUser(ID,username);

        console.log(ID+ ' joined');
        //broadcast new player
        socket.broadcast.emit('player added',{username,ID});
    });
    socket.on('self position',({x,y})=>{
        const ID=socket.id;
        socket.broadcast.emit('get position',{ID,x,y});
    });

    //game events
    socket.on('send game start',()=>{
        console.log('game start');
        socket.broadcast.emit('receive game start');
    });
    socket.on('send game won',(id)=>{
        console.log(id + 'won the game');
        socket.broadcast.emit('receive game won',id);   
    });
    socket.on('send game restart',()=>{
        console.log('game restarted');
        socket.broadcast.emit('receive game restart'); 
    });
})







//server listening to specified port
const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log('server listening at : '+PORT);
});