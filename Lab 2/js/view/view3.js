//View3 Object constructor
var View3 = function (container, model) {
	
	this.searchText = container.find("#searchText");
	this.searchDishType = container.find("#searchDishType");
	this.searchButton = container.find("#searchButton");
	this.resultDishes = container.find("#resultDishes");
	
	
	this.showSearchResults = function(){
		this.resultDishes.html("");
		// Here we display a loading icon or spinning circle
		this.resultDishes.html('<img src="images/eatstreet-loading.gif" style="display: block; margin-left:auto; margin-right:auto; padding: 30px">');
		
		model.getAllDishes(searchDishType.value, searchText.value, function(searchResult) {
			// This function is called by the callback
			// Here we stop the spinning circle
			
			var resultString = "";
			for(var i = 0; i < searchResult.results.length; i++) {
				resultString = resultString.concat('<div class="col-sm-2" style="padding:0px; margin:30px; width: 200px; height: 200px">' + '<img src="' +  searchResult.baseUri + searchResult.results[i].image + '" alt="' + 
				searchResult.results[i].title + '" style="border-style: solid 4px; margin: 0px; object-fit:cover; width:100%; height:100%">' + '<button class="btn" onclick="window.view3Controller.showDish(' + 
				searchResult.results[i].id + ')" style="margin:0px; position:relative; bottom:30px; width:200px; border-style: solid; box-shadow: none;">' + '<span style="white-space:pre-line; word-wrap:break-word; word-break:break-all">' + searchResult.results[i].title + '</span>' + '</button>' + '</div>');
			}
			
			$("#resultDishes").html(resultString);
			
		}, function(errorData) {
			// This one calls if an error occured
			// Show text displaying the error
			$("#resultDishes").html('<div class="col-sm-12"><h1>ERROR LOADING DISHES</h1></div>');
		});
		
		
		//var allSelectedDishes = model.getAllDishes(searchDishType.value, searchText.value);
	}
	
	
	
	// The update function, when the model is changed -> this function will execute
	this.update = function(obj){
		//this.showSearchResults();
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	this.update();
}