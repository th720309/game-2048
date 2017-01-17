/**
 * Created by tianhao on 17-1-17.
 */
var board = new Array();
var score = 0;
var hasConflicted = new Array();
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
$(document).ready(function(){
    prepareForMobile();
    newGame();
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

function newGame(){
    //初始化操作
    init();
    //随机产生两个数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; j++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    updateScore( score );
    $('.mask').css('display','none');
    $('.fail').css('display','none');
    $('.success').css('display','none');
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );//这里的append及里面的引号使用值得注意
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength*0.5);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength*0.5);
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-image',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                //theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber(){
    if( noSpace( board ) ){
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    var times = 0;

    while( times < 50 ){
        if(board[randx][randy]==0){
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
        times++;
    }

    if( times == 50 ){
        for( var i = 0; i < 4; i++){
            for( var j = 0; j < 4; j++){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                    break;
                }
            }
        }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置上显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);

    return true;
}

$(document).keydown( function(event){
    switch(event.keyCode){   //注意大小写，keycode中C是大写
        case 37://left
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38://up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
});

function isGameOver(){
    if( noSpace(board) && noMove(board) ){
        gameOver();
    }

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if( board[i][j] == 2048 ){
                youWin();
            }
        }
    }
}

function  gameOver(){
    if (documentWidth>500) {
        
    	$('.fail').show();
    }else{
	var isBegin = confirm("游戏结束，是否重新开始？");
		if (isBegin) {
			newgame();
		}
    }
}

function  youWin(){
    if (documentWidth>500) {
        
    	$('.success').show();
    }else{
	var isBegin = confirm("好厉害你赢了，是否重新开始？");
		if (isBegin) {
			newgame();
		}
    }
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    //move left
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if( board[i][j] != 0 ){
                for(var k = 0; k < j; k++){
                    if( board[i][k] == 0 && noBlockx(i,k,j,board) ){
                        //move left
                        showMoveAnimation(i,j,i,k);  //注意参数的顺序
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board [i][j] && noBlockx(i,k,j,board) && !hasConflicted[i][k] ){
                        //move left
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    //move up
    for(var i = 1;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if( board[i][j] != 0 ){
                for(var k = 0; k < i; k++){
                    if( board[k][j] == 0 && noBlocky(j,k,i,board) ){
                        //move left
                        showMoveAnimation(i,j,k,j);  //注意参数的顺序
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board [i][j] && noBlocky(j,k,i,board) && !hasConflicted[k][j] ){
                        //move left
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }

    //move left
    for(var i = 0;i < 4;i++){
        for(var j = 2;j >= 0; j--){
            if( board[i][j] != 0 ){
                for(var k = 3; k > j; k--){
                    if( board[i][k] == 0 && noBlockx(i,j,k,board) ){
                        //move left
                        showMoveAnimation(i,j,i,k);  //注意参数的顺序
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board [i][j] && noBlockx(i,j,k,board) && !hasConflicted[i][k] ){
                        //move left
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    //move up
    for(var i = 2;i >= 0;i--){
        for(var j = 0;j < 4;j++){
            if( board[i][j] != 0 ){
                for(var k = 3; k > i; k--){
                    if( board[k][j] == 0 && noBlocky(j,i,k,board) ){
                        //move left
                        showMoveAnimation(i,j,k,j);  //注意参数的顺序
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board [i][j] && noBlocky(j,i,k,board) && !hasConflicted[k][j] ){
                        //move left
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function noMove( board ){
    if( canMoveDown( board ) ||
        canMoveRight( board )||
        canMoveUp( board )   ||
        canMoveLeft( board ) ){
        return false;
    }

    return true;
}
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
			moveLeft();
			setTimeout("generateOneNumber()",210);
                        setTimeout("isGameOver()",300);
		}else{
			moveRight();
			setTimeout("generateOneNumber()",210);
                	setTimeout("isGameOver()",300);
		}
	}else{
		if (deltaY > 0) {
			moveDown();
			setTimeout("generateOneNumber()",210);
                	setTimeout("isGameOver()",300);
		}else{
			moveUp();	
			setTimeout("generateOneNumber()",210);
                	setTimeout("isGameOver()",300);		
		}
	}


});
