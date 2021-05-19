/*----------------------------------------------------*/
// listen to server to receive game start signal
socket.on('receive game start',()=>{
    gameStatus='running';
    console.log('game started');
});
/*----------------------------------------------------*/
//listen to server to receive for game won signal
socket.on('receive game won',(id)=>{
    gameStatus='won';
    const winner=getPlayer(id).username;
    console.log(winner+' won');
});
/*----------------------------------------------------*/
//listen to server to receive for game restart signal
socket.on('receive game restart',()=>{
    gameStatus='ready';
    gameRestart();
});
/*----------------------------------------------------*/

//get other  player's positions from server with their id
socket.on('get position',({ID,x,y})=>{
    setPosition(ID,x,y);
});
/*----------------------------------------------------*/