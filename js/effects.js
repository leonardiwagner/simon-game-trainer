var ButtonsHandler = function(){
  var SHADOW_SIZE = 9;
  var BUTTON_PRESS_SIZE = 4;
  var BUTTON_PRESS_TIME = 100;
  var BUTTON_LIGHT_TIME = 300;

  var buttons = {
    "green": {
      "name": "green",
      "borderRadiusSelector": "border-top-left-radius",
      "selector":".button.button-green",
      "color": [0,150,0],
      "currentColor": [0,255,0],
      "soundClick": new Audio('sound-green.wav')
    },
    "yellow": {
      "name": "yellow",
      "borderRadiusSelector": "border-top-right-radius",
      "selector":".button.button-yellow",
      "color": [200,200,0],
      "currentColor": [0,255,255],
      "soundClick": new Audio('sound-yellow.wav')
    },
    "red": {
      "name": "red",
      "borderRadiusSelector": "border-bottom-left-radius",
      "selector":".button.button-red",
      "color": [255,0,0],
      "currentColor": [255,0,0],
      "soundClick": new Audio('sound-red.wav')
    },
    "blue": {
      "name": "blue",
      "borderRadiusSelector": "border-bottom-right-radius",
      "selector":".button.button-blue",
      "color": [0,0,180],
      "currentColor": [0,0,255],
      "soundClick": new Audio('sound-blue.wav')
    }
  };

  var renderButtons = function(){
    var soundClick = new Audio('sound-click.wav');

    _.each(buttons, function(button){
      //set color and radius
      var buttonOriginalColor = changeColor(button.color,[0,0,0])
      $(button.selector).css("background-color", buttonOriginalColor);
      $(button.selector).css(button.borderRadiusSelector, "30%");

      //set shadow and border
      var shadowColor = changeColor(button.color, [-100, -100, -100]);
      $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
      $(button.selector).css("border", "1px solid " + shadowColor);     
    });
  };

  var lightButton = function(button){
    var lightColor = changeColor(button.color,[50,50,50]);
    var buttonOriginalColor = changeColor(button.color,[0,0,0])
    var shadowColor = changeColor(button.color, [-50, -50, -50]);

    //set light
    $(button.selector).css("background-color", lightColor);
    $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE  + "px 0px " + lightColor);

    //remove light
    window.setTimeout(function(){
      $(button.selector).css("background-color", buttonOriginalColor);
      $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
    },BUTTON_LIGHT_TIME)
  };

  var pressButton = function(button){
    var buttonOriginalColor = changeColor(button.color,[0,0,0])
    var buttonOriginalPosition = $(button.selector).position();
    var lightColor = changeColor(button.color,[150,150,150]);
    var shadowColor = changeColor(button.color, [-150, -150, -150]);

    //set button press effect
    $(button.selector).css("top", (buttonOriginalPosition.top + BUTTON_PRESS_SIZE) + "px");
    $(button.selector).css("box-shadow", "0px " + (SHADOW_SIZE - BUTTON_PRESS_SIZE) + "px 0px " + shadowColor);

    //set light
    $(button.selector).css("background-color", lightColor);
    $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE  + "px 0px " + lightColor);

    //remove button press effect
    window.setTimeout(function(){
      $(button.selector).css("background-color", buttonOriginalColor);
      $(button.selector).css("top", buttonOriginalPosition.top + "px");
      $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
    },BUTTON_PRESS_TIME)
  };

  var getRandomButton = function(){
    var max = 4;
    var min = 1;
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if(randomNumber == 1) return buttons["green"];
    if(randomNumber == 2) return buttons["yellow"];
    if(randomNumber == 3) return buttons["red"];
    return buttons["blue"];

  };

  var changeColor = function(original, change){
    function sumColor(o, c){
      var result = o + c;
      if(result > 255) return 255;
      if(result < 0) return 0;
      return result;
    }

    return "rgb(" + 
            sumColor(original[0], change[0]) + "," +
            sumColor(original[1], change[1]) + "," +
            sumColor(original[2], change[2]) + ")";
  };

  return{
    buttons: buttons,
    renderButtons: renderButtons,
    pressButton: pressButton,
    lightButton: lightButton,
    getRandomButton: getRandomButton
  };

};