/*----------importing util libs ---------------------*/
const maps=require('./maps');

/*------------------variables---------------------*/ 
//store current joined players
const users=[];




/*--------------------------------------------------------*/
//check if username already existing
function checkUsernameExists(username){
    if(users.filter(user=>user.username===username).length>0){
        return true;
    }
    return false;
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


/*-----------------exports---------------------------*/
module.exports={checkUsernameExists,addUser,removeUser,getUsers,getUser,getAdmin};
/*--------------------------------------------------------*/
