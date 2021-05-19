

//update positions of enemy objects
function updateEnemyPos(){
    for(var i=0;i<players.length;i++){
        enemies[i].x=players[i].pos_x;
        enemies[i].y=players[i].pos_y;
    }
}
//update visibility of enemy objects
function updateVisibility(){
    for(var i=0;i<players.length;i++){
        enemies[i].visible=players[i].status;
    }
}   