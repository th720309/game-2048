
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;



function generateOneNumber(){
	var num   = Math.random()>0.8 ?4:2;
	var ceilX = Math.floor(Math.random()*4);
	var ceilY = Math.floor(Math.random()*4);
	var trial = 0;
	var judge = false;

	while(trial < 50){
		if (board[ceilX][ceilY] == 0) {
			board[ceilX][ceilY] = num;
			judge = true;
			break;
		}
		ceilX = Math.floor(Math.random()*4);
		ceilY = Math.floor(Math.random()*4);
	}

	if (!judge) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] != 0) {
					board[i][j] = num;
				}
			}
		}
	}
	showNumberWithAnimation(ceilX,ceilY,num);
}




function getPosTop(ceilX , ceilY){
	return ceilX*(cellSideLength+cellSpace)+cellSpace;
}
function getPosLeft(ceilX , ceilY){
	return ceilY*(cellSideLength+cellSpace)+cellSpace;
}


function getNumberBackgroundColor(num){
	var bgc = "#black";
	switch(num){
		case 2:    bgc = "#eee4da" ; break;
		case 4:    bgc = "#ede0c8" ; break;
		case 8:    bgc = "#f2b179" ; break;
		case 16:   bgc = "#f59563" ; break;
		case 32:   bgc = "#f67c5f" ; break;
		case 64:   bgc = "#f65e3b" ; break;
		case 128:  bgc = "#edcf72" ; break;
		case 256:  bgc = "#efc83f" ; break;
		case 512:  bgc = "#fcd54c" ; break;
		case 1024: bgc = "#fee259" ; break;
		case 2048: bgc = "#fdf46b" ; break;
		case 4096: bgc = "#888" ; break;
		case 8192: bgc = "#505050" ; break;

	}
	return bgc;
}




function getNumberColor(num){
	if (num <= 4) {
		return "#776e65";
	}
	 return "white";
}




function leftMove(){

	if (!canLeftMove()) {
		return false;
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {

				for (var k = 0; k < j; k++) {					
					if (board[i][k] == 0 && noBlockLeftHorizontal(i,k,j)) {
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;								
					}else if (board[i][k] == board[i][j] && noBlockLeftHorizontal(i,k,j) && !hasConflicted[i][k]) {
						showMoveAnimation(i,j,i,k);					
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score +=board[i][k];
						hasConflicted[i][k] = true;
						break;
					}
				}

			}
		}
	}
	$("#score").text(score);
	setTimeout("updateBoardView()",200);
	setTimeout("generateOneNumber()",200);
	setTimeout("isGameOver()",260);
}
function noBlockLeftHorizontal(row,k,j){
	for (var x = k+1 ; x < j ; x++) {
		if (board[row][x] != 0) {
			return false;
		}
	}
	return true;
}


function upMove(){

	if (!canUpMove()) {
		return false;
	}

	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {

				for (var k = 0; k < i ; k++) {
					if (board[k][j] == 0 && noBlockUpVertical(i,k,j)) {
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;								
					}else if (board[k][j] == board[i][j] && noBlockUpVertical(i,k,j) && !hasConflicted[k][j]) {
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						score +=board[k][j];
					}	
				}

			}
		}
	}
	$("#score").text(score);
	setTimeout("updateBoardView()",200);
	setTimeout("generateOneNumber()",200);
	setTimeout("isGameOver()",260);
}

/*判断移动时是否有障碍物*/

function noBlockUpVertical(i,k,col){
	for (var x = k+1 ; x < i ;x++) {
		if (board[x][col] != 0) {
			return false;
		}
	}
	return true;
}

function rightMove(){

	if (!canRightMove()) {
		return false;
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {

				for (var k = 3; k > j ; k--) {
					if (board[i][k] == 0 && noBlockRightHorizontal(i,k,j)) {
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;								
					}else if (board[i][k] == board[i][j] && noBlockRightHorizontal(i,k,j) && !hasConflicted[i][k] ) {
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						score +=board[i][k];
					}					
				}

			}
		}
	}
	$("#score").text(score);
	setTimeout("updateBoardView()",200);
	setTimeout("generateOneNumber()",200);
	setTimeout("isGameOver()",260);
}

function noBlockRightHorizontal(row,k,j){
	for (var x = k-1 ; x > j ; x--) {
		if (board[row][x] != 0) {
			return false;
		}
	}
	return true;
}

function downMove(){

	if (!canDownMove()) {
		return false;
	}

	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {

				for (var k = 3; k > i ; k--) {
					if (board[k][j] == 0 && noBlockDownVertical(i,k,j)) {
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;								
					}else if (board[k][j] == board[i][j] && noBlockDownVertical(i,k,j) && !hasConflicted[k][j]) {
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						score +=board[k][j];
					}					
				}

			}
		}
	}
	$("#score").text(score);
	setTimeout("updateBoardView()",200);
	setTimeout("generateOneNumber()",200);
	setTimeout("isGameOver()",260);
}

/*判断移动时是否有障碍物*/

function noBlockDownVertical(i,k,col){
	for (var x = k-1 ; x > i ;x--) {
		if (board[x][col] != 0) {
			return false;
		}
	}
	return true;
}

function canLeftMove(){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {

			if (board[i][j] != 0) {
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;		
				}
			}

		}
	}	
	return false;
}

function canUpMove(){
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {

			if (board[i][j] != 0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;							
				}
			}

		}
	}
	return false;
}

function canRightMove(){
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {

			if (board[i][j] != 0) {
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;							
				}					
			}

		}
	}
	return false;
}

/*判断是否可以移动*/
function canDownMove(){
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {

			if (board[i][j] != 0) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;							
				}								
			}

		}
	}
	return false;
}

/*判断游戏是否结束*/
function isGameOver(){
	if (canLeftMove()||canUpMove()||canRightMove()||canDownMove()) {

	}else{
		console.log(canLeftMove()+""+canUpMove()+""+canRightMove()+""+canDownMove());
		var isBegin = confirm("游戏结束，是否重新开始？");
		if (isBegin) {
			newgame();
		}
	}
}

























