var dog,dog_moving;
var database,position;

function preload(){
   
  dog_moving = loadAnimation("dogImg.png","dogImg1.png")
 
}

function setup(){
    createCanvas(500,500);
    database = firebase.database()
    console.log(database);

    dog = createSprite(250,250,10,10);
    dog.addAnimation("moving", dog_moving);

    var dogpos = database.ref('Dog/Position');
    dogpos.on("value",readPosition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('Dog/Position').set({
        x: ball.x+x ,
        y: ball.y+y
    }
  )
}

function readPosition(data){
   position = data.val();
   dog.x = position.x;
   dog.y = position.y; 
}