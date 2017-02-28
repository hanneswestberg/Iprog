//View4Controller Object constructor
var View4Controller = function(view, model, stateCtrl){
  view.backToDishes.click(function(){
		stateCtrl.changeView("previousStep");
  });
  
  view.confirmDishButton.click(function(){
		stateCtrl.changeView("previousStep");
		model.addDishToMenu(view.getSelectedDish());
		
  });
	return this;
}