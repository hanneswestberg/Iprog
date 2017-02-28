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
			var fullMenu =  model.getFullMenu();
			
			for(var i = 0; i < fullMenu.length; i++){				
				this.dinnerMenuList.append('<div class="row">' + '<div class="col-sm-6">' + '<p>' + fullMenu[i].title + '</p>' + '</div>' + '<div class="col-sm-6">' + '<p>' + model.getDishPrice(fullMenu[i].id) + '</p>' + '</div>' + '</div>');
			}
			
			this.totalCost.text(model.getTotalMenuPrice());
		}
	}
	
	// Add this view to the array of observers in the model
	model.addObserver(this);
	this.update();
	return this;
}
