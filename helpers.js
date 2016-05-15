function drawCircle(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, 2*Math.PI)
  ctx.fill()
}

function turnColor(number) {
  if (i == 0){
    i += 1
    return true
  }
  else {
    i -= 1
    return false
  }
}

  // var canvas = $("#box").get(0)
  // var ctx = canvas.getContext("2d")
  // for (var i = 1; i<5; i++){
  //   ctx.moveTo(100*i,0)
  //   ctx.lineTo(100*i, 500*i)
  //   ctx.stroke()
  //   ctx.moveTo(0,100*i)
  //   ctx.lineTo(500*i, 100*i)
  //   ctx.stroke()
  // }

  // $("#box").on('click', function(event) {
  //   var x = event.offsetX
  //   var y = event.offsetY
  //   var fillColor = "#FF0000"
  //   ctx.fillStyle = fillColor;
  //   drawCircle(ctx, x, y)
  // })
