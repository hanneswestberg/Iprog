// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  
  	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	var numOfGuests = ($cookieStore.get('numOfGuests') === undefined) ? 0 : $cookieStore.get('numOfGuests');
	var dinnerMenu = ($cookieStore.get('dinnerMenu') === undefined) ? [] : $cookieStore.get('dinnerMenu');
	
	// Stores the latest search results in a temporary array, so we easily can get info without doing additional API requests
	var sessionStoredSearchResults = {};
	var sessionStoredDishes = {};
	
	// A dictionary storing the dishes we are currently searching for
	var currentlySearchingCallbacks = {};

	this.setNumberOfGuests = function(num) {
		numOfGuests = (num < 0) ? numOfGuests : num;
		$cookieStore.put('numOfGuests', numOfGuests);
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

	//Returns all the dishes on the menu as objects
	this.getFullMenu = function() {
		// We check for duplicates
		dinnerMenu = dinnerMenu.filter(function(item, pos){
			return dinnerMenu.indexOf(item) == pos;
		})
		
		var dinnerMenuObjects = [];
		for(var i = 0; i < dinnerMenu.length; i++){
			this.getDish(dinnerMenu[i], function(data){
				dinnerMenuObjects.push(data);
			}, function(data){});
		}
		return dinnerMenuObjects;
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
			totalPrice += Number(this.getDishPrice(dinnerMenu[d]));
		}
		return totalPrice.toFixed(2);
	}
	
	this.getDishPrice = function(dishId){
		var dishPrice = 0;
		this.getDish(dishId, function(data){
			for(var i = 0; i < data.extendedIngredients.length; i++){
				dishPrice += (data.extendedIngredients[i].amount * numOfGuests);
			}
		}, function(data){
			dishPrice = NaN;
		});
			
		return dishPrice.toFixed(2);
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for(var i = 0; i < dinnerMenu.length; i++){
			if(dinnerMenu[i] == id)
				dinnerMenu.splice(i, 1);
		}
	}
	
	// This function takes a dish ID and returns the dish info. Before making a request call to the API it checks if we have downloaded the info in the current session
	this.getDish = function(dishId, cbSuccess, cbError){
		// First we check if we already have stored info about this dish
		if(dishId in sessionStoredDishes) {
			cbSuccess(sessionStoredDishes[dishId]);
		// Else we get the information from the API and store it
		} else {
			// If we are currently searching for the dish, we must add this to the callback
			if(dishId in currentlySearchingCallbacks) {
				currentlySearchingCallbacks[dishId][0].push(cbSuccess);
				currentlySearchingCallbacks[dishId][1].push(cbError);
			// Else we make a new search
			} else {
				// First index is success, second is error
				currentlySearchingCallbacks[dishId] = [ [cbSuccess], [cbError] ]; 
				// Here we make the call
				this.apiGetDish.get({id:dishId}, function(data){
					// We store the data
					sessionStoredDishes[dishId] = data;
					// We make our calls
					for(var i = 0; i < currentlySearchingCallbacks[dishId][0].length; i++){
						currentlySearchingCallbacks[dishId][0][i](data);
					}
					// We remove this dish in the callback array
					currentlySearchingCallbacks.splice(dishId, 1);
      }, function(data){
        	// We make our calls
					for(var i = 0; i < currentlySearchingCallbacks[dishId][1].length; i++){
						currentlySearchingCallbacks[dishId][1][i](data);
					}
					// We remove this dish in the callback array
					currentlySearchingCallbacks.splice(dishId, 1);
      });
			}
		}
	}
	
	this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
		get: {
			headers: {
				'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			}
		}
	});
	
	this.apiGetDish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
		get: {
			headers: {
				 'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
			}
		}
	});
	
	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		// First we find the dish we added
		var addedDish = {};
		this.getDish(id, function(data){
			addedDish = data;
		}, function(data){});
		// We loop through our added dishes
		for(var i = 0; i < dinnerMenu.length; i++){
			var compDish = {};
			this.getDish(dinnerMenu[i], function(data){
				compDish = data;
			}, function(data){});
			//Then we check if the added dish type and the compare dish are the same. If that is the case then we remove the comp from the menu
			if(compDish.dishTypes[0] === addedDish.dishTypes[0])
				this.removeDishFromMenu(compDish.id);
		}
		// Then we update our menu
		dinnerMenu.push(id);
		$cookieStore.put('dinnerMenu', dinnerMenu);
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