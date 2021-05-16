const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);


//specifying static folder(public)
app.use(express.static('public'));


//getting pages

app.get('/',(req,res)=>{
    res.sendfile('index');
});
app.post('/',(req,res)=>{
    
});
app.get('game',(req,res)=>{

});









//server listening to specified port
const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log('server listening at : '+PORT);
});