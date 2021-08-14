var x;
var level = 1;
var backGround;
var level1Img, level2Img;
var inxGround;
var player;
var playerImg, knifePlayerImg;
var obstaclesGroup, enemy1Img;
var knifeImg, knifeGroup;
var life, lifeCount, lifeImg1, lifeImg2, lifeImg3;
var sword;
var swordCount = 0;
var jumpSound, coinSound, gameoverSound, losinglifeSound, goodResultSound;
var gameState = 1;
var gameOverImg;
var crown, crownImg;

function preload() {
  level1Img = loadImage("backgroundImg2.jpg");
  level2Img = loadImage("backgroundImg9.jpg");
  playerImg = loadAnimation("player_run1.png", "player_run2.png", "player_run3.png",
  "player_run4.png", "player_run5.png", "player_run6.png");
  knifeImg = loadImage("sword.png");
  enemy1Img = loadAnimation("enemy1.png", "enemy2.png", "enemy3.png");
  knifePlayerImg = loadAnimation("knifeplayer1.png", "knifeplayer2.png",
  "knifeplayer3.png", "knifeplayer4.png");
  lifeImg1 = loadImage("heart.png");
  lifeImg2 = loadImage("heart2.png");
  lifeImg3 = loadImage("heart3.png");
  crownImg = loadImage("crown.png");
  
  jumpSound = loadSound("jumpSound.mp3");
  coinSound = loadSound("coinsSound.mp3");
  gameoverSound = loadSound("gameOverSound.mp3");
  losinglifeSound = loadSound("losingLifeSound.mp3");
  goodResultSound = loadSound("goodResultSound.wav")
  

  gameOverImg = loadImage("gameover.jpg");

}



function setup() {
  createCanvas(windowWidth, windowHeight)
  
  x = createSprite(100,100,10,10)
  backGround = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  backGround.x = windowWidth/2;

  inxGround = createSprite(windowWidth/2, windowHeight-10, width, 10);

  player = createSprite(100, windowHeight-50, 10,10);
  player.addAnimation("running", playerImg);
  player.addAnimation("playerWithKnife", knifePlayerImg);
  player.scale = 1.5;

  life = createSprite(windowWidth-170, 70, 25,25);
  lifeCount = 3;
  life.scale = 0.3;
  crown = createSprite(displayWidth/2+770, displayHeight/2, 25,25);
  crown.scale = 0.5;
  crown.addImage(crownImg);
  crown.visible = false;


  obstaclesGroup = new Group();
  knifeGroup = new Group();
}


function draw() {
  background("black");

  if(gameState === 1) {
  console.log(player.y)
  if(lifeCount === 3) {
    life.addImage(lifeImg3);
  }

  if(lifeCount === 2) {
    life.addImage(lifeImg2);
  }

  if(lifeCount === 1) {
    life.addImage(lifeImg1);
  }

  //level = 1;

  if(level === 1) {
      backGround.addImage(level1Img);
      backGround.scale = 2.8;
      backGround.velocityX = -5;
  }

  else if(level === 2) {
      backGround.addImage(level2Img);
      backGround.scale = 0.7;
      backGround.velocityX = -8;
      
  }

  //backGround.velocityX = -5;
  if(backGround.x<100) {
    backGround.x = windowWidth/2;
  }

  if(touches.length>0 || keyDown("up") && player.y>windowHeight-200) {
    player.velocityY = -17;
    jumpSound.play();
    touches = [];
    //console.log("HELLO");
  }

  if(knifeGroup.isTouching(player)) {
    knifeGroup.setLifetimeEach(0);
    player.changeAnimation("playerWithKnife", knifePlayerImg);
    swordCount = swordCount+3; 
  }

  if(lifeCount > 0 && obstaclesGroup.isTouching(player)) {
    lifeCount--;
    obstaclesGroup.destroyEach();
    swordCount = swordCount-5;
    losinglifeSound.play();
  }

  if(swordCount >= 20 && lifeCount > 0) {
    level = 2;
  }

  if(lifeCount === 0) {
    gameoverSound.play();
    gameState = 0;
  }

  if(swordCount >= 50) {
    crown.velocityX = -10;
    crown.visible = true;
  }

  if(player.isTouching(crown)) {
    goodResultSound.play();
    swordCount = swordCount+10;
    gameState = 0;
  }

  player.velocityY = player.velocityY + 0.5;

  player.collide(inxGround);
  inxGround.visible = false;

  //for (var i = 0; i < obstacleGroup.length; i++) { if (obstacleGroup.get(i).isTouching(knife)) { obstacleGroup.get(i).destroy(); player.score =player.score+1; } }

  spawnObstacles();
  spawnKnifes();
  drawSprites();

}

 if(gameState === 0) {
  background(gameOverImg);
  textSize(50);
  fill("white");
  //text("Game Over", displayWidth/2-100, displayHeight/2-30);

  textSize(50);
  fill("white");
  text("Well Played Boss!", windowWidth/2-180, windowHeight/2+180);
}
  textSize(40);
  fill("aqua");
  stroke("black");
  textFont("times new roman");
  text("Score: " + swordCount, displayWidth-1850, 70);

  /*gamestate if(swordCount<0 lifeCount === 0) {

}*/
}

function spawnObstacles() {
  if(frameCount%170 === 0) {
    var obstacle = createSprite(windowWidth-20, inxGround.y-50, 20,20);
    //obstacle.shapeColor = "red";
    obstacle.addAnimation("running", enemy1Img);
    //obstacle.debug = true;
    obstacle.scale = 0.8;
    obstacle.velocityX = -7;

    obstaclesGroup.add(obstacle);

  }


}

function spawnKnifes() {
  if(frameCount%100 === 0) {
    var knife = createSprite(windowWidth-20, random(580,750), 20,20);
    knife.addImage(knifeImg);
    knife.scale = 0.2;
    knife.velocityX = -7;
    knife.lifetime = windowWidth/7;
    //knife.debug = true;
    knife.setCollider("rectangle", 0, 0, 20, 150, 43);


    knifeGroup.add(knife);

  }


}