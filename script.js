var heroPlane = document.getElementById("hero");
var enemyPlane = document.getElementsByClassName("enemy1")
var shootSound = document.querySelector(".shoot-sound")

var heroLoc = {
    x: 300,
    y: 700
}

var enemyLoc = [
    { x: 50, y: 50 },
    { x: 150, y: 210 },
    { x: 250, y: 180 },
    { x: 350, y: 12 },
    { x: 450, y: 300 }
]

var bullets = [];

function moveHeroPlane(){
    heroPlane.style.left = `${heroLoc.x}px`
    heroPlane.style.top = `${heroLoc.y}px`
}

function displayEnemies(){
    var output = '';
    for(var i=0; i<enemyLoc.length; i++){
        output += `<div class='enemy1' style='top:${enemyLoc[i].y}px; left:${enemyLoc[i].x}px;'></div>`
    }
    document.getElementById("enemies").innerHTML = output;
}
displayEnemies();

function moveEnemies(){
    for(var i=0; i<enemyLoc.length; i++){
        enemyLoc[i].y += 5;
        if(enemyLoc[i].y > 775){
            enemyLoc[i].y = 0;
            enemyLoc[i].x = Math.random()*500
        }
    } 
}

function displayBullets() {
    var output = ''
    for(var i=0; i<bullets.length; i++){
        output += `<div class='bullet' style='top:${bullets[i].y}px; left:${bullets[i].x}px;'></div>`
    }
    document.getElementById("bullets").innerHTML = output;
}

function moveBullet() {
    for(var i=0; i<bullets.length; i++){
        bullets[i].y -= 10;
        if(bullets[i].y <= 0){
            // bullets[i].y = "none"
        }
    }
}

function gameLoop(){
    // moveHeroPlane();
    displayEnemies();
    moveEnemies();
    displayBullets();
    moveBullet();
    // console.log(enemyLoc[0].y)
}

setInterval(gameLoop, 200);

function shootSFX(){
    var audio = new Audio("shoot-sound-effect.mp3")
    audio.playbackRate = 2;
    audio.play();
}


document.onkeydown = function(e){
    // console.log(e.key)
    if(e.key == "ArrowLeft" || e.key == "a"){
        heroLoc.x -= 8
    } else if (e.key == "ArrowRight" || e.key == "d"){
        heroLoc.x += 8
    } else if (e.key == "ArrowDown" || e.key == "s"){
        heroLoc.y += 8
    } else if (e.key == "ArrowUp" || e.key == "w"){
        heroLoc.y -= 8
    }
    moveHeroPlane()

    if(e.key == " "){
        shootSFX();
        bullets.push({x: heroLoc.x, y: heroLoc.y})
        displayBullets();
    }
}
