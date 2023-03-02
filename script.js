var heroPlane = document.getElementById("hero");
var enemyPlane = document.getElementById("enemies");
var shootSound = document.querySelector(".shoot-sound")
var scoreDisp = document.getElementById("score")
var explosion = document.getElementById("explosion")

var score = 0

var heroLoc = {
    x: 300,
    y: 700
}

var enemyLoc = [
    { x: 50, y: 50 },
    { x: 150, y: 210 },
    { x: 250, y: 180 },
    { x: 350, y: 12 },
    { x: 450, y: 300 },
    { x: 420, y: 100 },
    { x: 115, y: 225 }
]

var bullets = [];

function moveHeroPlane(){
    heroPlane.style.left = `${heroLoc.x}px`
    heroPlane.style.top = `${heroLoc.y}px`
}

function displayEnemies(){
    var output = '';
    for(var i=0; i<enemyLoc.length; i++){
        if (i%2==0){
            output += `<div class='enemy1' style='top:${enemyLoc[i].y}px; left:${enemyLoc[i].x}px;'></div>`
        } else if (i%2==1){
            output += `<div class='enemy2' style='top:${enemyLoc[i].y}px; left:${enemyLoc[i].x}px;'></div>`
        }
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
            bullets.shift();
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

function bulletCollision(){
    
    for(var i=0; i<bullets.length; i++){
        for (var j=0; j<enemyLoc.length; j++){
            if(Math.abs(bullets[i].x - (enemyLoc[j].x+8)) < 14 && 
            Math.abs(bullets[i].y - enemyLoc[j].y) < 8){
                // console.log('collision: x', Math.abs(bullets[i].x - enemyLoc[j].x), 'collision: y', Math.abs(bullets[i].y - enemyLoc[j].y))
                var output = `<div id="explode-seq1" style="top:${bullets[i].y}px; left:${bullets[i].x}px"></div>`
                explosion.innerHTML = output;
                setTimeout(removeExplosion, 2000)
                enemyLoc[j].y = 0;
                enemyLoc[j].x = Math.random()*500
                bullets.splice(i, 1)
                score += 10
                scoreDisp.innerText = score
                shootSFX();
                // console.log(enemyPlane.childNodes[j])
            }
        }
    }
}

function planeCollision(){
    for(var i=0; i<enemyLoc.length; i++){
            if(Math.abs(heroLoc.x - (enemyLoc[i].x+8)) < 18 && Math.abs(heroLoc.y - enemyLoc[i].y) < 12){
                collisionSFX();
                
                enemyLoc[i].y = 0;
                enemyLoc[i].x = Math.random()*500
                score -= 500;
                scoreDisp.innerText = score
                // console.log("collided w/ plane", i)
            }   
    }
}

function removeExplosion(){
    explosion.removeChild(document.getElementById("explode-seq1"))
}

function planeGone(){
    
}

setInterval(gameLoop, 100);
setInterval(bulletCollision, 100);
setInterval(planeCollision, 10)

function shootSFX(){
    var audio = new Audio("Explode.mp3")
    // audio.playbackRate = .75;
    audio.volume = 0.3;
    audio.play();
}

function collisionSFX(){
    var audio = new Audio("collisionSFX.mp3")
    audio.playbackRate = 1.2;
    audio.play();
}


document.onkeydown = function(e){
    // console.log(e.key)
    if(e.key == "ArrowLeft" || e.key == "a"){
        heroLoc.x -= 6
    } else if (e.key == "ArrowRight" || e.key == "d"){
        heroLoc.x += 6
    } else if (e.key == "ArrowDown" || e.key == "s"){
        heroLoc.y += 6
    } else if (e.key == "ArrowUp" || e.key == "w"){
        heroLoc.y -= 6
    }
    moveHeroPlane()

    if(e.key == " "){
        // shootSFX();
        bullets.push({x: heroLoc.x+6, y: heroLoc.y-8})
        displayBullets();
    }
}
