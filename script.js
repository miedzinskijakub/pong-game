const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
const FPS = 60;

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20;

let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

let lineHeight = 16;
let lineWidth = 4;

let ballSpeedX = 5;
let ballSpeedY = 5;

const paddleHeight = 100;
const paddleWidth = 10;

const playerX = 70;
const aix = 910;

let playerY = 200;
let aiy = 200;

let playerPoints = 0;
let aiPoints = 0;

function reset(){
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
}

function speedUp(){
    if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += 1;
    }
    else if(ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX += -1
    }
}

function table(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    for(let linePosition = 20; linePosition < ch; linePosition += 30){
       ctx.fillStyle = 'gray';
      ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
    }
}

function ball(){
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
     
    if(ballX <= 0){
        reset()
        aiPoints++;

    }else if(ballX + ballSize >= cw){
        reset()
        playerPoints++;
    }

    if((ballX <= playerX + paddleWidth)&&(ballY + ballSize / 2 >= playerY) && (ballY + ballSize / 2 <= playerY + paddleHeight)){
        ballX += 5;

        ballSpeedX = -ballSpeedX;
        speedUp();
    }

    if((ballX + ballSize >= aix)&&(ballY + ballSize / 2 >= aiy) && (ballY + ballSize / 2 <= aiy + paddleHeight)){
       ballX -= 5;
        ballSpeedX = -ballSpeedX;
        speedUp();
    }


}

function player(){
    ctx.fillStyle = '#ff4477';
    ctx.fillRect(playerX , playerY, paddleWidth, paddleHeight);
}

function ai(){
    ctx.fillStyle = '#440077';
    ctx.fillRect(aix , aiy, paddleWidth, paddleHeight);

}

function aiPosition(){
    var middlePaddle = aiy + paddleHeight/2;
    var middleBall = ballY + ballSize/2;

    if(ballX > 500){
        if(middlePaddle - middleBall > 200){
            aiy -= 13;
        }else if(middlePaddle - middleBall > 50){
            aiy -= 8;
        }
    else if(middlePaddle - middleBall < -200){
        aiy += 13;
    }  else if(middlePaddle - middleBall < -50){
        aiy += 8;
    }
    }

    else if(ballX <= 500 && ballX > 150){
        {
            if(middlePaddle - middleBall > 100){
                aiy -= 3;
            }else if(middlePaddle - middleBall < -100){
                aiy += 3;
            }
        }
    }
}

topCanvas = canvas.offsetTop;

function playerPosition(e){
    playerY = e.clientY - topCanvas - paddleHeight / 2;

    if(playerY >= ch - paddleHeight){
        playerY = ch - paddleHeight
    }
    if(playerY <= 0){
        playerY = 0;
    }

}

function result(){
        ctx.fillStyle = 'white';

    ctx.font = '30px Arial';
    ctx.fillText("Wynik: ", 450, 30);
    ctx.fillText(playerPoints, 460, 70);
    ctx.fillText(aiPoints, 520, 70);


}

canvas.addEventListener('mousemove', playerPosition)

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
    result();
}

const gameRender = setInterval(game, 1000/FPS);

