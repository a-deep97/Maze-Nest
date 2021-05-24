/*-----------info of player added to the room currently-------- */
const players=[];
function initiatePlayers(){ //initiate players var
    for(var i=0;i<playerLimit;i++){
        players.push({id: null,
            username: null,
            status:false,
            admin: null,
            pos_x:0,
            pos_y:0,
            facing:null,
            isMoving:false,
            landingPos_x:0,
            landingPos_y:0
        });
    }
}
/*------------------------------------------------------------- */

/*-----------insert a player to local data--------------------- */
function insertPlayer(username,id,admin,landing_x,landing_y){
    for(var i=0;i<playerLimit;i++){
        if(!players[i].status){   // if player position is vacant
             players[i]={
                 id: id,
                 username: username,
                 status:true,
                 admin: admin,
                 pos_x:0,
                 pos_y:0,
                 facing:'right',
                 isMoving:false,
                 landingPos_x:landing_x,
                 landingPos_y:landing_y,
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
        players[index].pos_x=0;
        players[index].pos_y=0;
        players[index].facing=null,
        players[index].isMoving=false;
        players[index].landingPos_x=0;
        players[index].landingPos_y=0;
        return username;
    }
    return null;
}
/*------------------------------------------------------------- */

/*---set player position with their id(receive from server)-----*/
function setPosition(id,x,y,facing,isMoving){
    const index = players.findIndex(player=>player.id===id);
    if(index!==-1&&players[index].status){
        players[index].pos_x=x;
        players[index].pos_y=y;
        players[index].facing=facing;
        players[index].isMoving=isMoving;
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