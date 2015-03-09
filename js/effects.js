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
      "soundClick": new Audio('sound/sound-green.wav')
    },
    "yellow": {
      "name": "yellow",
      "borderRadiusSelector": "border-top-right-radius",
      "selector":".button.button-yellow",
      "color": [200,200,0],
      "currentColor": [0,255,255],
      "soundClick": new Audio('sound/sound-yellow.wav')
    },
    "red": {
      "name": "red",
      "borderRadiusSelector": "border-bottom-left-radius",
      "selector":".button.button-red",
      "color": [255,0,0],
      "currentColor": [255,0,0],
      "soundClick": new Audio('sound/sound-red.wav')
    },
    "blue": {
      "name": "blue",
      "borderRadiusSelector": "border-bottom-right-radius",
      "selector":".button.button-blue",
      "color": [0,0,180],
      "currentColor": [0,0,255],
      "soundClick": new Audio('sound/sound-blue.wav')
    }
  };

  var renderButtons = function(){
    var soundClick = new Audio('sound/sound-click.wav');

    _.each(buttons, function(button){
      setItemColor($(button.selector), button, true);
    });
  };

  var setItemColor = function(element, button, changeBorder){
    //set color and radius
    var buttonOriginalColor = changeColor(button.color,[0,0,0]);
    element.css("background-color", buttonOriginalColor);
    if(changeBorder){
      //set shadow and border
      element.css(button.borderRadiusSelector, "30%");
      var shadowColor = changeColor(button.color, [-100, -100, -100]);
      element.css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
      element.css("-moz-box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
      element.css("-webkit-box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
      element.css("border", "1px solid " + shadowColor);
    }


  };



  var lightButton = function(selector, button, changeBorder, callback){
    if(changeBorder === undefined) changeBorder = true;
    var lightColor = changeColor(button.color,[50,50,50]);
    var buttonOriginalColor = changeColor(button.color,[0,0,0]);
    var shadowColor = changeColor(button.color, [-50, -50, -50]);

    //set light
    $(selector).css("background-color", lightColor);

    if(changeBorder){
      $(selector).css("box-shadow", "0px " + SHADOW_SIZE  + "px 0px " + lightColor);
    }

    //remove light
    window.setTimeout(function(){
      $(selector).css("background-color", buttonOriginalColor);

      if(changeBorder){
        $(selector).css("box-shadow", "0px " + SHADOW_SIZE + "px 0px " + shadowColor);
      }

      if(callback !== undefined) callback();
    },BUTTON_LIGHT_TIME);
  };

  var pressButton = function(button){
    var buttonOriginalColor = changeColor(button.color,[0,0,0]);
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
    },BUTTON_PRESS_TIME);
  };

  var getRandomButton = function(){
    var max = 4;
    var min = 1;
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if(randomNumber == 1) return buttons.green;
    if(randomNumber == 2) return buttons.yellow;
    if(randomNumber == 3) return buttons.red;
    return buttons.blue;

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

  var addButtonToBreadcrumb = function(button, index){
    $("section.breadcrumb").append("<div id='breadcrumb-item-id-" + index + "'></div>");
    var breadcrumbButton = $("#breadcrumb-item-id-" + index);

    setItemColor(breadcrumbButton, button, false);

    $(breadcrumbButton).addClass("btn");
    $(breadcrumbButton).addClass("btn-default");
  };

  var wrongMove = function(loopIndex){
    if(loopIndex === undefined) loopIndex = 0;
    if(loopIndex == 4) return;

    window.setTimeout(function(){
      if(loopIndex % 2 === 0){
        $("section.buttons-container").css("margin-left", "2px");
      }else{
        $("section.buttons-container").css("margin-left", "-2px");
      }

      window.setTimeout(function(){
        $("section.buttons-container").css("margin-left", "0px");
      }, 50);

      wrongMove(loopIndex + 1);
    }, 100);
    
  };

   var blinkButton = function(button, times){
    if(times === 0) return;

    window.setTimeout(function(){
      lightButton(".button.button-" + button.name, button);
      blinkButton(button, times -1);


    }, 500);
  };

  return{
    buttons: buttons,
    renderButtons: renderButtons,
    pressButton: pressButton,
    lightButton: lightButton,
    getRandomButton: getRandomButton,
    addButtonToBreadcrumb: addButtonToBreadcrumb,
    wrongMove: wrongMove,
    blinkButton: blinkButton
  };

};