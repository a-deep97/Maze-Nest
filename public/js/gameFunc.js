

//start game
function startGame(){
    gameStatus='running';
    //update gamestatus info panel
    gameStatusInfo();
}
/* --------------------------------------------*/
//restart game
function gameRestart(){
    gameStatus='ready';
    //update gamestatus info panel
    gameStatusInfo();
    reset();
}
/* --------------------------------------------*/
//check game over
function isGameOver(){

}
/* --------------------------------------------*/
//reset game
function reset(){
    setPlayerPosition(1800,1800);
    winner='none';
    player.x=1800;
    player.y=1800;
    for(var i=0;i<players.length;i++){
        players[i].pos_x=1800;
        players[i].pos_y=1800;
        enemies[i].x=1800;
        enemies[i].y=1800;
    }
}
/* --------------------------------------------*/
//check if player won
function isWon(){
    //if you won
    if(player.x<player.width/2||player.x>4000+player.width/2||player.y<player.height/2||player.x>+3864+player.height/2){
        gameStatus='won';
        winner=playerUsername;
        //update gamestatus info panel
        gameStatusInfo();
        //send signal to server for winning
        socket.emit('send game won');
    }
    //if someone won
    else{
        socket.on('receive game won',({username})=>{
            console.log(username+' won');
            winner='username';
            gameStatus='won';
        });
    }
}
/* --------------------------------------------*/
//game status info board
function gameStatusInfo(){
    const infoPanel=document.getElementById('game-status-container');
    infoPanel.innerHTML='';
    if(gameStatus=='ready'){
        infoPanel.innerHTML='Ready to start the game';
    }
    else if(gameStatus=='running'){
        infoPanel.innerHTML='Escape is going on !! Move';
    }
    else if(gameStatus=='won'){
        infoPanel.innerHTML=winner + ' Escaped the maze !!';
    }
}
/* --------------------------------------------*/
//add online players to panel
function addOnlinePlayer(name){
    const panel=document.getElementById('online-players');
    const onlinePlayer=document.createElement('div');
    onlinePlayer.className='online-player';
    onlinePlayer.innerHTML=name;
    panel.appendChild(onlinePlayer);
}
/* --------------------------------------------*/






