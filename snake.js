var snake = document.getElementById('snake')
var gameContainer = document.getElementById('game-container')
var startButton = document.getElementById('start')
var points = document.getElementById('points')
var gameOver = document.getElementById('game-over')

var b1 = document.getElementById('b1')
var b2 = document.getElementById('b2')
var b3 = document.getElementById('b3')

var taid
var insane = 0
var positionY = 0
var positionX = 0
var randomY = 0
var randomX = 0
var velocityY = 0
var velocityX = 0
var snakeLenght = 10
var cnt = 0
var speed = 0
var flagRender = 0


const fruits = [
	"./apple.png",
	"./pear.png",
	"./orange.png",
	"./peach.png",
	"./bananas.png"
]
window.addEventListener('load', function(){
	gameContainer.style.width = Math.floor(gameContainer.clientWidth/20)*20+'px'
	gameContainer.style.height = Math.floor(gameContainer.clientHeight/20)*20+'px'
})

window.addEventListener('keydown', function(e) {
	e = e || window.event;
	switch (e.keyCode) {

		case 37:
			if (velocityX != 1 && flagRender == 0){
				velocityX = -1
				velocityY = 0
				flagRender=1
			}
		break;

		case 38:
			if (velocityY != 1 && flagRender == 0){
				velocityX = 0
				velocityY = -1
				flagRender=1
			}
		break;

		case 39:
			if (velocityX != -1 && flagRender == 0){
				velocityX = 1
				velocityY = 0
				flagRender=1
			}
		break;

		case 40:
			if (velocityY != -1 && flagRender == 0){
				velocityX = 0
				velocityY = 1
				flagRender=1
			}
		break;
	}
})


function position() {
	setTimeout(function(){
		positionY = positionY + velocityY*20
		positionX = positionX + velocityX*20

		if (positionY < 0) {
			positionY = gameContainer.clientHeight - 20;
		} else if (positionY > gameContainer.clientHeight - 20) {
			positionY = 0;
		} 

		if (positionX < 0) {
			positionX = gameContainer.clientWidth - 20;
		} else if (positionX > gameContainer.clientWidth - 20) {
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

		
			tail.style.top = tailBefore.style.top
			tail.style.left = tailBefore.style.left
		if ( positionY+'px' == tail.style.top && positionX+'px' == tail.style.left && cnt>2) {
			gameOverf()
		}
			document.getElementById(id).style.display = 'block'
		}
		snake.style.top = positionY+'px'
		snake.style.left = positionX+'px'
		flagRender = 0;

		if (positionY == randomY && positionX == randomX ) {
			cnt++
			if(insane == 1 && speed > 15)
			speed -= 3
			appleGenerator()
			incSnake()
			score()
		}
		position()
	}, speed)
}

function appleGenerator() {
	var randomApple = Math.floor(Math.random()*5)
	apple.style.backgroundImage = "url("+fruits[randomApple]+")"
	randomX = Math.floor(Math.random()*gameContainer.clientWidth/20)*20
	randomY = Math.floor(Math.random()*gameContainer.clientHeight/20)*20

	apple.style.top = randomY+'px'
	apple.style.left = randomX+'px'
}

function incSnake() {
	var tail = document.createElement("DIV")
	tail.classList.add("tail")
	tail.id = 'tail'+cnt
	taid= 'tail'+cnt
	document.getElementById('game-container').appendChild(tail)
	document.getElementById(taid).style.display = 'none'
}

function score(){
	scorecnt=cnt-2
	if (scorecnt < 2)
		points.innerHTML='SCORE: 000'+scorecnt*5
	else if (scorecnt < 20)
		points.innerHTML='SCORE: 00'+scorecnt*5
	else if (scorecnt < 200)
		points.innerHTML='SCORE: 0'+scorecnt*5
	else if (scorecnt < 2000)
		points.innerHTML='SCORE: '+scorecnt*5+''
}

function start() {
	for(var h=0; h<2; h++){
		cnt++
		incSnake()
	}

}


function gameOverf() {
	document.getElementById('game-over').style.display = 'flex'
	apple.style.display = 'none'
}

b1.addEventListener( 'click' , function() {
	startButton.style.display = 'none'
	apple.style.display = 'block'
	position()
	appleGenerator()
	start()
	speed = 150
})

b2.addEventListener( 'click' , function() {
	startButton.style.display = 'none'
	apple.style.display = 'block'
	position()
	start()
	appleGenerator()
	speed = 100
})

b3.addEventListener( 'click' , function() {
	startButton.style.display = 'none'
	apple.style.display = 'block'
	position()
	appleGenerator()
	start()
	speed = 50
})

b4.addEventListener( 'click' , function() {
	startButton.style.display = 'none'
	apple.style.display = 'block'
	position()
	appleGenerator()
	start()
	speed = 50
	insane = 1
})

document.getElementById('restart').addEventListener("click", function(){
	location.reload()
})



