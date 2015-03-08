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
 

  $scope.clickGenius = function(buttonName){
    buttonsHandler.pressButton(buttonsHandler.buttons[buttonName]);
  };

  $scope.clickGenius = function(buttonName){
    var button = buttonsHandler.buttons[buttonName];
    $scope.userBreadcrumb.push(button);

    if($scope.breadcrumb[$scope.userBreadcrumb.length -1].name === button.name){
      if($scope.userBreadcrumb.length === $scope.breadcrumb.length){
        //congrats
        $scope.nextGenius();
      }else{
        //helps if user takes too long to make next move
        nextMoveCancelationToken = window.setInterval(function(){
          if($scope.userBreadcrumb.length > 0){
            var nextColor = $scope.breadcrumb[$scope.userBreadcrumb.length];
            blinkButton(nextColor, 2);
         
            
          }
        }, 3000);
      }
    }else{
      console.log('you fool');
      $scope.userBreadcrumb = [];
    }

  };

  $scope.nextGenius = function(){
    var nextGeniusButton = buttonsHandler.getRandomButton();
    $scope.breadcrumb.push(nextGeniusButton);
    $scope.runGenius(0);
  };

  $scope.reset = function(){
    $scope.breadcrumb =[];
    $scope.userBreadcrumb =[];
    $scope.nextGenius();
  };

  $scope.runGenius = function(i){
    var INTERVAL_TIME = 400;

    window.setTimeout(function(){
      if(i <= $scope.breadcrumb.length - 1){
        $scope.runGenius(i + 1);
         var button = $scope.breadcrumb[i];
         button.soundClick.load();
         button.soundClick.play();
         buttonsHandler.lightButton(button);
      }
     
      
    }, INTERVAL_TIME);

  };



   function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});