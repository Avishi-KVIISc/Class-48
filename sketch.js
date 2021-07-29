var karanStanding, karanRunning, karan; 
var bgImg, box, boxImg, door, doorImg;
var treasure1, treasure2, treasure3, treasureImg;
var kumbh, kumbhWalking, kumbhPushing;
var ground1, ground2, ground3, ground4, ground5, groundGroup;
var gameState = "start";
var backgroundVar;

function preload(){
  karanStanding = loadAnimation("KaranStanding1.png");
  kumbhWalking = loadAnimation("Kumbh3.png");
  storyImg = loadImage("Story.png");
  bgImg = loadImage("backgroundImg.jpg");
  boxImg = loadImage("box.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  form = new Form();

  groundGroup = new Group();

  ground1 = new Ground(250, 700, 250, 60);
  ground2 = new Ground(700, 650, 250, 60);
  ground3 = new Ground(1170, 500, 250, 60);
  ground4 = new Ground(windowWidth/2 - 550, windowHeight/2 - 200, 250, 60);
  ground5 = new Ground(windowWidth/2 - 100, windowHeight/2 - 200, 250, 60);

  karan = createSprite(100, 620);
  karan.addAnimation("standing", karanStanding);

  kumbh = createSprite(windowWidth/2 - 100, windowHeight/2 - 300);
  kumbh.addAnimation("standing", kumbhWalking);

  box = createSprite(windowWidth/2 , windowHeight/2 - 280)
  box.addImage(boxImg);
  box.scale = 0.9;

  backgroundVar = createSprite(windowWidth/2, windowHeight/2);

  treasure1 = createSprite(windowWidth/2 - 100, windowHeight - 300, 30, 30);
  treasure2 = createSprite(windowWidth/2 + 300, windowHeight/2 - 100, 30, 30);
  treasure3 = createSprite(windowWidth/2 - 350, windowHeight/2 - 300, 30, 30);
}

function draw() {

  if(gameState === "start"){
    form.display();
  } 
  else if (gameState === "story"){
    //image(this.storyImg, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    //background(form.storyImg);
    backgroundVar.addImage(storyImg);
    backgroundVar.scale = 3;
    setTimeout(function(){gameState = "play";}, 2000);
    drawSprites();
  }

  else if (gameState === "play"){
    backgroundVar.destroy();
    imageMode(CORNERS);
  background(bgImg);
  //backgroundVar.addImage(bgImg);

  if(keyDown(RIGHT_ARROW)){
    karan.x += 5
  }
  //console.log(ground1.y + " " + karan.y);
  if(keyDown("up")){
    karan.velocityY = -10;
  }

  if(keyDown("left")){
    karan.x -= 5;
  }

  if(keyDown("d")){
    kumbh.x += 5;
  }

  if(keyDown("a")){
    kumbh.x -= 5;
  }

  if(kumbh.isTouching(box)){
    box.x = box.x + 5;
  }

  if(karan.y > windowHeight || kumbh.y > windowHeight){
    swal("Game Over");
  }

  if(karan.isTouching(box)){
    karan.collide(box);
  }

  if(kumbh.isTouching(box)){
    kumbh.collide(box);
  }

  karan.velocityY += 1;
  kumbh.velocityY += 1;
  box.velocityY += 1;
  karan.collide(groundGroup);
  kumbh.collide(groundGroup);
  box.collide(groundGroup);
  
  ground1.display();
  ground2.display();
  ground3.display();
  ground4.display();
  ground5.display();

  drawSprites();
}
}