document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  let bottom = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let left = 0;

  function jump() {
    if (isJumping) return;
    let timerUpId = setInterval(function () {
      if (bottom > 250) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(function () {
          if (bottom <= 0) {
            clearInterval(timerDownId);
            isJumping = false;
          }
          bottom -= 5;
          character.style.bottom = bottom + "px";
        }, 20);
      }
      isJumping = true;
      bottom += 30;
      bottom = bottom * gravity;
      character.style.bottom = bottom + "px";
    }, 20);
  }

  function slideLeft() {
    isGoingLeft = true;
    left -= 5;
    character.style.left = left + "px";
  }

  //assign functions to keys
  function control(e) {
    if (e.keyCode === 38) {
      jump();
    } else if (e.keyCode === 37) {
      slideLeft();
    }
  }
  document.addEventListener("keydown", control);
});

// const canvas = document.querySelector("canvas");
// ctx = canvas.getContext("2d");

// // canvas.width = canvas.height = 300;

// var x = 150,
//   y = 150,
//   velY = 0,
//   velX = 0,
//   speed = 2,
//   friction = 0.98,
//   keys = [];

// function update() {
//   requestAnimationFrame(update);

//   if (keys[38]) {
//     if (velY > -speed) {
//       velY--;
//     }
//   }

//   if (keys[40]) {
//     if (velY < speed) {
//       velY++;
//     }
//   }
//   if (keys[39]) {
//     if (velX < speed) {
//       velX++;
//     }
//   }
//   if (keys[37]) {
//     if (velX > -speed) {
//       velX--;
//     }
//   }

//   velY *= friction;
//   y += velY;
//   velX *= friction;
//   x += velX;

//   if (x >= 295) {
//     x = 295;
//   } else if (x <= 5) {
//     x = 5;
//   }

//   if (y > 295) {
//     y = 295;
//   } else if (y <= 5) {
//     y = 5;
//   }

//   ctx.clearRect(0, 0, 16000, 1080);
//   ctx.beginPath();
//   ctx.arc(x, y, 5, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.fillStyle = "yellow";
// }

// update();

// document.body.addEventListener("keydown", function (e) {
//   keys[e.keyCode] = true;
// });
// document.body.addEventListener("keyup", function (e) {
//   keys[e.keyCode] = false;
// });

// USING CANVAS MARIO GAME

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

// canvas.width = 1024;
// canvas.height = 576;

// const gravity = 0.5;

// class Player {
//   constructor(position) {
//     this.position = position;
//     this.velocity = {
//       x: 0,
//       y: 1,
//     };
//     this.height = 100;
//     this.width = 100;
//   }
//   draw() {
//     c.fillStyle = "red";
//     c.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }

//   update() {
//     this.draw();
//     this.position.y += this.velocity.y;
//     this.position.x += this.velocity.x;
//     if (this.position.y + this.height + this.velocity.y < canvas.height)
//       this.velocity.y += gravity;
//     else this.velocity.y = 0;
//   }
// }

// const player = new Player({
//   x: 0,
//   y: 0,
// });

// let y = 100;

// const keys = {
//   d: {
//     pressed: false,
//   },
//   a: {
//     pressed: false,
//   },
// };

// function animate() {
//   window.requestAnimationFrame(animate);
//   c.fillStyle = "transparent";
//   c.fillRect(0, 0, canvas.width, canvas.height);
//   //   background.update();
//   player.update();

//   player.velocity.x = 0;
//   if (keys.d.pressed) player.velocity.x = 5;
//   else if (keys.a.pressed) player.velocity.x = -5;
// }

// animate();

// window.addEventListener("keydown", (event) => {
//   switch (event.key) {
//     case "d":
//       keys.d.pressed = true;

//       break;
//     case "a":
//       keys.a.pressed = true;

//       break;
//     case "w":
//       player.velocity.y = -15;
//       break;
//   }
// });

// window.addEventListener("keyup", (event) => {
//   switch (event.key) {
//     case "d":
//       keys.d.pressed = false;

//       break;
//     case "a":
//       keys.a.pressed = false;

//       break;
//   }
// });

// MARIO GAME
const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 10;
    this.height = 10;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platform = new Platform();
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;

  //   platform collision detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 5;
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 0;
      break;
  }
});

console.log(canvas);
