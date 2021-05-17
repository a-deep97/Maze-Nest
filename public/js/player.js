
let playerPosition={};
let isPlayerAdmin=false;
let playerUsername;
function setPlayerPosition(x,y){
    playerPosition={x,y};
    //emit current player position to server
    socket.emit('self position',{x,y});
}
function getPlayerPosition(){
    return playerPosition;   
}
//make current admin if applicable(first player or no other player)
function makeAdmin(){
    if(players.length==0){
        isPlayerAdmin=true;
    }
}
//function to control player
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