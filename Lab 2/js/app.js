$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	// The default value
	model.setNumberOfGuests(1);
	
	//And create the needed controllers and views
	var stateCtrl = new Controller(model);
	
	window.view1 = new View1($("#view1"), model);
	window.view1Controller = new View1Controller(view1, model, stateCtrl);
	
	window.view2 = new View2($("#view2"), model);
	window.view2Controller = new View2Controller(view2, model, stateCtrl);
	
	window.view3 = new View3($("#view3"), model);
	window.view3Controller = new View3Controller(view3, model, stateCtrl);
	
	window.view4 = new View4($("#view4"), model);
	window.view4Controller = new View4Controller(view4, model, stateCtrl);
	
	window.view5 = new View5($("#view5"), model);
	window.view5Controller = new View5Controller(view5, model, stateCtrl);
	
	window.view6 = new View6($("#view6"), model);
	window.view6Controller = new View6Controller(view6, model, stateCtrl);
});
