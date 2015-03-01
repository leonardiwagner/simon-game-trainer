var ButtonsHandler = function(){
  var buttons = [
     {
      "name": "green",
      "selector":".button.button-green",
      "color": [0,255,0],
      "originalColor": [0,255,0]
    },
     {
      "name": "yellow",
      "selector":".button.button-yellow",
      "color": [0,255,255],
      "originalColor": [0,255,255]
    },
     {
      "name": "red",
      "selector":".button.button-red",
      "color": [255,0,0],
      "originalColor": [255,0,0]
    },
     {
      "name": "blue",
      "selector":".button.button-blue",
      "color": [0,0,255],
      "originalColor": [0,0,255]
    }
  ];

/*
  var pressButton = function(color, times){
      times = typeof times!== 'undefined' ? times : 0;
      if(times === 0) return;

      var button = $(".button.button-" + color);

      window.setTimeout(function(){
        button.addClass("on");

        window.setTimeout(function(){
          button.removeClass("on");
          blinkButton(color, times -1);
        }, 100);

      }, 500);
    };
*/

  var that = this;
  var button;
  this.originalColor = [255,0, 0];
  this.color = [255,0, 0];

  var handleButtonEffects = function(buttona){
    button = buttona;
    $.fn.pressButton = pressButton;
  };

  var pressButton = function(buttona){
    button = buttona;
    turnBright(function(){
      
    });
  };

  var turnBright = function(callback){
    changeColor(0, 180, 180);
    window.setTimeout(function(){
      turnOff();
    },200);
  };

  var turnOff = function(){
    window.setTimeout(function(){
      if(that.color[1] > that.originalColor[1]){
        changeColor(0, -10, -10);
        turnOff();
      }
    },100);
  };

  var changeColor = function(r, g, b){
    that.color[0] += r;
    that.color[1] += g;
    that.color[2] += b;
    button.css("background-color","rgb(" + that.color[0] + "," + that.color[1] + "," + that.color[2] + ")");
  };

  return{
    buttons: buttons,
    pressButton: pressButton
  };

};