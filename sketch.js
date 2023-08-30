var bg, bgimg
var player, shooterimg, shootingimg
var zombie, zombieimg, zombieGroup;
var bullet, bulletGroup;
var heart1, heart1img, heart2, heart2img, heart3, heart3img;
var gameState = "fight";
var bullets = 70;
var score;

function preload (){
  bgimg = loadImage("assets/bg.jpeg")
  shooterimg = loadImage("assets/shooter_2.png");
  shootingimg = loadImage("assets/shooter_3.png");
  zombieimg = loadImage("assets/zombie.png");
  heart1img = loadImage("assets/heart_1.png");
  heart2img = loadImage("assets/heart_2.png");
  heart3img = loadImage("assets/heart_3.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  //adding background
  bg = createSprite(windowWidth/2, windowHeight/2);
  bg.addImage(bgimg);
  bg.scale = 1.1

  //creating the shooter
  player=createSprite(200,450,50,50);
  player.addImage("shooter", shooterimg);
  player.addImage("shooting", shootingimg);
  player.scale = 0.35

  //adding the life images
  heart1 = createSprite(150,50,30,30);
  heart1.addImage(heart1img);
  heart1.scale = 0.4
  heart1.visible=false

  heart2 = createSprite(150,50,30,30);
  heart2.addImage(heart2img);
  heart2.scale = 0.4
  heart2.visible=false

  heart3 = createSprite(150,50,30,30);
  heart3.addImage(heart3img);
  heart3.scale = 0.4

  zombieGroup=new Group();
  bulletGroup = new Group();
}

function draw(){
  background("black");

  if(gameState=="fight"){
        //to move the player
      if(keyIsDown(UP_ARROW) && player.y>80){
        player.y -=5;
      }

      if(keyIsDown(DOWN_ARROW) && player.y<500){
        player.y +=5;
      }

      if(keyIsDown(RIGHT_ARROW)){
        player.x +=5;
      }

      if(keyIsDown(LEFT_ARROW)){
        player.x -=5;
      }
          //shooting animation
      if(keyWentDown("space")){
        player.changeImage("shooting");
        bullet = createSprite(player.x+40, player.y-30, 10,5)
        bullet.velocityX = 2
        bulletGroup.add(bullet);
        bullets -=1
      }

      else if(keyWentUp("space")){
        player.changeImage("shooter");
        
      }
      //go to gamState bullet when player runs out of bullets
      if(bullets==0){
        gameState = "bullet";
        }
      
        if(score == 50){
          gameState = "won";
        }

          enemy();

          //destroy zombie when player touches it 
          for(i=0; i<zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(player)){
              zombieGroup[i].destroy();
              gameState = "lost"
            }
          }
          
          //destroy the zombie when bullet touches it 
          for(i=0; i<zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(bulletGroup)){
              zombieGroup[i].destroy();
              bulletGroup.destroyEach();
              score +=1
            }
          }
  }

  drawSprites();

    //destroy zombie, bullet and player and display the lost message
    if(gameState == "lost"){
      fill("white");
      textSize(100);
      text("You Lost!", 400, 400);
      zombieGroup.destroyEach();
      bulletGroup.destroyEach();
      player.destroy();
    }

    //destroy player, zombie and bullets and display the won message
    else if(gameState=="won"){
      fill("green");
      textSize(100);
      text("You Won!!!", 400,400);
      zombieGroup.destroyEach();
      bulletGroup.destroyEach();
      player.destroy();
    }

    else if (gameState =="bullets"){
      fill("white");
      textSize(100);
      text("You ran out of bullets!", 400,400);
      zombieGroup.destroyEach();
      bulletGroup.destroyEach();
      player.destroy();
    }
}

function enemy(){
if(frameCount%70==0){
  //craeting zombie
  zombie = createSprite (random(750,1200),random(200,450),20,20);
  zombie.addImage(zombieimg);
  zombie.scale = 0.2
  zombie.velocityX=-2
  zombie.lifetime=600;
  zombieGroup.add(zombie);
}
}