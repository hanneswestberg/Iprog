var View6 = function(container, model) {
	
	this.backToEditDinnerView6 = container.find("#backToEditDinnerView6");
	this.amountOfPeopleView6 = container.find("#amountOfPeopleView6");
	
	this.allChosenDishesView6 = container.find("#allChosenDishesView6");



	this.update = function(obj) {
		this.allChosenDishesView6.html("");
		this.amountOfPeopleView6.text('My Dinner: ' + model.getNumberOfGuests() + ' people');

		var allSelectedDishes = model.getFullMenu();

		for (var i = 0; i < allSelectedDishes.length; i++) {
			this.allChosenDishesView6.append('<div class="row">' +  '<div class="col-sm-2 col-xs-6" style="padding:0px; margin:30px; width: 200px">' + '<img src="images/' + allSelectedDishes[i].image + '" alt="' + allSelectedDishes[i].name + '" style="border-style: solid 4px; width:100%; height:100%; margin: 0px">' + '</div>' + '<div class="col-sm-4 col-xs-6">' + '<h2>' + allSelectedDishes[i].name + '</h2>' + '<p style="margin:0px">' + allSelectedDishes[i].description + '</p>' + '</div>' + '<div class="col-sm-6 col-xs-12">' + '<h3>Preparation</h3>' + '<p>' + allSelectedDishes[i].description + '</p>' + '</div>' + '</div>');
		}
	}

	model.addObserver(this);
	this.update();
	return this;
}

//View6Controller Object constructor
var View6Controller = function(view, model, stateCtrl) {

	view.backToEditDinnerView6.click(function(){
		stateCtrl.changeView("previousStep");
	});
	
	return this;
}