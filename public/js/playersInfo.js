/*-----------info of player added to the room currently-------- */
const players=[];
function initiatePlayers(){ //initiate players var
    for(var i=0;i<playerLimit;i++){
        players.push({id: null,
            username: null,
            status:false,
            admin: null,
            pos_x:1800,
            pos_y:1800});
    }
}
/*------------------------------------------------------------- */

/*-----------insert a player to local data--------------------- */
function insertPlayer(username,id,admin){
    for(var i=0;i<playerLimit;i++){
        if(!players[i].status){   // if player position is vacant
             players[i]={
                 id: id,
                 username: username,
                 status:true,
                 admin: admin,
                 pos_x:1800,
                 pos_y:1800
            };
            playerCount++;
            break;
        }  
    }
}
/*------------------------------------------------------------- */

/*--------------get player info with their id------------------ */
function getPlayer(id){
    return players.find(player=>player.id===id);
}
/*------------------------------------------------------------- */

/*------------remove player info with their id----------------- */
function removePlayer(id){
    const index = players.findIndex(player=>player.id===id);

    if(index!==-1){
        const username=players[index].username;
        players[index].id=null;
        players[index].status=false;
        players[index].username='';
        players[index].pos_x=1800;
        players[index].pos_y=1800;
        return username;
    }
    return null;
}
/*------------------------------------------------------------- */

/*---set player position with their id(receive from server)-----*/
function setPosition(id,x,y){
    const index = players.findIndex(player=>player.id===id);
    if(index!==-1&&players[index].status){
        players[index].pos_x=x;
        players[index].pos_y=y;
    }
}
/*------------------------------------------------------------- */

/*----------get player position with their id-------------------*/
function getPosition(id){
    const index = players.findIndex(player=>player.id===id);
    if(index!==-1&&players[index].status){
        const x=players[index].pos_x;
        const y=players[index].pos_y;
        return {x,y};
    }
    return null;
}
/*------------------------------------------------------------- */