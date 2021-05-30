var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedDog;
var lastFed;

function preload(){
  sadDog=loadImage("images/Dog.png");
  happyDog=loadImage("images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  database.ref('Food').on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage("sad",sadDog);
  dog.addImage("happy",happyDog);
  dog.scale=0.15;

  feedDog = createButton("Feed Dog");
  feedDog.position(850,120);
  feedDog.mousePressed(feedTheDog)

  addFood=createButton("Add Food");
  addFood.position(950,120);
  addFood.mousePressed(addFoods);

  database.ref("LastFed").on("value",function(data){
    lastFed = data.val();
  })
}

function draw() {
  background(46,139,87);

  foodObj.display();

  push();
  if(foodS === 30){
    fill("red");
    textFont("Orbitron");
    textSize(30);
    text("Max Food Limit Reached !!",50,60);
  }
  if(foodS === 0){
    fill("red");
    textFont("Orbitron");
    textSize(30);
    text("\"Add Food\" To Feed The Dog",20,60);
  }
  pop();
  drawSprites();
  if(lastFed !== undefined){
    fill("#00CEFF");
    textSize(20);
    text("Last Fed : " + lastFed,830,380);
  }
  else {
    fill("#00CEFF");
    textSize(20);
    text("Last Fed : ",830,380);
  }
}
function readStock(data){
  foodS=data.val();
  foodUpdate();
}
function feedTheDog(){
  if(foodS > 0){
    dog.changeImage("happy");
    foodS-- ;
    foodUpdate();
  }
  updatingFedTime();
}
function addFoods(){
  if(foodS < 30){
    foodS++;
    foodUpdate();
  }
}
function foodUpdate(){
  database.ref('/').update({
    Food:foodS
  })
}
async function updatingFedTime(){
  
}
