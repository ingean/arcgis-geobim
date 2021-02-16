require([
  "esri/intl",
  "esri/WebScene",
  "esri/views/SceneView",
], function (intl, WebScene, SceneView ) {

  // Set app locale to Norwegian
  intl.setLocale('nb');

  /****************************************************************************
   *  Create Web Scene and View
   ***************************************************************************/
  let webscene = new WebScene({
    portalItem: {
      id: "6633c8f8fe0643d0a23e46447bc5339b"
    }
  });

  var view = new SceneView({
    container: "viewDiv",
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

  /****************************************************************************
   *  Create widgets and add to UI
   ***************************************************************************/ 
  
  view.when(function () {
    

  });
});