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