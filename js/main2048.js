var board = [];
var score = 0;
var hasConflicted = [];


var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if (documentWidth>500) {
		gridContainerWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;
	}

	$("#grid-container").css({
		"width"         : gridContainerWidth,
		"height"        : gridContainerWidth,
		"border-radius" : 0.03*gridContainerWidth
	});

	$(".grid-cell").css({
		"width" : cellSideLength,
		"height": cellSideLength
	});


}

function newgame(){
	/*初始化棋盘格*/
	init();

	/*随机生成两个数*/
	generateOneNumber();
	generateOneNumber();

}


function init(){

	for (var i = 0; i < 4; i++) {
		board[i] = [];
		hasConflicted [i] = [];
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}


	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-cell-'+i+'-'+j).css({
				"top"    : getPosTop(i,j),
				"left"   : getPosLeft(i,j)				
			});
		}
	}

	$("#score").text("0"); 

	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4 ; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell = $('#number-cell-'+i+'-'+j);

			if( board[i][j] == 0){
				numberCell.css({
					"width"  : "0px",
					"height" : "0px",
					"top"    : getPosTop(i,j) + cellSideLength*0.5,
					"left"   : getPosLeft(i,j) + cellSideLength*0.5
				});
			}else{
                numberCell.css({
					"width"  : cellSideLength,
					"height" : cellSideLength,
					"top"    : getPosTop(i,j),
					"left"   : getPosLeft(i,j),
					"background-color" : getNumberBackgroundColor( board[i][j] ) ,
					"color"  : getNumberColor( board[i][j] )
				});
				if (board[i][j] >= 1024) {
					numberCell.css("font-size",0.4*cellSideLength+"px");
				}else if(board[i][j] >= 128){
					numberCell.css("font-size",0.55*cellSideLength+"px");
				}else{
					numberCell.css("font-size",0.6*cellSideLength+"px");
				}
				numberCell.text(board[i][j]);
				hasConflicted[i][j] = false;
			}

		}
	}
	$(".number-cell").css({
		"line-height" : cellSideLength+"px",
	});
}

$(document).keydown(function(event){
		
	switch(event.keyCode){
		case 37: leftMove();  break;
		case 38: upMove();    event.preventDefault(); break;
		case 39: rightMove(); break;
		case 40: downMove();  event.preventDefault(); break;
	}
})

document.addEventListener("touchstart",function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
	event.preventDefault();
});

document.addEventListener("touchend",function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;

	if(Math.abs(deltaX) < documentWidth*0.15 && Math.abs(deltaY) < documentWidth*0.15){
		return false;
	}

	if(Math.abs(deltaX) > Math.abs(deltaY)){
		if (deltaX < 0) {
			leftMove();
		}else{
			rightMove();
		}
	}else{
		if (deltaY > 0) {
			downMove();
		}else{
			upMove();			
		}
	}


});









