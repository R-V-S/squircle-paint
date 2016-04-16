//cityscape by the water palette: 9ac, ac9, 89a, bce, abd
var divCanvas = document.getElementById('div-canvas');
var color = '#abd';
var newCircle = document.createElement('div');
newCircle.className = 'circle';
for (var i=3.14;i<4.71;i+=0.3) {
  var y = Math.sin(i) * 150 +170;
  var x = Math.cos(i) * 150 +170;
  var h = parseInt(Math.random()*50+200);
  var s = parseInt(Math.random()*50+200);
  var v = parseInt(Math.random()*50+200);
  var paletteColor = document.createElement('div');
  paletteColor.className = 'point palette-color';
  paletteColor.style.left = x+'px';
  paletteColor.style.top = y+'px';
  paletteColor.style.backgroundColor = 'rgb('+h+','+s+','+v+')';
  paletteColor.onclick = function(e) {
    color = e.target.style.backgroundColor;
  }
  newCircle.appendChild(paletteColor);
}
divCanvas.appendChild(newCircle);
var mouseDown = false;
divCanvas.onmousedown = function(e){
  console.log('down')
  mouseDown = true;
}
divCanvas.onmouseup = function(){
  mouseDown = false;
}
divCanvas.onmousemove = function(e){
  if(mouseDown){
    var point = document.createElement('div');
    point.className = 'point';
    point.style.left = e.pageX+'px';
    point.style.top =  e.pageY+'px';
    point.style.width = (Math.random()*5*5) + 'px';
    point.style.height = (Math.random()*5*5) + 'px';
    point.style.background = color;
    point.style.boxShadow = '0 0 3px '+color;
    divCanvas.appendChild(point)
  }
}
