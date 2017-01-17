function showNumberWithAnimation(i,j,number){
	var numberCell = $('#number-cell-'+i+'-'+j);
	numberCell.css({
		"background-color" : getNumberBackgroundColor( board[i][j] ) ,
		"color"  : getNumberColor( board[i][j] ),
		"font-size" : 0.6*cellSideLength+"px"
	});
	numberCell.text(board[i][j]);
	numberCell.animate({
		width : cellSideLength,
		height: cellSideLength,
		top    : getPosTop(i,j),
		left   : getPosLeft(i,j),
	},50);
}



function showMoveAnimation(startI,startJ,endI,endJ,speed){
	var numberCellStart = $('#number-cell-'+startI+'-'+startJ);
	numberCellStart.animate({
		top    : getPosTop(endI,endJ),
		left   : getPosLeft(endI,endJ)
	},speed);
}











