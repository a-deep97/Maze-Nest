
//importing USERS instance
const Users=require('./USERS');

//authenticate the joining player and send applicable result
function authenticateJoin(username,room){
    if(Users.checkUsernameExists(username)){
        return 'username already existing';
    }
    else if(!Users.checkRoom(room)){
        return 'room doesn\'t exist';
    }
    else if(!Users.checkRoomStatus(room)){
        return 'game is running , join later';
    }
    return 'clear';
}


module.exports={authenticateJoin};