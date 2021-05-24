/*-------------player properties------------------- */
let playerPosition={};
let isPlayerAdmin=false;
let playerUsername;
let room;
let playerID;
let playerMovingStatus={facing:'',ismoving:false};
/*------------set random landing positions----------------------*/
function setLandingPosition(){
    landingPosition.x = Math.floor(Math.random() * (landingLimitCoordinates.right - landingLimitCoordinates.left + 1) + landingLimitCoordinates.left);
    landingPosition.y = Math.floor(Math.random() * (landingLimitCoordinates.down - landingLimitCoordinates.up + 1) + landingLimitCoordinates.up);
}

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
    playerMovingStatus.ismoving=true;//put moving status to true to signal to other players
    if(keys.left.isDown){
        player.body.setVelocityX(-1*speed);
        player.play('walk_left',true);
        playerMovingStatus.facing='left';
    }
    else if(keys.right.isDown){
        player.body.setVelocityX(1*speed);
        player.play('walk_right',true);
        playerMovingStatus.facing='right';
    }
    else if(keys.up.isDown){
        player.body.setVelocityY(-1*speed);
        if(playerMovingStatus.facing=='left'){
            player.play('walk_left',true);
        }
        else{
            player.play('walk_right',true);
        }
    }
    else if(keys.down.isDown){
        player.body.setVelocityY(1*speed);
        if(playerMovingStatus.facing=='left'){
            player.play('walk_left',true);
        }
        else{
            player.play('walk_right',true);
        }
    }
    else{
        playerMovingStatus.ismoving=false;//put moving status false when idle
        if(playerMovingStatus.facing=='left'){
            player.play('idle_left',true);
        }
        else{
            player.play('idle_right',true);
        }
    }
    //set player position to data on each frame
    setPlayerPosition(player.x,player.y);
}
/*------------------------------------------------------------------------*/