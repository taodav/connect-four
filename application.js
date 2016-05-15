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
    board.checkWin(circle)
  })
})

Board.prototype.checkWin = function (circle) {
  if (this.checkColumns(circle) || this.checkRows(circle) || this.checkDiagonal(circle)){
    this.win = true
    console.log("YOU WIN")
  }
}

Board.prototype.checkColumns = function(circle){
  var column = this.columns[circle.posX]
  if (column.circles.length >=4 && checkSingleArray(column.circles)){
    return true
  }
}
Board.prototype.checkDiagonal = function(circle){
  var diagonalLeft = []
  var diagonalRight = []
  var positionX = findStartingX(circle)
  var positionY = findStartingY(circle)
  for (var i = 0; i < findLength(positionY, positionX); i++){
    console.log(this.columns[positionX + i].circles[positionY + i])
      if (this.columns[positionX + i].circles[positionY + i]){
        diagonalLeft[i] = this.columns[positionX + i].circles[positionY + i]
      }
      else {
        diagonalLeft[i] = new Circle({x: 0, y: 0, color: NaN})
      }
      
  }
  if (checkSingleArray(diagonalLeft) || checkSingleArray(diagonalRight)){
    return true
  }
}

function findLength(y, x){
  var length = 0
  if (y-x < 0){
    length += 1
  }
  
  length += (6 - (y + x))
  return length
}

function findStartingY(circle){
  if (circle.posY-circle.posX >= 0) {
    return circle.posY - circle.posX
  }
  else {
    return 0
  }
}

function findStartingX(circle){
  if (circle.posX-circle.posY >= 0) {
    return circle.posX-circle.posY
  }
  else {
    return 0
  }
}


Board.prototype.checkRows = function(circle){
  var currentRow = []
  this.columns.forEach(function(column){
    if (column.circles[5-circle.posY]){
      currentRow.push(column.circles[5-circle.posY])
    }
    else {
      currentRow.push(new Circle({x: 0, y: 0, color: NaN}))
    }
  })
  if (currentRow.length >= 4 && checkSingleArray(currentRow)){
    return true
  }
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

