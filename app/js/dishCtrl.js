// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.isSearching = false;
  $scope.getDish = function(){
    if($scope.dish === undefined && $scope.isSearching === false){
      $scope.isSearching = true;
      $scope.status = "Searching...";
      Dinner.Dish.get({id:$routeParams.dishId},function(data){
        $scope.dish = data;
        $scope.ingredients = data.extendedIngredients;
        $scope.status = "Found dish";
        $scope.isSearching = false;
      },function(data){
        $scope.isSearching = false;
        $scope.status = "There was an error";
      });
    }
  }
});