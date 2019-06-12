"use strict"

//defining canvas border 
//player will not cross these borders
const UP_BORDER = -25
const DOWN_BORDER = 400
const RIGHT_BORDER= 400
const LEFT_BORDER = 0
const P_VERTICAL_SPEED = 85 ;
// Enemies our player must avoid
let Enemy = class {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (x,y,speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x ;
        this.y = y ;
        this.speed = speed ;
    }

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= RIGHT_BORDER + 300) {
         this.x += 1 * this.speed } 
    else {
        this.x = 0
    }

    if (this.checkCollision()) {
        console.log('hello world') ;
        player.reset( ) ;
    }

    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Enemy.prototype.checkCollision = function() {
  if (this.y == player.y) {
      if (this.x == player.x){
        return true ;
      }
 
  }
  return false
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = class {
    constructor(sprite,x,y){
        this.sprite = sprite ;
        this.x = x ;
        this.y = y
    }
}

Player.prototype.handleInput = function (e) {
 
    if (e=='down') {
        this.y += P_VERTICAL_SPEED ;
    } else if ( e=='up') {
        this.y -= P_VERTICAL_SPEED ;
    } else if (e=='left') {
        this.x -= 100 ;

    } else if (e='right') {
        this.x += 100 ;
    }
 
}



/*
Player.prototype.checkCollisions = function() {
    
    if (this.x == allEnemies[0].x && this.y ==allEnemies[0].y) {
        this.reset()
    } 

    if (this.x == allEnemies[1].x && this.y ==allEnemies[1].y) {
        this.reset()
    } 

    if (this.x == allEnemies[2].x && this.y ==allEnemies[2].y) {
        this.reset()
    } 

    if (this.x == allEnemies[3].x && this.y ==allEnemies[3].y) {
        this.reset()
    } 
}
*/

Player.prototype.update = function(){ 

    if (this.y <= UP_BORDER ) {
        this.y = UP_BORDER ;
    } else if (this.y >= DOWN_BORDER) {
        this.y = DOWN_BORDER ;
    }

    if (this.x <= LEFT_BORDER ) {
        this.x = LEFT_BORDER ;
    } else if (this.x >= RIGHT_BORDER) {
        this.x = RIGHT_BORDER ;
    }
  
}

Player.prototype.reset = function() {
    this.x = 200 ;
    this.y = 400 ;
}

Player.prototype.render = function(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y); }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0,-25,1),new Enemy(0,60,1),new Enemy(0,145,1),new Enemy(0,230,1)];
var player = new Player('images/char-boy.png',200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

