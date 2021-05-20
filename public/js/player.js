/*-------------player properties------------------- */
let playerPosition={};
let isPlayerAdmin=false;
let playerUsername;
let room;
let playerID;
/*----store current player position in local database for sharing------- */
function setPlayerPosition(x,y){
    playerPosition={x,y};
    //emit current player position to server
    socket.emit('self position',{x,y,room});
}
/*------------------------------------------------------------------------*/

/*------------------------get player current position---------------------*/
function getPlayerPosition(){
    return playerPosition;   
}
/*------------------------------------------------------------------------*/

/*------------------------------------------------------------------------*/

/*---------------function to control player-------------------------------*/
function controlPlayer(){
    player.body.setVelocityY(0);
    player.body.setVelocityX(0);
    if(keys.left.isDown){
        player.body.setVelocityX(-1*speed);
    }
    else if(keys.right.isDown){
        player.body.setVelocityX(1*speed);
    }
    else if(keys.up.isDown){
        player.body.setVelocityY(-1*speed);
    }
    else if(keys.down.isDown){
        player.body.setVelocityY(1*speed);
    }
    //set player position to data on each frame
    setPlayerPosition(player.x,player.y);
}
/*------------------------------------------------------------------------*/