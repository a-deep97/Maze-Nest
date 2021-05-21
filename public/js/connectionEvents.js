const socket=io();

/*----------------------------------------------------*/
// event fired and signal sent to srver as player joins
const landing_x=landingPosition.x;
const landing_y=landingPosition.y;
socket.emit('on join',{playerUsername,room,landing_x,landing_y});

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
            // set positions
            setPosition(USERS[i].id,USERS[i].landing_x,USERS[i].landing_y);
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
socket.on('player added',({username,ID,landing_x,landing_y})=>{
    //insert new player connected to local data
    insertPlayer(username,ID,false);
    //newplayer added to online panel
    addOnlinePlayer(username);
    //set position
    setPosition(ID,landing_x,landing_y);
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