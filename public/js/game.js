/*---------------game configuration json-----------------*/
const config={
    type: Phaser.AUTO,
    parent:'gameWindow',
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
/*-------------------------------------------------------------*/

/*----------creating new game instance-------------------------*/
const Game=new Phaser.Game(config);

/*----------------global  variables----------------------------*/
let player;
let enemies=[];
let enemyNames=[];
let background;
let speed=300;
let gameStatus='ready';
let winner='none';
const playerLimit=7;//1 being self
let playerCount=1;
let winningCoordinates={left_x:0,right_x:4200,up_y:0,down_y:4200};
initiatePlayers();//inititate playes variable for vacancy of players limit
/*--------------------------------------------------------------*/

/*------------preload function----------------------------------*/
function preload(){

    this.load.image('Wall','./media/walls/wall1.jpg');
    //player image
    this.load.image('player','./media/players/player1/right.png');
    //enemy image
    this.load.image('enemy','./media/players/enemy1/right.png');
    
    //map files
    this.load.tilemapTiledJSON('map','./Tilemap.json');
    //ground files
    this.load.image('Background','./media/grounds/ground1.png');
    this.load.tilemapTiledJSON('ground','./groundTilemap.json');
}
/*--------------------------------------------------------------*/

/*------------create function----------------------------------*/
function create(){

    //adding background
    const ground=this.make.tilemap({key:'ground'});
    const groundTileset=ground.addTilesetImage('darkGround','Background');
    const backGround=ground.createStaticLayer('Tile Layer 1',groundTileset,0,0);

    //create player
    player=this.physics.add.sprite(1800,1800,'player');
    player.scaleX=0.5;
    player.scaleY=0.5;
    //create blank enemy players 
    for(var i=0;i<playerLimit;i++){
        let enemy=this.physics.add.sprite(1800,1800,'enemy');
        enemy.visible=false;
        enemy.scaleX=0.5;
        enemy.scaleY=0.5;
        enemies.push(enemy);
    }
    //create blank enemy name texts 
    for(var i=0;i<playerLimit;i++){
        let enemyName=this.add.text(1800,1750, 'helreoher', { fontFamily: "Courier",fill:"#c5c6c7",fontSize:20 });
        enemyName.visible=false;
        enemyNames.push(enemyName);
    }
    //camera setup
    let camera = this.cameras.main;
    camera.startFollow(player);

    //create map
    const map=this.make.tilemap({key:'map'});
    const tileset=map.addTilesetImage('brick','Wall');
    const maze=map.createStaticLayer('Tile Layer 1',tileset,0,0);
    maze.setCollisionByExclusion(-1,true);
    //colliders
    this.physics.add.collider(player,maze);
    //key press event
    keys=this.input.keyboard.createCursorKeys();
}
/*--------------------------------------------------------------*/

/*------------update function----------------------------------*/
function update(){
    
    //update player position in data
    setPlayerPosition(player.x,player.y);
    //update enemny positions on game
    updateEnemyPos();
    //update enemies visibility
    updateVisibility();
    // game running loop
    if(gameStatus=='running'){
        //control player movement
        controlPlayer();
        //check ig game won
        isWon();
    }
}
/*--------------------------------------------------------------*/