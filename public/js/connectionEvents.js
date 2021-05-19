/*----------------------------------------------------*/
// event fired and signal sent to srver as player joins
socket.emit('on join',{playerUsername,room});
/*----------------------------------------------------*/
//receive info regarding room after joining
socket.on('new join info',(USERS)=>{
    playerID=socket.id;
    //add previous users to database
    for(var i=0;i<USERS.length;i++){
        if(USERS.id!=playerID){ //checking for not inclusing self in the database
            //insert existinf player info to local data
            insertPlayer(USERS[i].username,USERS[i].id);
            //all current players added to online panel
            addOnlinePlayer(USERS[i].username);
        }
    }
    //make player admin if applicable 
    makeAdmin();
});
/*----------------------------------------------------*/
//adding players to data as they join
socket.on('player added',({playerUsername,ID})=>{
    //insert new player connected to local data
    insertPlayer(playerUsername,ID);
    //newplayer added to online panel
    addOnlinePlayer(playerUsername);
});
/*----------------------------------------------------*/