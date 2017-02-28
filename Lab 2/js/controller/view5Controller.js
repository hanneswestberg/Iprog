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