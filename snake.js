var snake = document.getElementById('snake')
var gameContainer = document.getElementById('game-container')
var startButton = document.getElementById('start')
var points = document.getElementById('points')
var gameOver = document.getElementById('game-over')

var positionY = 0
var positionX = 0
var randomY = 0
var randomX = 0
var velocityY = 0
var velocityX = 0
var snakeLenght = 10
var cnt = 0


const fruits = [
	"./apple.png",
	"./pear.png",
	"./orange.png",
	"./peach.png",
	"./bananas.png"
]
window.addEventListener('load', function(){
	gameContainer.style.width = Math.floor(gameContainer.clientWidth/10)*10+'px'
	gameContainer.style.height = Math.floor(gameContainer.clientHeight/10)*10+'px'
})

window.addEventListener('keydown', function(e) {
	e = e || window.event;
	switch (e.keyCode) {

		case 37:
			if (velocityX != 1){
				velocityX = -1
				velocityY = 0
			}
		break;

		case 38:
			if (velocityY != 1){
				velocityX = 0
				velocityY = -1
			}
		break;

		case 39:
			if (velocityX != -1){
				velocityX = 1
				velocityY = 0
			}
		break;

		case 40:
			if (velocityY != -1){
				velocityX = 0
				velocityY = 1
			}
		break;
	}
})


function position() {
	setTimeout(function(){
		positionY = positionY + velocityY*10
		positionX = positionX + velocityX*10

		if (positionY < 0) {
			positionY = gameContainer.clientHeight - 10;
		} else if (positionY > gameContainer.clientHeight - 10) {
			positionY = 0;
		} 

		if (positionX < 0) {
			positionX = gameContainer.clientWidth - 10;
		} else if (positionX > gameContainer.clientWidth - 10) {
			positionX = 0;
		} 

		
		for(i=cnt; i>0; i--){
			var id = 'tail'+i
			var tail = document.getElementById(id)

			var idBefore = 'tail'+(i-1)
			var tailBefore = document.getElementById(idBefore)

			if (i==1){
				var tailBefore = snake
			}

			if ( snake.style.top == tail.style.top && snake.style.left == tail.style.left) {
				gameOverf()
			}

			tail.style.top = tailBefore.style.top
			tail.style.left = tailBefore.style.left
		}
		
		snake.style.top = positionY+'px'
		snake.style.left = positionX+'px'

		if (positionY == randomY && positionX == randomX ) {
			cnt++
			appleGenerator()
			incSnake()
			score()
		}
		position()
	}, 50)
}

function appleGenerator() {
	var randomApple = Math.floor(Math.random()*5)
	apple.style.backgroundImage = "url("+fruits[randomApple]+")"
	randomX = Math.floor(Math.random()*gameContainer.clientWidth/10)*10
	randomY = Math.floor(Math.random()*gameContainer.clientHeight/10)*10

	apple.style.top = randomY+'px'
	apple.style.left = randomX+'px'
}

function incSnake() {
	var tail = document.createElement("DIV")
	tail.classList.add("tail")
	tail.id = 'tail'+cnt
	document.getElementById('game-container').appendChild(tail);
	
}

function score(){
	if (cnt < 2)
		points.innerHTML='000'+cnt*5
	else if (cnt < 20)
		points.innerHTML='00'+cnt*5
	else if (cnt < 200)
		points.innerHTML='0'+cnt*5
	else if (cnt < 2000)
		points.innerHTML=cnt*5+''
}


function gameOverf() {
	document.getElementById('game-over').style.display = 'flex'
	apple.style.display = 'none'
}

startButton.addEventListener( 'click' , function() {
	startButton.style.display = 'none'
	apple.style.display = 'block'
	position()
	appleGenerator()
})

document.getElementById('restart').addEventListener("click", function(){
	location.reload()
})



