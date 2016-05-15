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
    board.checkDiagonal()
    board.checkWin()
  })
})

Board.prototype.checkWin = function () {
  if (this.checkColumns() || this.checkRows() || this.checkDiagonal()){
    this.win = true
    console.log("YOU WIN")
  }
}

Board.prototype.checkColumns = function(){
  return this.columns.some(function(column){
    if (column.circles.length >=4 && checkSingleArray(column.circles))
      return true
  })
}
Board.prototype.checkDiagonal = function(){
+
}

Board.prototype.checkRows = function(){
  var allRows = []
  for (var i = 6; i > 0; i-=1){
    var currentRow = []
    this.columns.forEach(function(column){
      if (column.circles[i-1]){
        currentRow.push(column.circles[i-1])
      }
    })
    allRows.push(currentRow)
    var cleanRows = allRows.filter(function(circles){return circles.length !== 0;})
  }
  return cleanRows.some(function(row){
    if (row.length >= 4 && checkSingleArray(row)){
      return true
    }
  })
}

function checkSingleArray(array){
  var arrayOfColors = []
  array.forEach(function(circle){arrayOfColors.push(circle.color)})
  var result = false
  var count = 0
  if (arrayOfColors.length != 0){
    for (var i = 0; i < arrayOfColors.length; i++){
      if (arrayOfColors[i-1] == arrayOfColors[i]){
        count++
        if (count == 3){
          result = true
          console.log(arrayOfColors[i].toUpperCase())
          break
        } 
      }
      else {
        result = false
      }
    }
  }
  return result
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

