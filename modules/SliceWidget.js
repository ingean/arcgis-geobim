define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/BuildingSceneLayer",
  "esri/widgets/Slice",
  "esri/widgets/Slice/SlicePlane",
],
function (WebScene, SceneView, BuildingSceneLayer, Slice, SlicePlane) {

  function init(view, webscene) {
    let buildingLayer = webscene.allLayers.find(layer => {
      return layer.title === 'K05-Moselva-bru';
    });  

    let sliceWidget = null;
    let sliceTiltEnabled = true;
  
    view.ui.add("slice-menu", "top-right");
  
    buildingLayer.when(() => {
      // Iterate through the flat array of sublayers and extract the ones
      // that should be excluded from the slice widget
      buildingLayer.allSublayers.forEach(layer => {
        // modelName is standard accross all BuildingSceneLayer,
        // use it to identify a certain layer
        switch (layer.modelName) {
          // Because of performance reasons, the Full Model view is
          // by default set to false. In this scene the Full Model should be visible.
          case "FullModel":
            layer.visible = true;
            break;
          case "Overview":
          case "Rooms":
            layer.visible = false;
            break;
          // Extract the layers that should not be hidden by the slice widget
          default:
            layer.visible = true;
        }
      });
      addEventListeners(sliceWidget, sliceTiltEnabled)
      setSliceWidget(view, sliceWidget, sliceTiltEnabled);
    });
  }
  
  function setSliceWidget(view, sliceWidget, sliceTiltEnabled) {
    const plane = new SlicePlane({
      position: {
        latitude: 60.2270228,
        longitude: 10.4086517,
        z: 190
      },
      tilt: 0,
      width: 29,
      height: 29,
      heading: 0.46
    });
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");

    sliceWidget = new Slice({
      view: view,
      container: "sliceContainer"
    });
    //sliceWidget.viewModel.excludedLayers.addMany(excludedLayers);
    sliceTiltEnabled = true;
    sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
    sliceWidget.viewModel.shape = plane;
    sliceWidget.viewModel.watch("state", function(value) {
      if (value === "ready") {
        clearPlaneBtn.style.display = "none";
      } else {
        clearPlaneBtn.style.display = "inherit";
      }
    });
  }

  function addEventListeners(sliceWidget, sliceTiltEnabled) {    
    let resetPlaneBtn = document.getElementById("resetPlaneBtn");
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");
    
    resetPlaneBtn.addEventListener("click", function () {
      document.getElementById("tiltEnabled").checked = true;
      sliceTiltEnabled = true;
      sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
      sliceWidget.viewModel.shape = plane;
    });
  
    clearPlaneBtn.addEventListener("click", function () {
      sliceWidget.viewModel.clear();
    });
  
    document
      .getElementById("tiltEnabled")
      .addEventListener("change", function (event) {
        sliceTiltEnabled = event.target.checked;
        sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
      });
  }
  
  return {
    addWidget: (view, webscene) => {
      init(view, webscene); 
    }
  }
});