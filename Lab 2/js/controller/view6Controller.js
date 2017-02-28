//View6Controller Object constructor
var View6Controller = function(view, model, stateCtrl) {

	view.backToEditDinnerView6.click(function(){
		stateCtrl.changeView("previousStep");
	});
	
	return this;
}