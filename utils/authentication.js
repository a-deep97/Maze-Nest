
/*----------importing util libs---------------------*/
const Users=require('./users');
const Rooms=require('./rooms');

//authenticate the joining player and send applicable result
function authenticateJoin(username,room){
    if(!Rooms.checkRoom(room)){
        return 'room doesn\'t exist';
    }
    else if(Rooms.checkPlayerCount(room)>7){
        return 'room full';
    }
    else if(!Rooms.checkRoomStatus(room)){
        return 'game is running , join later';
    }
    else if(Users.checkUsernameExists(username)){
        return 'username already existing';
    }
    return 'clear';
}


module.exports={authenticateJoin};