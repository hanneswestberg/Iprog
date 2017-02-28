var View6 = function(container, model) {
	
	this.backToEditDinnerView6 = container.find("#backToEditDinnerView6");
	this.amountOfPeopleView6 = container.find("#amountOfPeopleView6");
	
	this.allChosenDishesView6 = container.find("#allChosenDishesView6");



	this.update = function(obj) {
		this.allChosenDishesView6.html("");
		this.amountOfPeopleView6.text('My Dinner: ' + model.getNumberOfGuests() + ' people');

		var fullMenu = model.getFullMenu();

		for (var i = 0; i < fullMenu.length; i++) {
			this.allChosenDishesView6.append('<div class="row">' +  '<div class="col-sm-2 col-xs-6" style="padding:0px; margin:30px; width: 200px">' + '<img src="' + fullMenu[i].image + '" alt="' + fullMenu[i].title + '" style="border-style: solid 4px; width:100%; height:100%; margin: 0px">' + '</div>' + '<div class="col-sm-4 col-xs-6">' + '<h2>' + fullMenu[i].title + '</h2>' + '<p style="margin:0px">' + fullMenu[i].creditText + '</p>' + '</div>' + '<div class="col-sm-6 col-xs-12">' + '<h3>Preparation</h3>' + '<p>' + fullMenu[i].instructions + '</p>' + '</div>' + '</div>');
		}
	}

	model.addObserver(this);
	this.update();
	return this;
}