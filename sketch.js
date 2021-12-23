//criando variaveis 
  var trex,imagemtrex;
  var bordas;
  var solo,imagemsolo;
  var solomagico;
  var nuvens,imagemNuvens;
  var borboleta,imagemBorboleta;
  var obstaculo,imagemobs1,imagemobs2;
  var aleatorio;
  var groupnuvens,groupcactus,groupborboletinhas;
  var gameover,imagemgameover;
  var restart,imagemrestart;

//criando fases 
  var estadodejogo = "JOGANDO";
  
//carregando animaçoes 
function preload(){
  imagemtrex =  loadAnimation("coelinha.png","coelinha2.png","coelinha.png");
  imagemsolo = loadImage("ground2.png");
  imagemNuvens = loadImage("cloud.png");
  imagemBorboleta = loadImage("borboleta.png");
  imagemobs1 = loadImage("cactusrosas.png");
  imagemobs2 = loadImage("cactusrosas1.png");
  imagemcoelinha = loadAnimation("coelinha2.png");
  imagemgameover = loadImage("gameOver.png");
  imagemrestart = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("correndo", imagemtrex);
  trex.scale = 0.7;
  trex.addAnimation("stop",imagemcoelinha);
  trex.setCollider("circle",0,10,30);
  trex.debug = false;
  
  //criar as bordas
  bordas = createEdgeSprites();
 
  //criar solo 
  solo = createSprite(300,185,600,4);
  solo.addImage("solo",imagemsolo);
  
 //criar solo magico
  solomagico = createSprite(50,195,600,4);
  
  solomagico.visible = false
  
  groupnuvens = new Group();
  groupcactus = new Group();
  groupborboletinhas = new Group();
  
  gameover = createSprite(300,100);
  gameover.addImage("gameover",imagemgameover);
  gameover.scale = 0.7;
  gameover.visible = false;
  
  restart = createSprite(300,150);
  restart.addImage("restart",imagemrestart);
  restart.scale = 0.45;
  restart.visible = false;
  
 }

function draw(){
 background("pink");
 drawSprites();
  
  if(estadodejogo == "JOGANDO"){
   if(trex.isTouching(groupborboletinhas)){
   estadodejogo = "GAMEOVER";
   }
   if(keyDown("space"))
   
  {
    trex.velocityY = -9;
  } 
  
  trex.velocityY = trex.velocityY + 0.5;
  solo.velocityX = -2;
  if(solo.x < 0 ){
  solo.x = solo.width /2; 
  } 
  obs();
  
  if(trex.isTouching(groupcactus)){  
  estadodejogo = "GAMEOVER";
  trex.velocityY = 0;
  
  }

  }
  
  if(estadodejogo == "GAMEOVER"){
  solo.velocityX = 0;
  groupcactus.setVelocityXEach(0);
  trex.velocityY = 0;
  trex.changeAnimation("stop");
  groupcactus.setLifetimeEach(-1);
  gameover.visible = true;
  restart.visible = true;
  if(mousePressedOver(restart)){
  estadodejogo = "JOGANDO";
  groupcactus.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("correndo")
  }
  }

 //trex andando em cima do solomagico
 trex.collide(solomagico);
 // reinicia o solo 

 nuven();
 borboletinha();
 }
 function nuven(){
 if(frameCount %100 == 0){
 nuvens = createSprite(-10,60);
 nuvens.addImage(imagemNuvens);
 nuvens.velocityX = 4;
 nuvens.y = Math.round(random(10,65));
 nuvens.lifetime = 180;
 nuvens.scale = 0.8
 groupnuvens.add(nuvens);
 nuvens.depth = 1;
 }
   
 }
 function borboletinha(){
 if(frameCount %450 == 0){
 borboleta = createSprite(10,60);
 borboleta.addImage(imagemBorboleta);
 borboleta.velocityX = 1;
 borboleta.y = Math.round(random(8,130))
 borboleta.scale = 0.4;
 borboleta.lifetime = 700;
 groupborboletinhas.add(borboleta);
 borboleta.depth = 2;
 }  
 }

 function obs(){
 if(frameCount %200 == 0){
 obstaculo = createSprite(600,160);
 aleatorio = Math.round(random(1,2))
 obstaculo.velocityX = -2;
 obstaculo.lifetime = 500;
 groupcactus.add(obstaculo); 
 obstaculo.debug = false;
 switch(aleatorio){
 case 1:obstaculo.addImage(imagemobs1);
 obstaculo.setCollider("rectangle",0,0,30,60)
 break
 case 2:obstaculo.addImage(imagemobs2);
 obstaculo.scale = 0.7;
 break;
 }
 
   
   
 }
 }
