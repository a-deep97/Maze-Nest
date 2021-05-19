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

//createing new game instance
const Game=new Phaser.Game(config);

/*------global  variables----------*/
let player;
let enemies=[];
let speed=300;
let gameStatus='ready';
let winner='none';
/*------on load functions----------*/
//update gamestatus info panel
gameStatusInfo();
/*------------------------------------*/

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
        enemy.visible=false;
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