// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  
  	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	var numOfGuests = 0;
	var dinnerMenu = [];
	
	// Stores the latest search results in a temporary array, so we easily can get info without doing additional API requests
	var storedSearchResults = {};
	var storedDishIngredients = {};

	this.setNumberOfGuests = function(num) {
		numOfGuests = (num < 0) ? numOfGuests : num;
	}

	this.getNumberOfGuests = function() {
		return numOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		for(var i = 0; i < dinnerMenu.length; i++){
			if(dinnerMenu[i].type == type)
				return dinnerMenu[i];
		}
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return dinnerMenu;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var allIngredients = [];
		for(var d = 0; d < dinnerMenu.length; d++){
			for(var i = 0; i < dinnerMenu[d].extendedIngredients.length; i++){
				for(var j = 0; j < allIngredients.length; j++){
					if(dinnerMenu[d].extendedIngredients[i].id == allIngredients[j].id)
						allIngredients[j].amount += (dinnerMenu[d].extendedIngredients[i].amount * numOfGuests);
					else {
						var newIngredient = dinnerMenu[d].extendedIngredients[i];
						newIngredient.amount = (newIngredient.amount * numOfGuests);
						allIngredients.push(newIngredient);
					}
				}
			}
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totalPrice = 0;
		for(var d = 0; d < dinnerMenu.length; d++){
			totalPrice += this.getDishPrice(dinnerMenu[d].id);
		}
		return totalPrice.toFixed(2);
	}

	this.getDishPrice = function(id){
		var dishPrice = 0;
		var dish = storedDishIngredients[id];
		for(var i = 0; i < dish.extendedIngredients.length; i++){
			dishPrice += (dish.extendedIngredients[i].amount * numOfGuests);
		}
		return dishPrice;
	}


	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for(var i = 0; i < dinnerMenu.length; i++){
			if(dinnerMenu[i].id == id)
				dinnerMenu.splice(i, 1);
		}
	}
	
	this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
  get: {
    headers: {
      'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
	});
	
	this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
  get: {
    headers: {
       'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
});
	

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function(type, filter, callback, callbackError) {	
	//url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
	$.ajax( {
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true&limitLicense=false&number=10&offset=0&query=' + filter + '&type=' + type,
		headers: {
			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		},
		success: function(data) {
			//storedSearchResults = data;
			callback(data);
			console.log(data);
		},
		error: function(data) {
			callbackError(data);
			console.log(data);
		}
 	}) 
	}

	//function that returns a dish of specific ID
	this.getDish = function(id, callback, callbackError) {
	$.ajax( {
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information?includeNutrition=false',
		headers: {
			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		},
		success: function(data) {
			storedDishIngredients[data.id] = data;
			callback(data);
			console.log(data);
		},
		error: function(data) {
			callbackError(data);
			console.log(data);
		}
 	}) 
	}
	
	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		dinnerMenu.push(storedDishIngredients[id]);
	}


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});