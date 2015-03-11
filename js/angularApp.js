angular.module('angularApp', [])
.directive('onRepeatRender', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attr){
      if(scope.$last){
          scope.$evalAsync(attr.onRepeatRender);
      }
    }
  };
})
.controller('MainController', function ($scope, $http) {
  var buttonsHandler = new ButtonsHandler();



  $scope.renderButtons = function(){
    buttonsHandler.renderButtons();
  };

  $scope.buttons = buttonsHandler.buttons;
 

  var nextMoveCancelationToken = null;
  $scope.clickGenius = function(buttonName){
    if(nextMoveCancelationToken !== null){
      clearInterval(nextMoveCancelationToken);
    }

    var button = buttonsHandler.buttons[buttonName];
    $scope.userBreadcrumb.push(button);

   

    if($scope.breadcrumb[$scope.userBreadcrumb.length -1].name === button.name){
      buttonsHandler.pressButton(buttonsHandler.buttons[buttonName]);
      button.soundClick.load();
      button.soundClick.play();


      if($scope.userBreadcrumb.length === $scope.breadcrumb.length){
        //congrats
        //clean breadcrumb

        buttonsHandler.playRandomWinSound($scope.userBreadcrumb.length -1);

        buttonsHandler.lightButton($scope.buttons.green.selector, $scope.buttons.green);
        buttonsHandler.lightButton($scope.buttons.red.selector, $scope.buttons.red);
        buttonsHandler.lightButton($scope.buttons.blue.selector, $scope.buttons.blue);
        buttonsHandler.lightButton($scope.buttons.yellow.selector, $scope.buttons.yellow);
        window.setTimeout(function(){
          buttonsHandler.lightButton($scope.buttons.green.selector, $scope.buttons.green);
          buttonsHandler.lightButton($scope.buttons.red.selector, $scope.buttons.red);
          buttonsHandler.lightButton($scope.buttons.blue.selector, $scope.buttons.blue);
          buttonsHandler.lightButton($scope.buttons.yellow.selector, $scope.buttons.yellow);

          $scope.userBreadcrumb = [];
          $("section.breadcrumb div").removeClass("gray");
          window.setTimeout(function(){
            $scope.nextGenius();
          },1000);

        },700);
        

        
        
      }else{
        buttonsHandler.lightButton("#breadcrumb-item-id-" + ($scope.userBreadcrumb.length -1),  button, false, function(){
          $("#breadcrumb-item-id-" + ($scope.userBreadcrumb.length - 1)).addClass("gray");  
        });
        //helps if user takes too long to make next move
        nextMoveCancelationToken = window.setInterval(function(){
          if($scope.userBreadcrumb.length > 0){
            var nextColor = $scope.breadcrumb[$scope.userBreadcrumb.length];
            buttonsHandler.blinkButton(nextColor, 2);
         
            
          }
        }, 1500);
      }
    }else{
      var x = new Audio('sound/sound-error.wav');
      x.load();
      x.play();
      buttonsHandler.wrongMove();
      
      //clean breadcrumb
      $("section.breadcrumb div").removeClass("gray");

      console.log('you fool');
      $scope.userBreadcrumb = [];
    }

  };

  $scope.nextGenius = function(){
    var nextGeniusButton = buttonsHandler.getRandomButton();
    $scope.breadcrumb.push(nextGeniusButton);
    buttonsHandler.addButtonToBreadcrumb(nextGeniusButton, $scope.breadcrumb.length - 1);
    $scope.runGenius(0);
  };

  $scope.reset = function(){
    $("section.breadcrumb").html("");
    $scope.breadcrumb =[];
    $scope.userBreadcrumb =[];
    $scope.nextGenius();
    $scope.userBreadcrumb = [];


  };

  window.setTimeout(function(){$scope.reset();}, 500);

  $scope.runGenius = function(i){
    var INTERVAL_TIME = 400;



    window.setTimeout(function(){
      if(i <= $scope.breadcrumb.length - 1){
        $scope.runGenius(i + 1);
         var button = $scope.breadcrumb[i];
         button.soundClick.load();
         button.soundClick.play();
         buttonsHandler.lightButton(button.selector, button);
         buttonsHandler.lightButton("#breadcrumb-item-id-" +i,  button, false);
      }
     
      
    }, INTERVAL_TIME);

  };



   function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});