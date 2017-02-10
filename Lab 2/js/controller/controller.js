var Controller = function (model) {
  this.model = model;
  
  var currentStep = 1;
  var allViews = ["view1", "view2", "view3", "view4", "view5", "view6", "dinnerHeader", "combinedViews"];
  
  var steps = {};
  steps["1"] = ["view1"];
  steps["2"] = ["combinedViews", "view2", "view3"];
  steps["3"] = ["combinedViews", "view2", "view4"];
  steps["4"] = ["view5"];
  steps["5"] = ["view6"];
  
  this.changeView = function(message){
    // If we called "nextStep" or "previousStep"
    // First disable all views
    for(var i = 0; i < allViews.length; i++){
      $("#" + allViews[i]).css("display", "none");
    }
    
    // Add or reduce current step
    if(message == "nextStep" && currentStep == 2 && model.getFullMenu().length == 0) currentStep = 2;
    else if(message == "nextStep" && currentStep == 2 && model.getFullMenu().length > 0) currentStep = 4;
    else if(message == "previousStep" && (currentStep == 4 || currentStep == 5)) currentStep = 2;
    else if(message == "nextStep") currentStep++;
    else if(message == "previousStep") currentStep--;
    else if(message.includes("showDish")) currentStep = 3; 

    // Then enable just the correct views
    for(var r = 0; r < steps[currentStep].length; r++){
      $("#" + steps[currentStep][r]).css("display", "inline");
    }
    
    if(message.includes("showDish")){
      window.view4.setSelectedDish(message.replace('showDish', ''));
      window.view4.update();
    }
  };
  
  return this;
}