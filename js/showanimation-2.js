/**
 * Created by tianhao on 17-1-17.
 */
function showNumberWithAnimation( i, j, randNumber){
    var numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css('background-image',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    //numberCell.text(randNumber);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },150);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },300);
}

function updateScore( score ){
    $('#score').text( score );
}