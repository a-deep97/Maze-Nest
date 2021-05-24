/*----------------------------------------------------*/
// listen to server to receive game start signal
socket.on('receive game start',()=>{
    gameStatus='running';
    gameStatusInfo();
    insertInfo('Admin started the game');
});
/*----------------------------------------------------*/
//listen to server to receive for game won signal
socket.on('receive game won',(id)=>{
    gameStatus='won';
    winner=getPlayer(id).username;
    gameStatusInfo();
    //set won info to panel
    insertInfo(winner+' won the game');
});
/*----------------------------------------------------*/
//listen to server to receive for game restart signal
socket.on('receive game restart',()=>{
    gameStatus='ready';
    console.log('hello');
    gameRestart();
    gameStatusInfo();
    insertInfo('Admin restarted the game');
});
/*----------------------------------------------------*/
//get other  player's positions from server with their id
socket.on('get position',({ID,pos_x,pos_y,facing,isMoving})=>{
    setPosition(ID,pos_x,pos_y,facing,isMoving);
});

/*----------------------------------------------------*/
//receive player's message
socket.on('receive message',({username,message})=>{
    insertMessage(username,message);
});