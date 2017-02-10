//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	
	$("#plusGuest").click(function() {
		var numbOfGuests = model.getNumberOfGuests();
		model.setNumberOfGuests(1);
		//numberOfGuests.innerHTML(model.getNumberOfGuests());
		//$("#numberOfGuests").val("hello");
	});
	
	$("#minusGuest").click(function() {
		model.setNumberOfGuests(-1);
		//numberOfGuests.html(model.getNumberOfGuests());
	});
	
	this.numberOfGuests.html(model.getNumberOfGuests());
	
}
 
