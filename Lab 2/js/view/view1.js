//View1 Object constructor
var View1 = function (container, model) {
	this.container = container;
	this.model = model;
	
	this.createDinnerButton = container.find("#createDinner");	
}

//View1Controller Object constructor
var View1Controller = function(view, model, stateCtrl){
	
	view.createDinnerButton.click(function(){
		stateCtrl.changeView("nextStep");
		$("#header").css("background", "#F0ECED");
		document.body.style.backgroundImage = "none";
	});
}
 
