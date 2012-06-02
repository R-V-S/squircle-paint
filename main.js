
// Load the Visualization API and the piechart package.
//google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.setOnLoadCallback(getYouTubeData);

jQuery(document).ready(function($){
  //cityscape by the water palette: 9ac, ac9, 89a, bce, abd 
  var canvas = $('#canvas');
  var color = '#abd';
  var newCircle = $('<div />').addClass('circle');
  for(var i=3.14;i<4.71;i+=0.3){
    var y = Math.sin(i) * 150 +170;
    var x = Math.cos(i) * 150 +170;
    var h = parseInt(Math.random()*50+200);
    var s = parseInt(Math.random()*50+200);
    var v = parseInt(Math.random()*50+200);
    var point = $('<div />').addClass('point palette-color');
    point.css('left',x+'px');
    point.css('top', y+'px');
    var bg = 'rgb('+h+','+s+','+v+')';
    point.css('background',bg);
    point.click(function(){
      color = $(this).css('background-color');
      console.log(color);
    })
    point.appendTo(newCircle);
  }
  newCircle.appendTo(canvas);
  
  var mouseDown = false;
  canvas.mousedown(function(){
    mouseDown = true;
  })
  canvas.mouseup(function(){
    mouseDown = false;
  })
  canvas.mousemove(function(e){
    if(mouseDown){
      var point = $('<div />').addClass('point');
      point.css('left',e.pageX+'px');
      point.css('top', e.pageY+'px');
      point.css('width',Math.random()*5*5);
      point.css('height',Math.random()*5*5);
      point.css('background',color);
      point.css('boxShadow','0 0 3px '+color);
      point.appendTo(canvas);
    }
  })
  //var circle = $('#circle');
  
})




function getYouTubeData(){
  var chartData = new google.visualization.DataTable();
  chartData.addColumn('string','Title')
  chartData.addColumn('number','View Count');
  chartData.addColumn('number','Likes Count');
  chartData.addColumn('number','Dislikes Count');
  chartData.addColumn('number','Favorite Count');
  
  
  var username = 'wrightstateu';
  var maxResults = 50;
  //var username = 'tfish012';
  var uploadsURL = 'http://gdata.youtube.com/feeds/api/users/'+username+'/uploads?v=2&max-results='+maxResults;
  var uploadsJSON = uploadsURL + '&alt=json';
  var testVid = '';
  jQuery.getJSON(uploadsJSON, function(data){
    jQuery.each(data.feed.entry,function(key,vidData){
        console.log(vidData);
        
        //ACTION: Get raw data from YouTube
        var title = vidData.title.$t;
        var viewCount = vidData.yt$statistics.viewCount;
        if(vidData.yt$rating){
          var likes = vidData.yt$rating.numLikes;
          var dislikes = vidData.yt$rating.numDislikes;
        }
        var favoriteCount = vidData.yt$statistics.favoriteCount;
        
        
        //ACTION: Add data to chart
        chartData.addRows([
            [ title,
              parseInt(viewCount)/10,
              parseInt(likes),
              parseInt(dislikes),
              parseInt(favoriteCount),
            ],
          ]);
      //}) // END: Get single video data
    }) // END: loop through feed entries
    var options = {'title':'VidCount',
                   'width':1200,
                   'height':5000};
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
  }) // END: get JSON data
}

