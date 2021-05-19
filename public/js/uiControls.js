
/*---------------Start game button------------------------*/
//start game
const startButton= document.getElementById('start-button');
startButton.addEventListener('click',()=>{
    if(gameStatus=='ready'&&isPlayerAdmin){
        startGame();
        //send signal to server for game start
        socket.emit('send game start');
    }
});
/*-------------------------------------------------*/

/*-------------restart game button------------------------*/
const restartButton= document.getElementById('restart-button');
restartButton.addEventListener('click',()=>{
    if((gameStatus=='won'||gameStatus=='running')&&isPlayerAdmin){
        //emit about the restart event
        socket.emit('send game restart');
        gameRestart();
    }
});
/*-------------------------------------------------*/

/*-------------leave button------------------------*/
const leaveButton= document.getElementById('leave-button');
leaveButton.addEventListener('click',()=>{
    
});
/*-------------------------------------------------*/ 

/*---------message send button---------------------*/
const chatForm=document.getElementById('chat-form');
    chatForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message=e.target.message.value.trim();
        
        insertMessage('You',message);        
        //send message to server
        const username=playerUsername;
        socket.emit('send message',{username,room,message});
        // Clear message input
        e.target.elements.message.value = '';
});
/*-------------------------------------------------*/