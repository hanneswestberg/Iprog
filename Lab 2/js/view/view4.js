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
	
	this.setSelectedDish = function(dishID){
		selectedDishID = dishID;
	}
	
	this.getSelectedDish = function(dishID){
		return selectedDishID;
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
		
		this.chosenDish.text(model.getDish(selectedDishID).name);
		this.imageOfDish.html('<img src="images/' + model.getDish(selectedDishID).image + '" style="width:50%; height:50%; margin: 0px;">');
		this.descriptionOfDish.text(model.getDish(selectedDishID).description);
		this.instructionsForDish.text(model.getDish(selectedDishID).description);
		
		
		this.amountOfPeopleForDish.text("Ingredients for " + model.getNumberOfGuests() + " people");
		
		for(var i = 0; i < model.getDish(selectedDishID).ingredients.length; i++){
			this.chosenDishIngredients.append('<div class="row">' + '<div class="col-sm-3 col-xs-3" style="padding: 0px 0px 0px 10%">' + (model.getDish(selectedDishID).ingredients[i].quantity * model.getNumberOfGuests()) + ' ' + model.getDish(selectedDishID).ingredients[i].unit + '</div>' + '<div class="col-sm-3 col-xs-3">' + model.getDish(selectedDishID).ingredients[i].name + '</div>' + '<div class="col-sm-3 col-xs-3" style="text-align: right">SEK</div>' + '<div class="col-sm-3 col-xs-3">' + (model.getNumberOfGuests() * model.getDish(selectedDishID).ingredients[i].price) + '</div>' + '</div>');
		}
		
		this.totalIngredientsCost.text(model.getDishPrice(selectedDishID));
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	this.update();
	return this;
}

//View4Controller Object constructor
var View4Controller = function(view, model, stateCtrl){
  view.backToDishes.click(function(){
		stateCtrl.changeView("previousStep");
  });
  
  view.confirmDishButton.click(function(){
		stateCtrl.changeView("previousStep");
		model.addDishToMenu(view.getSelectedDish());
		
  });
	return this;
}