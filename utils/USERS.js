/*----------importing util instances instance---------------------*/
const maps=require('./maps');

/*--------------------------------------------------------*/ 
//variable to store current joined players
const users=[];
//current active rooms
const testRoom={roomName:'test',roomStatus:'waiting',playerCount:0,mapNumber:1};
const rooms=[];
rooms.push(testRoom);
//limit
const playerLimit=8;
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
//check if username already existing
function checkUsernameExists(username){
    if(users.filter(user=>user.username===username).length>0){
        return true;
    }
    return false;
}
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
//set player cout
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
/*--------------------------------------------------------*/
// add player to users data
function addUser(id,username,room,landing_x,landing_y){
    var admin=false;
    if(users.length==0){
        var admin=true;
        users.push({id,username,admin,room,landing_x,landing_y});
    }
    else{
        users.push({id,username,admin,room,landing_x,landing_y});
    }
}
/*--------------------------------------------------------*/
//remove player from user data
function removeUser(id){
    const index =users.findIndex(user=>user.id===id);
    
    if(index!==-1){
        return users.splice(index,1)[0];//note
    }
}
/*--------------------------------------------------------*/
//get all users from each room
function getUsers(room){
    return users.filter(user=>user.room==room);
}
/*--------------------------------------------------------*/
//get required user
function getUser(id){
    return users.find(user=>user.id===id);
}
/*--------------------------------------------------------*/
//get admin of each room
function getAdmin(){

    for(var i=0;i<users.length;i++){
        if(users[i].admin==true){
            return users[i].id;
        }
    }
    return null;
}
/*--------------------------------------------------------*/
module.exports={createRoom,getMap,checkRoomStatus,checkRoom,setRoomStatus,checkUsernameExists,createRoom,setPlayerCount,checkPlayerCount,disposeRoom,addUser,removeUser,getUsers,getUser,getAdmin};
/*--------------------------------------------------------*/