var ButtonsHandler = function(){
  var SHADOW_SIZE = 9;
  var BUTTON_PRESS_SIZE = 4;

  var buttons = {
    "green": {
      "name": "green",
      "borderRadiusSelector": "border-top-left-radius",
      "selector":".button.button-green",
      "color": [0,255,0],
      "currentColor": [0,255,0]
    },
    "yellow": {
      "name": "yellow",
      "borderRadiusSelector": "border-top-right-radius",
      "selector":".button.button-yellow",
      "color": [0,255,255],
      "currentColor": [0,255,255]
    },
    "red": {
      "name": "red",
      "borderRadiusSelector": "border-bottom-left-radius",
      "selector":".button.button-red",
      "color": [255,0,0],
      "currentColor": [255,0,0]
    },
    "blue": {
      "name": "blue",
      "borderRadiusSelector": "border-bottom-right-radius",
      "selector":".button.button-blue",
      "color": [0,0,255],
      "currentColor": [0,0,255]
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
    var lightColor = changeColor(button.color,[100,100,100]);
    var buttonOriginalColor = changeColor(button.color,[0,0,0])
    var shadowColor = changeColor(button.color, [-100, -100, -100]);

    //set light
    $(button.selector).css("background-color", lightColor);
    $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE  + "px 0px " + lightColor);

    //remove light
    window.setTimeout(function(){
      $(button.selector).css("background-color", buttonOriginalColor);
      $(button.selector).css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + lightColor);
    },300)
  };

  var pressButton = function(button){
    var buttonOriginalColor = changeColor(button.color,[0,0,0])
    var buttonOriginalPosition = $(button.selector).position();
    var lightColor = changeColor(button.color,[100,100,100]);
    var shadowColor = changeColor(button.color, [-100, -100, -100]);

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
    },300)
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
    pressButton: pressButton,
    renderButtons: renderButtons
  };

};