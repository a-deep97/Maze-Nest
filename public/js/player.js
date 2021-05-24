/*-------------player properties------------------- */
let playerPosition={};
let isPlayerAdmin=false;
let playerUsername;
let room;
let playerID;
let playerMovingStatus={facing:'',isMoving:false};
/*------------set random landing positions----------------------*/
function setLandingPosition(){
    landingPosition.x = Math.floor(Math.random() * (landingLimitCoordinates.right - landingLimitCoordinates.left + 1) + landingLimitCoordinates.left);
    landingPosition.y = Math.floor(Math.random() * (landingLimitCoordinates.down - landingLimitCoordinates.up + 1) + landingLimitCoordinates.up);
}

/*----store current player position in local database for sharing------- */
function setPlayerPosition(x,y){
    playerPosition={x,y};
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

    //position data to be sent to server
    const pos_x=playerPosition.x;
    const pos_y=playerPosition.y;
    const facing=playerMovingStatus.facing;
    const isMoving=playerMovingStatus.isMoving;
    
    if(keys.left.isDown){
        player.body.setVelocityX(-1*speed);
        player.play('player_walk_left',true);
        playerMovingStatus.facing='left';
        playerMovingStatus.isMoving=true;//put moving status to true to signal to other players
    }
    else if(keys.right.isDown){
        player.body.setVelocityX(1*speed);
        player.play('player_walk_right',true);
        playerMovingStatus.facing='right';
        playerMovingStatus.isMoving=true;//put moving status to true to signal to other players
    }
    else if(keys.up.isDown){
        player.body.setVelocityY(-1*speed);
        if(playerMovingStatus.facing=='left'){
            player.play('player_walk_left',true);
        }
        else{
            player.play('player_walk_right',true);
        }
        playerMovingStatus.isMoving=true;//put moving status to true to signal to other players
    }
    else if(keys.down.isDown){
        player.body.setVelocityY(1*speed);
        if(playerMovingStatus.facing=='left'){
            player.play('player_walk_left',true);
        }
        else{
            player.play('player_walk_right',true);
        }
        playerMovingStatus.isMoving=true;//put moving status to true to signal to other players
    }
    else{
        playerMovingStatus.isMoving=false;//put moving status false when idle
        if(playerMovingStatus.facing=='left'){
            player.play('player_idle_left',true);
        }
        else{
            player.play('player_idle_right',true);
        }
    }
    //emit current player position to server
    socket.emit('self position',{pos_x,pos_y,room,facing,isMoving});
    //set player position to data on each frame
    setPlayerPosition(player.x,player.y);
}
/*------------------------------------------------------------------------*/