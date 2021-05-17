

function updateEnemyPos(){
    for(var i=0;i<players.length;i++){
        enemies[i].x=players[i].pos_x;
        enemies[i].y=players[i].pos_y;
    }
}