var View5 = function (container, model) {
	
	this.backToEditDinnerView5 = container.find("#backToEditDinnerView5");
	this.amountOfPeopleView5 = container.find("#amountOfPeopleView5");
	this.printRecipeButton = container.find("#printRecipeButton");
	this.allChosenDishes = container.find("#allChosenDishes");
	this.totalCost = container.find("#totalCost");


	

	this.update = function(obj){
		this.allChosenDishes.html("");
		
		
		this.amountOfPeopleView5.text('My Dinner: ' + model.getNumberOfGuests() + ' people');
		this.totalCost.html('<p><b>Total:</b><br style="display: block; margin: 2px 0"></p>' + '<p style="color:#b21e1e">' + model.getTotalMenuPrice() + ' SEK</p>');
		
		var allSelectedDishes = model.getFullMenu();
		
		for(var i = 0; i < allSelectedDishes.length; i++){
			this.allChosenDishes.append('<div class="col-sm-2" style="padding:0px; margin:30px; width: 200px">' + '<img src="images/' + allSelectedDishes[i].image + '" alt="' + allSelectedDishes[i].name + '" style="border-style: solid 4px; width:100%; height:100%; margin: 0px">' + '<p style="margin:0px; position:relative; bottom:30px; width:100%; border-style: solid; background-color: rgba(255, 255, 153, 1)">' + allSelectedDishes[i].name + '</p>' + '<p style="position:relative; overflow:hidden;height:60px; color: #b21e1e">' + model.getDishPrice(allSelectedDishes[i].id) + ' SEK</p>' + '</div>');
		}
	}
	
	model.addObserver(this);
	this.update();
	return this;
}

//View3Controller Object constructor
var View5Controller = function(view, model, stateCtrl){
	view.backToEditDinnerView5.click(function(){
		stateCtrl.changeView("previousStep");
	});
	
	view.printRecipeButton.click(function(){
		stateCtrl.changeView("nextStep");
	});
	
	return this;
}