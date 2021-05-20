
//importing USERS instance
const Users=require('./USERS');

//authenticate the joining player and send applicable result
function authenticateJoin(username,room){
    if(!Users.checkRoom(room)){
        return 'room doesn\'t exist';
    }
    else if(Users.checkPlayerCount(room)>7){
        return 'room full';
    }
    else if(!Users.checkRoomStatus(room)){
        return 'game is running , join later';
    }
    else if(Users.checkUsernameExists(username)){
        return 'username already existing';
    }
    return 'clear';
}


module.exports={authenticateJoin};