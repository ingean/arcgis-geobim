define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/StreamLayer"
],
function(WebScene, SceneView, StreamLayer) {
  let url = 'https://demo09.geodata.no/arcgis/rest/services/e16-Stream/StreamServer';

  function createStreamLayer() {
    return new StreamLayer({
                url: url,
                purgeOptions: {
                displayCount: 10000
              }
    });
  }

  return {
    addStream: (webscene) => {
      let streamLayer = createStreamLayer();
      
      //streamLayer.when(e => {
        streamLayer.load().then(d => {
          console.log(d);
        })
      //})   
      
      
      
      
      
      //webscene.add(streamLayer);
    }
  }
});