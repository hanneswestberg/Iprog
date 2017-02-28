//View3Controller Object constructor
var View3Controller = function(view, model, stateCtrl){
	
	/*view.searchDishType.change(function(){
		view.showSearchResults();
	});
	
	view.searchText.change(function(){
		view.showSearchResults();
	});*/
	
	view.searchButton.click(function(){
		view.showSearchResults();
	});
	
	this.showDish = function(dishID){
		stateCtrl.changeView("showDish" + dishID)
	}
	
	return this;
}