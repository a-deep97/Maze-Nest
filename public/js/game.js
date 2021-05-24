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
let landingPosition={x:7600,y:7600};
let landingLimitCoordinates={left:7500,right:7800,up:7500,down:7800};
let winningCoordinates={left_x:0,right_x:16200,up_y:0,down_y:16200};
initiatePlayers();//inititate playes variable for vacancy of players limit
setLandingPosition();//set random  landing position

/*--------------------------------------------------------------*/

/*------------preload function----------------------------------*/
function preload(){

    //player image
    this.load.atlas('player','././media/players/player1/playerSprite.png','././media/players/player1/playerAtlas.json');
    
    //enemy image
    this.load.image('enemy','./media/players/enemy1/right.png');
    
    //map files
    this.load.tilemapTiledJSON('map1a','./map1a.json');
    this.load.image('wall','./media/walls/wall1.jpg');
    
    //ground files
    this.load.image('ground','./media/grounds/ground1.png');
    this.load.tilemapTiledJSON('ground','./ground1.json');
}
/*--------------------------------------------------------------*/

/*------------create function----------------------------------*/
function create(){

    //adding background
    const ground=this.make.tilemap({key:'ground'});
    const groundTileset=ground.addTilesetImage('groundTile','ground');
    const backGround=ground.createStaticLayer('Tile Layer 1',groundTileset,-1000,-1000);

    //create player
    player=this.physics.add.sprite(landingPosition.x,landingPosition.y,'player');
    player.scaleX=0.5;
    player.scaleY=0.5;
    //player anims
    this.anims.create({
        key:'walk_right',
        frames: this.anims.generateFrameNames('player',{prefix:'frame',start:0,end:1}),
        frameRate: 10,
    });
    this.anims.create({
        key:'walk_left',
        frames: this.anims.generateFrameNames('player',{prefix:'frame',start:2,end:3}),
        frameRate: 10,
    });
    this.anims.create({
        key:'idle_right',
        frames: [{key:'player',frame:'frame0'}],
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key:'idle_left',
        frames: [{key:'player',frame:'frame2'}],
        frameRate: 4,
        repeat: -1
    });
    //create blank enemy players 
    for(var i=0;i<playerLimit;i++){
        let enemy=this.physics.add.sprite(landingPosition.x,landingPosition.y,'enemy');
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
    const map=this.make.tilemap({key:'map1a'});
    const tileset=map.addTilesetImage('brickTile','wall');
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