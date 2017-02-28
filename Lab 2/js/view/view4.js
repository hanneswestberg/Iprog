var View4 = function (container, model) {
	
	this.chosenDish = container.find("#chosenDish");
	this.imageOfDish = container.find("#imageOfDish");
	this.descriptionOfDish = container.find("#descriptionOfDish");
	this.amountOfPeopleForDish = container.find("#amountOfPeopleForDish");
	this.instructionsForDish = container.find("#instructionsForDish");
	this.chosenDishIngredients = container.find("#chosenDishIngredients");
	this.totalIngredientsCost = container.find("#totalIngredientsCost");
  this.backToDishes = container.find("#backToDishes");
  this.confirmDishButton = container.find("#confirmDishButton");
	
	var selectedDishID = 1;
	var selectedDishObject = {};
	
	this.setSelectedDish = function(dishID){
		selectedDishID = dishID;
		selectedDishObject = {};
	}
	
	this.getSelectedDish = function(dishID){
		return selectedDishID;
	}
	
	this.getDishInfo = function(){
		// Display spinning circle
		this.imageOfDish.html('<img src="images/eatstreet-loading.gif" style="display: block margin-left:auto; margin-right:auto">');
		model.getDish(selectedDishID, function(dishResult) {
		// Hide spinning circle
		selectedDishObject = dishResult;
		$("#chosenDish").text(dishResult.title);
		$("#imageOfDish").html('<img src="' + dishResult.image + '" style="width:50%; height:50%; margin: 0px;">');
		$("#descriptionOfDish").text(dishResult.creditText);
		$("#instructionsForDish").html(dishResult.instructions);


		$("#amountOfPeopleForDish").text("Ingredients for " + model.getNumberOfGuests() + " people");

		var ingredientsString = "";
		for(var i = 0; i < dishResult.extendedIngredients.length; i++){
			ingredientsString = ingredientsString.concat('<div class="row">' + '<div class="col-sm-3 col-xs-3" style="padding: 0px 0px 0px 10%">' + (dishResult.extendedIngredients[i].amount * model.getNumberOfGuests()).toFixed(2) + 
			' ' + dishResult.extendedIngredients[i].unit + '</div>' + '<div class="col-sm-3 col-xs-3">' +  dishResult.extendedIngredients[i].name + '</div>' + '<div class="col-sm-3 col-xs-3" style="text-align: right">SEK</div>' + 
			'<div class="col-sm-3 col-xs-3">' + (model.getNumberOfGuests() * dishResult.extendedIngredients[i].amount).toFixed(2) + '</div>' + '</div>');
		}
			$("#chosenDishIngredients").html(ingredientsString);
		
			$("#totalIngredientsCost").text(model.getDishPrice(selectedDishID));
			
		}, function(errorData) {
			$("#resultDishes").html('<div class="col-sm-12"><h1>ERROR LOADING DISHES</h1></div>');
		});
	}
	
	// The update function, when the model is changed -> this function will execute
	this.update = function(obj){
		// First we clear everything
		this.amountOfPeopleForDish.text("");
		this.chosenDishIngredients.html("");
		this.chosenDish.text("");
		this.imageOfDish.html("");
		this.descriptionOfDish.text("");
		this.instructionsForDish.text("");
		this.totalIngredientsCost.text("");
		
		if(Object.keys(selectedDishObject).length === 0 && selectedDishObject.constructor === Object){
			this.getDishInfo();
		} else {
		this.chosenDish.text(selectedDishObject.title);
		this.imageOfDish.html('<img src="' + selectedDishObject.image + '" style="width:50%; height:50%; margin: 0px;">');
		this.descriptionOfDish.text(selectedDishObject.creditText);
		this.instructionsForDish.html(selectedDishObject.instructions);
		this.amountOfPeopleForDish.text("Ingredients for " + model.getNumberOfGuests() + " people");

		var ingredientsString = "";
		for(var i = 0; i < selectedDishObject.extendedIngredients.length; i++){
			ingredientsString = ingredientsString.concat('<div class="row">' + '<div class="col-sm-3 col-xs-3" style="padding: 0px 0px 0px 10%">' + (selectedDishObject.extendedIngredients[i].amount * model.getNumberOfGuests()) + 
			' ' + selectedDishObject.extendedIngredients[i].unit + '</div>' + '<div class="col-sm-3 col-xs-3">' +  selectedDishObject.extendedIngredients[i].name + '</div>' + '<div class="col-sm-3 col-xs-3" style="text-align: right">SEK</div>' + 
			'<div class="col-sm-3 col-xs-3">' + (model.getNumberOfGuests() * selectedDishObject.extendedIngredients[i].amount) + '</div>' + '</div>');
		}
			this.chosenDishIngredients.html(ingredientsString);
			this.totalIngredientsCost.text(model.getDishPrice(selectedDishID));
		}
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	//this.update();
	return this;
}