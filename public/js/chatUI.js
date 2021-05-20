

/*---------function to add message in chat container-------- */
function insertMessage(username,message){
    const chatContainer=document.getElementById('chat-container');

    const messageContainer=document.createElement('div');
    messageContainer.className='message-container';
    
    const usernameBox=document.createElement('div');
    usernameBox.className='username-box';
    usernameBox.innerHTML=username;
    const messageBox=document.createElement('div');
    messageBox.className='message-box';
    messageBox.innerHTML=message;

    messageContainer.appendChild(usernameBox);
    messageContainer.appendChild(messageBox);

    chatContainer.appendChild(messageContainer);

    //auto scroll chatbox
    chatContainer.scrollTop=chatContainer.scrollHeight;
}
/* -------------------------------------------------------- */

/*---------function to add info box in chat container------ */
function insertInfo(info){
    const chatContainer=document.getElementById('chat-container');

    const messageContainer=document.createElement('div');
    messageContainer.className='message-container';
    
    const infoBox=document.createElement('div');
    infoBox.className='info-box';
    infoBox.innerHTML=info;

    messageContainer.appendChild(infoBox);

    chatContainer.appendChild(messageContainer);

    //auto scroll chatbox
    chatContainer.scrollTop=chatContainer.scrollHeight;
}
/* ---------------------------------------------------------- */
