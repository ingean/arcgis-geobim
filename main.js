require([
  "esri/intl",
  "esri/WebScene",
  "esri/views/SceneView",
  "modules/Dashboard.js"
], function (intl, WebScene, SceneView, Dashboard ) {

  // Set app locale to Norwegian
  //intl.setLocale('nb');

  /****************************************************************************
   *  Create Web Scene and View
   ***************************************************************************/
  let webscene = new WebScene({
    portalItem: {
      id: "6633c8f8fe0643d0a23e46447bc5339b"
      //id: "bd8f9599b6dd42b6bd4f0a5ab381b5b6"
    }
  });

  let view = new SceneView({
    container: "GISViewer",
    qualityProfile: "high",
    environment: {
      atmosphere: {
        quality: "high"
      },
      lighting: {
        date: new Date(),
        directShadowsEnabled: true
      }
    },
    map: webscene
  });

  loadBIMViewer();
  Dashboard.drawChart();

  /****************************************************************************
   *  Create widgets and add to UI
   ***************************************************************************/ 
  
  view.when(function () {
    // Execute code when view has loaded
  });
});