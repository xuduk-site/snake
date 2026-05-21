let gameState = 'game'
let score = 0

let headX = 20;
let headY = 20;

let moveX = 0;
let moveY = 0;

let foodX = Math.floor(Math.random() * 20)*20
let foodY = Math.floor(Math.random() * 20)*20

let superFoodY 
let superFoodX
let superFoodBool = true

let speed = 8

let interval
let timeout

let waitForMove


do {
  superFoodX = Math.floor(Math.random() * 20)*20
  superFoodY = Math.floor(Math.random() * 20)*20
} while(superFoodX === foodX && superFoodY === foodY)

let tail = []

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER)
  
  reloadButton = createButton("Reload Game")
  reloadButton.size(100, 50)
  reloadButton.position(150, 220)
  reloadButton.addClass("reload-button")
  reloadButton.hide()
  reloadButton.mousePressed(reload)
}

function draw() {
  if (gameState == 'game') {
    background("lightblue");
    fill("purple")
    rect(headX, headY, 20, 20)
    fill("red")
    rect(foodX, foodY, 20, 20)
    fill("blue")
    if (superFoodBool) {
      rect(superFoodX, superFoodY, 20, 20)
    }

    if (headX == superFoodX && headY == superFoodY) {
      superFoodBool = false
      if (timeout) clearTimeout(timeout)
      if (Math.random() > 0.5) speed = 5
      else speed = 11
      timeout = setTimeout(() => speed = 8, 7000)

      do {
        superFoodX = Math.floor(Math.random() * 20)*20
        superFoodY = Math.floor(Math.random() * 20)*20
      } while(superFoodX === foodX && superFoodY === foodY)

      if (interval) clearInterval(interval)
      interval = setInterval(() => {
        if (Math.random() > 0.9) { 
          superFoodBool = true
          clearInterval(interval)
        }
      }, 1000)
    }
    
    if (headX == foodX && headY == foodY) {
        foodX = Math.floor(Math.random() * 20)*20
        foodY = Math.floor(Math.random() * 20)*20
        score++
        addTail()
    }
    
    if (frameCount % speed == 0) {
      updateTale(headX, headY)

      headX += moveX
      headY += moveY
      
      checkCollision()

      
      if (headX >= 400) headX = 0
      else if (headY >= 400) headY = 0
      else if (headX < 0) headX = 380
      else if (headY < 0) headY = 380
    }
    drawTail()
  }
  
  else if (gameState == 'game over') {
    background(240, 100, 40)
    textSize(40)
    fill(255, 255, 255)
    text("Game Over", 200, 150)
    textSize(32)
    text("Your result: " + score, 200, 200)
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && moveY != 20) {
    moveX = 0
    moveY = -20
  }
  
  else if (keyCode === DOWN_ARROW && moveY != -20) {
    moveX = 0
    moveY = 20
  }
  
  else if (keyCode === LEFT_ARROW && moveX != 20) {
    moveX = -20
    moveY = 0
  }
  
  else if (keyCode === RIGHT_ARROW && moveX != -20) {
    moveX = 20
    moveY = 0
  }
}

function addTail() {
  tail.push({
    x: headX,
    y: headY
  })
}


function updateTale(targetX, targetY) {
  if (tail.length > 0) {
    for (let i = tail.length - 1; i > 0; i--) {
      tail[i].x = tail[i - 1].x
      tail[i].y = tail [i - 1].y
    }
    tail[0].x = targetX
    tail[0].y = targetY
  }
}

function drawTail() {
  fill("gold")
  for(let i = 0; i < tail.length; i++) {
    rect(tail[i].x, tail[i].y, 20, 20)
  }
  drawScore()
}

function checkCollision() {
  for (let i = 2; i < tail.length; i++) {
    if (headX === tail[i].x && headY === tail[i].y) {
      gameState = 'game over'
      reloadButton.show()
    }
  }
}

function drawScore() {
  textSize(22)
  fill(0, 0, 0)
  text("SCORE: " + score, 50, 30)
}

function reload() {
  score = 0
  headX = 20;
  headY = 20;
  moveX = 0;
  moveY = 0;
  foodX = Math.floor(Math.random() * 20)*20
  foodY = Math.floor(Math.random() * 20)*20
  tail = []
  reloadButton.hide()
  gameState = 'game'
}