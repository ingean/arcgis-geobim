define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/BuildingSceneLayer",
  "esri/widgets/Expand",
  "esri/widgets/Slice",
  "esri/widgets/Slice/SlicePlane"
],
function (WebScene, SceneView, BuildingSceneLayer, Expand, Slice, SlicePlane) {

  function init(view, webscene) {
    let sliceDiv = document.getElementById('sliceDiv');

    let expand = new Expand({
      view: view,
      content: sliceDiv
    })
    
    view.ui.add(expand, "top-right");

    let buildingLayer = webscene.allLayers.find(layer => {
      return layer.title === 'K05-Moselva-bru';
    });  

    let sliceWidget = null;
    
    buildingLayer.when(() => {
      buildingLayer.allSublayers.forEach(layer => {
        
        switch (layer.modelName) {
          case "FullModel":
            layer.visible = true;
            break;
          case "Overview":
          case "Rooms":
            layer.visible = false;
            break;
          default:
            layer.visible = true;
        }
      });
      
      sliceWidget = setSliceWidget(view, sliceWidget);
      addEventListeners(sliceWidget);

      sliceDiv.style.visibility = 'visible';
    });
  }
  
  function setSliceWidget(view, sliceWidget) {
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");

    sliceWidget = new Slice({
      view: view,
      container: "sliceContainer"
    });
   
    sliceWidget.viewModel.tiltEnabled = true;
    sliceWidget.viewModel.shape = null;
    sliceWidget.viewModel.watch("state", value => {
      if (value === "ready") {
        clearPlaneBtn.style.display = "none";
      } else {
        clearPlaneBtn.style.display = "inherit";
      }
    });
    return sliceWidget;
  }

  function addEventListeners(sliceWidget) {    
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");
    clearPlaneBtn.addEventListener("click", () => {
      sliceWidget.viewModel.clear();
    });
  }
  
  return {
    addWidget: (view, webscene) => {
      init(view, webscene); 
    }
  }
});