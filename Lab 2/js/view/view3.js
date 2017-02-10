//View3 Object constructor
var View3 = function (container, model) {
	
	this.searchText = container.find("#searchText");
	this.searchDishType = container.find("#searchDishType");
	this.searchButton = container.find("#searchButton");
	this.resultDishes = container.find("#resultDishes");
	
	
	this.showSearchResults = function(){
		var allSelectedDishes = model.getAllDishes(searchDishType.value, searchText.value);
	
		this.resultDishes.html("");
		
		for(var i = 0; i < allSelectedDishes.length; i++){
			this.resultDishes.append('<div class="col-sm-2" style="padding:0px; margin:30px; width: 200px">' + '<img src="images/' + allSelectedDishes[i].image + '" alt="' + allSelectedDishes[i].name + '" style="border-style: solid 4px; width:100%; height:100%; margin: 0px">' + '<button class="btn" onclick="window.view3Controller.showDish(' + allSelectedDishes[i].id + ')" style="margin:0px; position:relative; bottom:30px; width:100%; border-style: solid; box-shadow: none;">' + '<span>' + allSelectedDishes[i].name + '</span>' + '</button>' + '<p style="position:relative; overflow:hidden;height:60px">' + allSelectedDishes[i].description + '</p>' + '</div>');
		}
		
		//because html sequentially generates it's elements, the retrieval of the button elements for the dishes has to be called after the buttons have been created
		this.testing = container.find("#testing");
	}
	
	
	
	// The update function, when the model is changed -> this function will execute
	this.update = function(obj){
		this.showSearchResults();
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	this.update();
}


//View3Controller Object constructor
var View3Controller = function(view, model, stateCtrl){
	
	view.searchDishType.change(function(){
		view.showSearchResults();
	});
	
	view.searchText.change(function(){
		view.showSearchResults();
	});
	
	view.searchButton.click(function(){
		view.showSearchResults();
	});
	
	this.showDish = function(dishID){
		stateCtrl.changeView("showDish" + dishID)
	}
	
	return this;
}
 
