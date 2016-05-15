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
  var positionLeftX = findStartingLeft(circle.posX, circle.posY)
  var positionLeftY = findStartingLeft(circle.posY, circle.posX)
  var positionRightX = findStartingRightX(circle.posX, circle.posY)
  var positionRightY = findStartingRightY(circle.posX, circle.posY)
  var diagonalLeft = diagonalOneSide(this, circle, positionLeftX, positionLeftY, 'left')
  var diagonalRight = diagonalOneSide(this, circle, positionRightX, positionRightY, 'right')

  if (checkSingleArray(diagonalLeft) || checkSingleArray(diagonalRight)){
    return true
  }
}

function diagonalOneSide(board, circle, x, y, option){
  var diagonalSide = []
  var right = 0
  if (option == 'right'){
    right = 1
  }
  for (var i = 0; i < findLength(y, x)+right; i++){
    if (option == 'left') {
      var increment = x + i
    }
    else {
      var increment = x - i
    }
    if (board.columns[increment].circles.some(function(circle){return includeCircle(circle, increment, y + i)})){
      diagonalSide[i] = board.columns[increment].circles.find(function(circle){return includeCircle(circle, increment, y + i)})
    }
    else {
      diagonalSide[i] = new Circle({x: 0, y: 0, color: NaN})
    }
  }
  console.log(diagonalSide)
  return diagonalSide
}


function includeCircle(circle, x, y){
  if (circle.posY == y && circle.posX == x){
    return true
  }
}

function findLength(y, x){
  var length = 0
  var difference = y-x
  if (difference < 0){
    length += 1
  }

  length += (6 - Math.abs(y - x))
  return length
}

function findStartingRightX(x, y){
  if (x+y > 6){
    return 6
  }
  else {
    return x+y
  }
}

function findStartingRightY(x, y){
  if (x+y < 6){
    return 0
  }
  else {
    return (x+y)-6
  }
}

function findStartingLeft(x, y){
  if (x-y >= 0) {
    return x-y
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
          alert(arrayOfColors[i].toUpperCase() + " WINS")
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
  var circle = new Circle({x: parseInt(column), y: row, color: color()})
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

