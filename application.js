$(document).ready(function() {
  for (var j = 0; j<700; j += 100){
    for (var i = 0; i<600; i += 100) {
      $("#container").append("<div class='box' id='X" + j/100 + "Y" + i/100 + "' style='left:" + j + "; top:" + i + "'></div>")
    }
  }
  var board = new Board()
  initializeColumns(board)


  $(".box").on('click', function(event){
    var column = $(this).css('left').match(/^\d/)[0]
    var extra = board.columns[column].circles.length
    var row = 5 - extra
    var circle = newCircle(column, board, row)
    board.addCircle(circle)
    board.checkWin()
  })
})

Board.prototype.checkWin = function () {
  checkColumns(this)
  checkRow(this)
  checkDiagonal(this)
}

function checkColumns(board){
  board.columns.forEach(checkSingleColumn)
}

function checkSingleColumn(column){
  var offSet = 0
  return function(){
    var start = offset, len = this.length
    for (var i = start; i < len; i++){

    }
  }
}

function checkRow(board){

}

function checkDiagonal(board){

}


function initializeColumns(board) {
  for (var i = 0; i < 7; i++){
    board.columns.push(new Column(i))
  }
}

function Column(position) {
  this.position = position
  this.circles = []
}

function Board(){
  this.win = false
  this.columns = []
}

function Circle(args) {
  this.posX = args.x
  this.posY = args.y
  this.color = args.color
}

function newCircle(column, board, row) {
  var circle = new Circle({x: column, y: row, color: color()})
  board.columns[column].circles.push(circle)

  return circle
}

Board.prototype.addCircle = function (circle) {
  $("#X"+ circle.posX + "Y" + circle.posY).html("<div id='X" + circle.posX + "Y" + circle.posY + "' class='circleBase " + circle.color + "''></div>")
}

var flag = false
function flip() {
  flag = !flag
  return flag
}

function color() {
  var color = "red"
    if (flip()){
      color = "blue"
    }
  return color
}

