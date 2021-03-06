

/*-----------game starting function--------------*/
function startGame(){
    gameStatus='running';
    //send game start signal to server
    socket.emit('send game start',room);
    //update gamestatus info panel
    gameStatusInfo();
    //put info to panel
    insertInfo('You started the game');
}
/* ----------------------------------------------*/

/*-----------game restarting function------------*/
function gameRestart(){

    gameStatus='ready';
    //update gamestatus info panel
    gameStatusInfo();
    //put info to panel
    insertInfo('You restarted the game');
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
    player.x=landingPosition.x;
    player.y=landingPosition.y;
    winner='none';
    player.body.setVelocityX(0);
    player.body.setVelocityY(0);
    for(var i=0;i<players.length;i++){
        players[i].pos_x=players[i].landingPos_x;
        players[i].pos_y=players[i].landingPos_y;
        enemies[i].x=players[i].pos_x;
        enemies[i].y=players[i].pos_y;
    }
}
/* --------------------------------------------*/

/* ---------check if player won----------------*/
function isWon(){
    //if you won
    if(winningCriteria()){
        gameStatus='won';
        winner=playerUsername;
        //update gamestatus info panel
        gameStatusInfo();
        //update info panel with you being won
        insertInfo('You won the game');
        //send signal to server for winning
        socket.emit('send game won',room);
    }
}
/* --------------------------------------------*/
function winningCriteria(){
    if(player.x>winningCoordinates.right_x||player.x<winningCoordinates.left_x||player.y>winningCoordinates.down_y||player.y<winningCoordinates.up_y){
        return true;
    }
    return false;
}
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
function addOnlinePlayer(name,admin){
    const panel=document.getElementById('online-players');
    const onlinePlayer=document.createElement('div');
    onlinePlayer.className='online-player';
    let adminTag='';
    if(admin){
        adminTag=' (admin)';
    }
    onlinePlayer.innerHTML=name+adminTag;
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
            let adminTag='';
            if(players[i].admin){
                adminTag='(admin)';
            }
            onlinePlayer.innerHTML=players[i].username+adminTag;
            panel.appendChild(onlinePlayer);
        }
    }

}
/* -----------------------------------------------*/



