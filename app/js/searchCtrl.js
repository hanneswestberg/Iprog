// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.isSearching = false;
  $scope.search = function(query,type) {
    $scope.isSearching = true;
    $scope.status = "Searching...";
    Dinner.DishSearch.get({query:query,type:type},function(data){
      $scope.isSearching = false;
      $scope.dishes=data.results;
      $scope.status = "Showing " + data.results.length + " results";
  },function(data){
      $scope.isSearching = false;
      $scope.status = "There was an error";
  });
  }
  // The data for the options
  $scope.options = ["Main course", "Dessert", "Appetizer"];
  // The selected option
  $scope.selectedOption = $scope.options[0];
  
  /*<option selected="selected" value="main course">Main course</option>                  
  <option value="side dish">Side dish</option>
  <option value="dessert">Dessert</option>
  <option value="appetizer">Appetizer</option>
  <option value="salad">Salad</option>
  <option value="bread">Bread</option>
  <option value="breakfast">Breakfast</option>
  <option value="soup">Soup</option>
  <option value="beverage">Beverage</option>
  <option value="sauce">Sauce</option>
  <option value="drink">Drink</option>*/
});