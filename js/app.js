"use strict"

//defining canvas border
//player will not cross these borders
const UP_BORDER = -25
const DOWN_BORDER = 400
const RIGHT_BORDER= 400
const LEFT_BORDER = 0
const P_VERTICAL_SPEED = 85 ;

        let scoreElement = document.querySelector("#score") ;
        let score = 0;
        scoreElement.innerHTML = score

let GameObject = class {
    constructor(x, y,sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite
      }

}
// Enemies our player must avoid
class Enemy extends GameObject{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (x,y,speed) {
        super(x,y,'images/enemy-bug.png')
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
GameObject.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Enemy.prototype.checkCollision = function() {
     if (this.y > player.y+80 || this.x+80 < player.x || this.y+80 < player.y || this.x > player.x+80) {
        return false;
      }
      return true;
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = class extends GameObject {
    constructor(x,y){
        super(x,y,'images/char-boy.png')

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

Player.prototype.update = function(){
    if (this.y == UP_BORDER ) {
        this.y += 1 //this to prevent the if statement from evaluating to true next frame
        setTimeout(function(){
            score = score + 1 ;
            scoreElement.innerHTML = score ;
            player.reset()
        }, 100)
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(0,60,4),new Enemy(0,145,3),new Enemy(0,230,2),new Enemy(0,315,1)];
let player = new Player(200,400);

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

