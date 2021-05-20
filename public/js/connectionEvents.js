const socket=io();

/*----------------------------------------------------*/
// event fired and signal sent to srver as player joins
socket.emit('on join',{playerUsername,room});

/*----------------------------------------------------*/
//receive info regarding room after joining
socket.on('new join info',(USERS)=>{
    playerID=socket.id;
    //inser the info of you joined into panel
    insertInfo('You joined');
    //add previous users to database
    for(var i=0;i<USERS.length;i++){
        if(USERS.id!=playerID){ //checking for not inclusing self in the database
            //insert existinf player info to local data
            insertPlayer(USERS[i].username,USERS[i].id,USERS[i].admin);
            //all current players added to online panel
            addOnlinePlayer(USERS[i].username,USERS[i].admin);
        }
    }
    //make player admin if applicable 
    if(USERS.length==0){    //this is first player
        isPlayerAdmin=true;
    }
    //update game status info on panel
    gameStatusInfo();
});

/*----------------------------------------------------*/
//adding players to data as they join
socket.on('player added',({username,ID})=>{
    //insert new player connected to local data
    insertPlayer(username,ID,false);
    //newplayer added to online panel
    addOnlinePlayer(username);
    //insert info in panel
    insertInfo(username+' joined');
});

/*----------------------------------------------------*/
//check for any disconnection
socket.on('user disconnected',({ID})=>{
    const username=removePlayer(ID);
    playerCount--;
    //update online panel
    updateOnlinePanel();
    //insert info in panel
    insertInfo(username+' left');
});
/*----------------------------------------------------*/
//listen to server if admin left. all players will be redirected to home
socket.on('admin left',({error})=>{
    window.location='/?loginresult='+error;
});