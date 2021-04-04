var bgimg,backgr;
var player, player_running;
var bananaimg,rockimg;
var ground;
var score=0;

var END=0;
var PLAY=1;
var gameState = PLAY;
var foodg
var obstacleg

function preload(){
  bgimg=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg = loadImage("banana.png");
  rockimg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(bgimg);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodg = new Group();
  obstacleg = new Group();
}

function draw() { 
  background(0);
  drawSprites();

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    

    
    spawnfood();
    spawnobstacles();
    if(player.isTouching(foodg)){
      foodg.destroyEach();
      score = score+2;
      player.scale+= +0.1;
    }

    if(player.isTouching(obstacleg)){
      gameState=END;
    }
  } else if(gameState===END){
            backgr.velocityX=0;
            player.visible=false;

            foodg.destroyEach();
            obstacleg.destroyEach();

            textSize(30);
            fill("white");
            text("Game Over!",width/2-70,200);
          } 
  textSize(30);
  fill("white");
  text("Score: "+ score,20,30);
}
  

function spawnfood(){
  if(frameCount%160===0){
    var banana = createSprite(600,150,40,10);
    banana.addImage(bananaimg)
    banana.y=random(120,200);
    banana.scale=0.05;
    banana.lifetime=300;
    banana.velocityX=-4;
    player.depth = banana.depth+1;
    foodg.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount%200===0){
    var rock = createSprite(600,300,10,40);
    rock.addImage(rockimg);
    rock.velocityX=-4;
    rock.scale=0.3;
    obstacleg.add(rock);
  }
}
