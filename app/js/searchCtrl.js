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
});