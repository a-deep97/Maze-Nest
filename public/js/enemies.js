

//update positions of enemy objects
function updateEnemyPos(){
    for(var i=0;i<playerLimit;i++){
        //set enemy sprite positions 
        enemies[i].x=players[i].pos_x;
        enemies[i].y=players[i].pos_y;
        //set enemy name positions 
        enemyNames[i].x=players[i].pos_x-10;
        enemyNames[i].y=players[i].pos_y-60;
    }
}
//update visibility of enemy objects
function updateVisibility(){
    for(var i=0;i<playerLimit;i++){
        //update enemy sprite visibility
        enemies[i].visible=players[i].status;
        //update enemy name visibility
        enemyNames[i].visible=players[i].status;
        //update enemy name
        if(enemyNames[i].visible){
            enemyNames[i].setText(players[i].username);
        } 
    }
}   