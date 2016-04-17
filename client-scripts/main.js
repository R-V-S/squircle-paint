(function() {
  'use strict'

  //cityscape by the water palette: 9ac, ac9, 89a, bce, abd
  const Color = {
    init: function(colorValue) {
      this.element = document.createElement('div');
      this.element.className = 'palette-color';
      this.element.onclick = function(e) {
        color = e.target.style.backgroundColor;
      }
      if (colorValue) {
        this.setColor(colorValue);
      } else {
        this.colorValue = '#abd';
      }
    },
    setColor: function(colorValue) {
      this.colorValue = colorValue;
      console.log(colorValue);
      this.element.style.backgroundColor = colorValue;
    },
    setMeta: function(meta) {
      this.meta = meta;
    },
    // createRandom( { baseValues: Array, ranges: Array, colorMode: String } )
    createRandom: function(args) {
      // colorMode should be either rgb or hsl
      if (args.colorMode.toLowerCase() !== 'rgb' && args.colorMode.toLowerCase() !== 'hsl') {
        console.error('SquirclePaint.Color.createRandom: Invalid colorMode of '+args.colorMode+' given. Should be string that equals either \'rgb\' or \'hsl\'.')
        return false;
      }
      // args.baseValues and args.ranges are expected to be arrays with 3 items, which
      // allows for random colors to be pre-biased. If single values are returned,
      // convert them into arrays.
      if ( !Array.isArray(args.baseValues) ) {
        args.baseValues = [args.baseValues, args.baseValues, args.baseValues];
      }
      if ( !Array.isArray(args.ranges) ) {
        args.ranges = [args.ranges, args.ranges, args.ranges];
      }
      // channelValues are either [h, s, v] or [r, g, b] depending on colorMode
      var channelValues = []
      for (var i=0; i<3; i++) {
        channelValues[i] = parseInt(args.baseValues[i] + Math.random() * args.ranges[i]);
      }
      var newColorValue;
      switch (args.colorMode) {
        case 'rgb':
          newColorValue = args.colorMode + '(' + channelValues[0] + ',' + channelValues[1] + ',' + channelValues[2] + ')';
          break;
        case 'hsl':
          newColorValue = args.colorMode + '(' + channelValues[0] + ',' + channelValues[1] + '%,' + channelValues[2] + '%)';
          break;
      }

      this.setColor(newColorValue)
    }
  }

  var Palette = {
    init: function() {
      this.columns = [];
      this.swatches = [];
      this.element = document.createElement('div');
      this.element.className = 'palette';
    },
    appendTo: function(id) {
      var parent = document.getElementById(id);
      if (parent) {
        parent.appendChild(this.element);
      } else {
        console.error('SquirclePaint.Palette.appendTo: parent element with ID of '+id+' not found.');
        return false;
      }
    },
    clear: function() {
      this.columns = [];
      this.swatches = [];
      while (this.element.lastChild) {
        this.element.removeChild(lastChild);
      }
    },
    createRandom: function(args) {
      this.clear();
      if (typeof args !== 'object') {
        args = {};
      }
      if (!args.columns) {
        args.columns = 5;
      }
      if (!args.baseValues) {
        args.baseValues = [100,50,50];
      }
      if (!args.ranges) {
        args.ranges = [100,50,50];
      }
      for (var i = 0; i < args.columns; i++) {
        var column = [];
        var swatchesInThisColumn = parseInt( Math.random() * 8 );
        for (var j = 0; j < swatchesInThisColumn; j++) {
          var swatch = Object.create(Color);
          swatch.init();
          swatch.createRandom({
            'colorMode': 'hsl',
            'baseValues': args.baseValues,
            'ranges': args.ranges
          });
          console.log(swatch);
          swatch.setMeta( {'column': j} );
          this.swatches.push(swatch);
          column.push(swatch);
        }
        this.columns.push(column);
      }
      this.render();
    },
    render: function() {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < this.columns.length; i++) {
        var columnElement = document.createElement('div');
        columnElement.className = 'palette-column';
        for (var j = 0; j < this.columns[i].length; j++) {
          var swatchElement = this.columns[i][j].element;
          console.log(swatchElement);
          columnElement.appendChild(swatchElement);
        }
        console.log(columnElement);
        fragment.appendChild(columnElement);
      }
      console.log(fragment);
      this.element.appendChild(fragment);
    }
  }

  var palette = Object.create(Palette);
  palette.init();
  palette.createRandom();
  palette.appendTo('div-canvas')

  /*
  var divCanvas = document.getElementById('div-canvas');
  var color = '#abd';
  divCanvas.appendChild(palette);
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
  */
})()
