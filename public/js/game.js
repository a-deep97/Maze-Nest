const config={
    type: Phaser.AUTO,
    parent:'game',
    scale:{
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:{
        preload,
        create,
        update
    },
    physics:{
        default: 'arcade',
        arcade:{
            gravity:100
        }
    }
};
//initiating socket instance
const socket=io();
//createing new game instance
const Game=new Phaser.Game(config);

//variables
let player;
let enemies=[];
let speed=300;
let gameStatus='ready';
//preload function
function preload(){

    this.load.image('brick1','./media/brick1.jpg');
    this.load.image('Player','./media/player.png');
    this.load.tilemapTiledJSON('map','./Tilemap.json');
}
//create function
function create(){
    //general

    //create player
    player=this.physics.add.sprite(1800,1800,'Player');
    player.scaleX=0.3;
    player.scaleY=0.3;
    //create blank enemy players 
    for(var i=0;i<5;i++){
        let enemy=this.physics.add.sprite(1800,1800,'Player');
        enemy.scaleX=0.3;
        enemy.scaleY=0.3;
        enemies.push(enemy);
    }
    //camera setup
    let camera = this.cameras.main;
    camera.startFollow(player);

    //create map
    const map=this.make.tilemap({key:'map'});
    const tileset=map.addTilesetImage('brick','brick1');
    const maze=map.createStaticLayer('Tile Layer 1',tileset,0,0);
    maze.setCollisionByExclusion(-1,true);
    maze.scaleX=4;
    maze.scaleY=4;

    //colliders
    this.physics.add.collider(player,maze);

    //key press event
    keys=this.input.keyboard.createCursorKeys();
}
//update function
function update(){
    console.log(gameStatus);
    player.body.setVelocityY(0);
    player.body.setVelocityX(0);
    if(gameStatus=='ready'&&keys.space.isDown){
        startGame();
        //send signal to server for game start
        socket.emit('send game start');
    }
    else if(gameStatus=='running'&&keys.shift.isDown){
        //emit about the restart event
        socket.emit('send game restart');
        gameRestart();
    }
    if(gameStatus=='running'){
        if(keys.left.isDown){
            player.body.setVelocityX(-1*speed);
        }
        else if(keys.right.isDown){
            player.body.setVelocityX(1*speed);
        }
        else if(keys.up.isDown){
            player.body.setVelocityY(-1*speed);
        }
        else if(keys.down.isDown){
            player.body.setVelocityY(1*speed);
        }
        //set player position on each frame
        setPlayerPosition(player.x,player.y);
        //send player position to server
        const pos_x=player.x;
        const pos_y=player.y;
        socket.emit('self position',{pos_x,pos_y});
        //update enemny positions on game
        for(var i=0;i<players.length;i++){
            enemies[i].x=players[i].pos_x;
            enemies[i].y=players[i].pos_y;
        }
    }
}

// start game
function startGame(){
    gameStatus='running';
}
//check if won
function isWon(){
    if(player.x<player.width/2||player.x>4000+player.width/2||player.y<player.height/2||player.x>+3864+player.height/2){
        gameStatus='won';
        //send signal to server for winning
        socket.emit('send game won');
    }
}
//check game over
function isGameOver(){

}
//restart game
function gameRestart(){
    gameStatus='ready';
    reset();
}
//reset game
function reset(){

    setPlayerPosition(1800,1800);
    player.x=1800;
    player.y=1800;
    for(var i=0;i<players.length;i++){
        players[i].pos_x=1800;
        players[i].pos_y=1800;
        enemies[i].x=1800;
        enemies[i].y=1800;
    }
}

//function make admin if applicable
function makeAdmin(){
    if(players.length==0){
        isPlayerAdmin=true;
    }
}

// listen for game start
socket.on('receive game start',()=>{
    gameStatus='running';
});
//listen to game won
socket.on('receive game won',(id)=>{
    gameStatus='won';
    const winner=getPlayer(id).username;
    console.log(winner+' won');
});
//listen for game restart
socket.on('receive game restart',()=>{
    gameStatus='ready';
    gameRestart();
});


// on join event
const username='user';
socket.emit('on join',{username});
//get before join info
socket.on('new join info',(USERS)=>{
    //add previous users to database
    for(var i=0;i<USERS.length;i++){
        insertPlayer(USERS[i].username,USERS[i].id);
    }
});
//adding players to data
socket.on('player added',({username,ID})=>{
    insertPlayer(username,ID);
});
//get other  player's positions
socket.on('get position',({ID,pos_x,pos_y})=>{
    setPosition(ID,pos_x,pos_y);
});