
/*----------importing util instances instance---------------------*/
const maps=require('./maps');


/*----------variables---------------------*/
//current active rooms
const testRoom={roomName:'test',roomStatus:'waiting',playerCount:0,mapNumber:1};
const rooms=[];
rooms.push(testRoom);
//player limit
const playerLimit=8;

/*-------------------Functions------------*/
/*--------------------------------------------------------*/
//create new room
function createRoom(roomName){
    //check if room name already exist
    if(checkRoom(roomName)){
        return false;
    }
    else{
        const mapNumber=maps.createMap();
        const newRoom={roomName:roomName,roomStatus:'waiting',playerCount:1,mapNumber:mapNumber};
        rooms.push(newRoom);
        return true;
    }

}
/*--------------------------------------------------------*/
//get map number from room
function getMap(roomName){
    const index =rooms.findIndex(room=>room.roomName===roomName);
    if(index!==-1){
        return rooms[index].mapNumber;
    }
}
/*--------------------------------------------------------*/
//check  if room exists
function checkRoom(roomName){
    if(rooms.find(room=>room.roomName===roomName)==null){   //room doesnt exist
        return false;
    }
    return true;   //room exists
}
/*--------------------------------------------------------*/
//check roomStatus
function checkRoomStatus(roomName){
    if(rooms.find(room=>room.roomName===roomName).roomStatus=='waiting'){
        return true;
    }
    return false;
}
/*--------------------------------------------------------*/
//update room status
function setRoomStatus(roomName,status){
    const index=rooms.findIndex(room=>room.roomName===roomName);
    if(index!=-1){
        rooms[index].roomStatus=status;
    }
}
/*--------------------------------------------------------*/
//set player count
function setPlayerCount(change,roomName){

    const index =rooms.findIndex(room=>room.roomName===roomName);
    if(index!==-1){
        rooms[index].playerCount+=change;
    }
} 
/*--------------------------------------------------------*/
//check player count
function checkPlayerCount(roomName){
    const index =rooms.findIndex(room=>room.roomName===roomName);
    if(index!==-1){
        return rooms[index].playerCount;
    }
    return playerLimit;
}
/*--------------------------------------------------------*/
//dispose room if admin leaves
function disposeRoom(roomName){
    const index =rooms.findIndex(room=>room.roomName===roomName);
    if(index!==-1){
        return rooms.splice(index,1)[0];//note
    }
}



/*----------------exports----------------------------------*/
module.exports={createRoom,getMap,checkRoomStatus,checkRoom,setRoomStatus,setPlayerCount,checkPlayerCount,disposeRoom};
/*--------------------------------------------------------*/