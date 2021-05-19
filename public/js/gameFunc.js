

/*-----------game starting function--------------*/
function startGame(){
    gameStatus='running';
    //send game start signal to server
    socket.emit('send game start',room);
    //update gamestatus info panel
    gameStatusInfo();
}
/* ----------------------------------------------*/

/*-----------game restarting function------------*/
function gameRestart(){
    gameStatus='ready';
    //send signal to server for restart
    socket.emit('send game restart',room);
    //update gamestatus info panel
    gameStatusInfo();
    reset();
}
/* --------------------------------------------*/

/*-----------check gameover function-----------*/
//check game over
function isGameOver(){

}
/* --------------------------------------------*/

/* ------------reset game----------------------*/
function reset(){
    setPlayerPosition(1800,1800);
    winner='none';
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
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

/* ---------check if player won----------------*/
function isWon(){
    //if you won
    if(player.x<player.width/2||player.x>4000+player.width/2||player.y<player.height/2||player.x>+3864+player.height/2){
        gameStatus='won';
        winner=playerUsername;
        //update gamestatus info panel
        gameStatusInfo();
        //send signal to server for winning
        socket.emit('send game won',room);
    }
    //if someone won , event received
    else{
        socket.on('receive game won',({username})=>{
            winner='username';
            gameStatus='won';
        });
    }
}
/* --------------------------------------------*/

/* --------game status info board--------------*/
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
        if(winner==playerUsername){
            winner="you";
        }
        infoPanel.innerHTML=winner + ' Escaped the maze !!';
    }
}
/* -----------------------------------------------*/

/* ------add online players to panel--------------*/
function addOnlinePlayer(name){
    const panel=document.getElementById('online-players');
    const onlinePlayer=document.createElement('div');
    onlinePlayer.className='online-player';
    onlinePlayer.innerHTML=name;
    panel.appendChild(onlinePlayer);
}
/* ----------------------------------------------*/

/* --------update in game players panel----------*/
function updateOnlinePanel(){
    const panel=document.getElementById('online-players');
    panel.innerHTML='';
    for(var i=0;i<players.length;i++){
        if(players[i].status){
            const onlinePlayer=document.createElement('div');
            onlinePlayer.className='online-player';
            onlinePlayer.innerHTML=players[i].username;
            panel.appendChild(onlinePlayer);
        }
    }

}
/* -----------------------------------------------*/



