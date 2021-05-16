
// this var will be converted to array when rooms will be introduced
const users=[];

function addUser(id,username){
    var admin=false;
    if(users.length==0){
        var admin=true;
        users.push({id,username,admin});
    }
    else{
        users.push({id,username,admin});
    }
}

function removeUser(id){
    const index =users.findIndex(user=>user.id===id);
    
    if(index!==-1){
        return users.splice(index,1)[0];//note
    }
}
function getUsers(){
    return users;
}
function getAdmin(){

    for(var i=0;i<users.length;i++){
        if(users[i].admin==true){
            return users[i].id;
        }
    }
    return null;
}


module.exports={addUser,removeUser,getUsers,getAdmin};