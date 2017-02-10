//View2 Object constructor
var View2 = function (container, model) {
	
	this.numberOfGuests = container.find("#numberOfGuests");
	this.totalCost = container.find("#totalCost");
  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");
	this.confirmDinnerButton = container.find("#confirmDinnerButton");
	this.dinnerMenuList = container.find("#dinnerMenuList");
	this.totalCost = container.find("#totalCost");
	
	this.update = function(obj){
		this.numberOfGuests.text(model.getNumberOfGuests());
		
		if(model.getFullMenu().length == 0){
			this.dinnerMenuList.html('<div class="row">' + '<div class="col-sm-6">' + '<p>Pending</p>' + '</div>' + '<div class="col-sm-6">' + '<p>0.00</p>' + '</div>' + '</div>');
		}else{
			this.dinnerMenuList.html("");
			
			for(var i = 0; i < model.getFullMenu().length; i++){
				var totalIngredientsCost = 0;
				for(var j = 0; j < model.getFullMenu()[i].ingredients.length; j++){
					totalIngredientsCost += (model.getNumberOfGuests() * model.getFullMenu()[i].ingredients[j].price);
				}
				
				this.dinnerMenuList.append('<div class="row">' + '<div class="col-sm-6">' + '<p>' + model.getFullMenu()[i].name + '</p>' + '</div>' + '<div class="col-sm-6">' + '<p>' + totalIngredientsCost + '</p>' + '</div>' + '</div>');
			}
			
			this.totalCost.text(model.getTotalMenuPrice());
		}
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	this.update();
	return this;
}

//View2Controller Object constructor
var View2Controller = function(view, model, stateCtrl){
	
	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});
	
	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});
	
	view.confirmDinnerButton.click(function(){
		stateCtrl.changeView("nextStep");
	});
	
	return this;
}
 
