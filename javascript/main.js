var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pippeUp = new Image();
var pippeBottom = new Image();

bird.src = "img/flappy_bird_bird (1).png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pippeUp.src = "img/flappy_bird_pipeUp.png";
pippeBottom.src = "img/flappy_bird_pipeBottom.png";

//звуковые файлы 
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"

var gap = 90;

//при нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 25;
    fly.play();
}

//создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
//позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;


function draw(){
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pippeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pippeBottom, pipe[i].x, pipe[i].y + pippeUp.height + gap);
        
        pipe[i].x--;
        
        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pippeUp.height) - pippeUp.height
            });
        }
//отслеживание прикосновений        
        if(xPos + bird.width >= pipe[i].x
          && xPos <= pipe[i].x + pippeUp.width
          && (yPos <= pipe[i].y + pippeUp.height
             || yPos + bird.height >= pipe[i].y + pippeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // перезагрузка страницы
        }
        
        if(pipe[i].x == 5){
          score++;  
          score_audio.play();    
        }
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    
    yPos += grav;
    
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);
}
pippeBottom.onload = draw;