// Enemies our player must avoid
let count =0,
    total =0,
    high_speed = 100,
    low_speed = 200,
    sec = 0;

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = this.get_speed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += this.speed * dt;

    } else {
        this.x = -100;
        this.speed = this.get_speed();
    }
};

Enemy.prototype.get_speed = function() {
    return Math.floor(Math.random() * (high_speed - low_speed + 1) + low_speed);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.avatar = 'images/char-boy.png';
};

Player.prototype.render =function() {
    ctx.drawImage(Resources.get(this.avatar), this.x, this.y);
};

Player.prototype.reset =function() {
  this.x = 200;
  this.y = 430;
};


Player.prototype.update =function() {
  for (var i = 0; i < 4; i++) {
      if ((this.x + 68 > allEnemies[i].x) && (this.x < allEnemies[i].x + 68) && (this.y + 68 > allEnemies[i].y) && (this.y < allEnemies[i].y + 68)) {
          this.reset();
          alert("Game Over and your score is:"+" "+ count+" in"+" "+ sec+" Seconds");
          count = 0;
          sec = 0;
          $('.score').empty().append(count);
          $('.sec').empty().append(sec);
      }
  }
};

var allEnemies =[
  new Enemy(0, 60),
  new Enemy(0, 80),
  new Enemy(0, 140),
  new Enemy(0, 210),
];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 430);

Player.prototype.handleInput = function(key){
  if (key == 'up') {
      if (this.y > 40)
          this.y -= 100;
      else {

          this.reset();
          count++;
          $('.score').empty().append(count);

      }
  } else if (key == 'down') {
      if (this.y < 430) {
          this.y += 100;
      } else {
          this.reset();
      }
  } else if (key == 'left') {
      if (this.x > 0)
          this.x -= 100;
  } else if (key == 'right') {
      if (this.x < 400)
          this.x += 100;
  }
};
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

//Timer
   function updateTime(){
   sec = sec + 1;
   $('.sec').empty().append(sec);
   setTimeout(updateTime,1000);
   }
updateTime();
//mad
