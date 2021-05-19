/*----------------------------------------------------*/
// listen to server to receive game start signal
socket.on('receive game start',()=>{
    gameStatus='running';
    gameStatusInfo();
});
/*----------------------------------------------------*/
//listen to server to receive for game won signal
socket.on('receive game won',(id)=>{
    gameStatus='won';
    winner=getPlayer(id).username;
    gameStatusInfo();
});
/*----------------------------------------------------*/
//listen to server to receive for game restart signal
socket.on('receive game restart',()=>{
    gameStatus='ready';
    gameRestart();
    gameStatusInfo();
});
/*----------------------------------------------------*/
//get other  player's positions from server with their id
socket.on('get position',({ID,x,y})=>{
    setPosition(ID,x,y);
});
/*----------------------------------------------------*/