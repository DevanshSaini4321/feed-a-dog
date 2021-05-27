var dog,sadDog,happyDog, database;
var foods,foodStock;
var addFood, fedtime, lastfed, Feed;
var foodObj;
var FeedDog;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new foo();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  //create feed the dog button here
  Feed = createButton("Feed the dog")
  Feed.position(700,95)
  Feed.mousePressed(FeedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  //write code to read fedtime value from the database 

  fedtime = database.ref('feedtime')
  fedtime.on("value", function (data){
    lastfed = data.val();
  })
 
  //write code to display text lastFed time here
fill(225,225,255);
 textSize(15);
 if (lastfed >= 12) {
   text("last fed: 8"    , 350, 30)
 }
 else if(lastfed == 0){
   text("lastfeed: 12 " , 350, 30);
 }
 else {
   text("last feed:7 "  , 350, 30)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   food : foodObj.getFoodStock(),
   FeedTime : hour()
 })
}  

//function to add food in stock
function addFoods(){
  foods=foods+1;
  database.ref('/').update({
    Food:foods
  })
}
