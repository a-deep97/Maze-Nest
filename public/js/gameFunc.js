

//start game
function startGame(){
    gameStatus='running';
}
/* --------------------------------------------*/
//restart game
function gameRestart(){
    gameStatus='ready';
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
//check if player(you) won
function isWon(){
    if(player.x<player.width/2||player.x>4000+player.width/2||player.y<player.height/2||player.x>+3864+player.height/2){
        gameStatus='won';
        //send signal to server for winning
        socket.emit('send game won');
    }
}
/* --------------------------------------------*/


/* --------------------------------------------*/

/* --------------------------------------------*/






