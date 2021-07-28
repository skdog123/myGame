var PLAY = 1;
var END = 0;
var gameState = PLAY;
var var1, var2
var tcode1,code1,error1;
var player, player_running, player_collided;
var ground, invisibleGround, groundImage;
var t123,m
var obstaclesGroup, error1, code, tcode, codeG, tcodeG;

var score;


function preload(){
    groundImage = loadImage("bg.png");
  
  player_running = loadAnimation("image_1.png","image_2.png","image_3.png","image_4.png","image_5.png");
  player_collided = loadAnimation("image_crash.png");
  m=loadSound("m.mp3")
 t123= loadSound("123.wav") 
  error = loadImage("Error.png");
  code = loadImage("code.png");
  tcode = loadImage("t_code.png");
  var2 = loadImage("gameover.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);
   ground = createSprite(width/2,height/2,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=2.3
  ground.width=
  ground.x = width/2;
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("collided" , player_collided)
  player.scale = 1;
  
 
  var1 = createSprite(width/2,height/2);
  var1.addImage(var2);
  var1.visible=0
  var1.scale=0.7
  invisibleGround = createSprite(200,height/2,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  codeG=createGroup()
  tcodeG=createGroup()
 m.loop()
  
  player.setCollider("circle",0,0,40);

  score = 0
}

function draw() {
  background("green");
 
  
  
  
  if(gameState === PLAY){
  
    ground.velocityX = -4;
   
   
    
    if (ground.x < width/4){
      ground.x = width/2;
    }
    
    
    if(touches.length>0||keyDown("space")&& player.y >=230) {
        player.velocityY = -13;
    }
    
    
    player.velocityY = player.velocityY + 0.8
  
  
  
   
    createerror();
    if(tcodeG.isTouching(player)){
        score=score+5
        tcodeG.destroyEach()
    }
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
        t123.play()
        if(m.isPlaying())
        m.stop()
    }
    if(codeG.isTouching(player)){
     score=score+10
     codeG.destroyEach()
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     player.velocityY=0;
    var1.visible=1
    tcodeG.setVelocityXEach(0) 
    codeG.setVelocityXEach(0)
     obstaclesGroup.setVelocityXEach(0);
     player.changeAnimation("collided" , player_collided)
     
   }
  
 
  player.collide(invisibleGround);
  
  createtcode()
  createcode()

  drawSprites();
  
  fill(255)
  if(score>300){
    fill(227,197,74)  
  }
  textSize(20)
  text("Score: "+ score, width-120,50);
}

function createtcode() {
    if (World.frameCount % 133 == 0) {
    var tcode1 = createSprite(width+30, height/2-20);
    tcode1.addImage(tcode);
    tcode1.scale=0.5;
    tcode1.velocityX = -(6.5+score/20);
    tcode1.lifetime = 320;
    tcodeG.add(tcode1);
  }
  }
  
  function createcode() {
    if (World.frameCount % 243 == 0) {
    var code1 = createSprite(width+50, 170);
    code1.addImage(code);
    code1.scale=0.5;
    code1.velocityX = -(6.7+score/20);
    code1.lifetime = 321;
    codeG.add(code1);
    }
  }
  
  function createerror(){
    if (World.frameCount % 367 == 0) {
    var error1 = createSprite(width+30, height/2-20);
    error1.addImage(error);
    error1.scale=0.5;
    error1.velocityX = -(7.3+score/20);
    error1.lifetime = 320;
    obstaclesGroup.add(error1);
    }
}
