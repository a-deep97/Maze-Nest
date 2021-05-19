const players=[];

function insertPlayer(username,id){
    players.push({
        id: id,
        username: username,
        status:true,
        pos_x:1800,
        pos_y:1800
    });
}
function getPlayer(id){
    return players.find(player=>player.id===id);
}
function removePlayer(id){
    const index = players.findIndex(player=>player.id===id);

    if(index!==-1){
        players[index].id=null;
        players[index].status=false;
        players[index].username='';
        players[index].pos_x=1800;
        players[index].pos_y=1800;
    }
}
function setPosition(id,x,y){
    const index = players.findIndex(player=>player.id===id);
    if(index!==-1&&players[index].status){
        players[index].pos_x=x;
        players[index].pos_y=y;
    }
}
function getPosition(id){
    const index = players.findIndex(player=>player.id===id);
    if(index!==-1&&players[index].status){
        const x=players[index].pos_x;
        const y=players[index].pos_y;
        return {x,y};
    }
    return null;
}