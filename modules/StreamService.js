define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/StreamLayer"
],
function(WebScene, SceneView, StreamLayer) {

  let wsUrl = 'wss://us-iot.arcgis.com/d8avj4l9dv7mdfsa/d8avj4l9dv7mdfsa/streams/arcgis/ws/services/JevnakerTestStream/StreamServer';
  let url = 'https://us-iot.arcgis.com/d8avj4l9dv7mdfsa/d8avj4l9dv7mdfsa/streams/arcgis/rest/services/JevnakerTestStream/StreamServer';

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
      webscene.add(streamLayer);
    }
  }
});