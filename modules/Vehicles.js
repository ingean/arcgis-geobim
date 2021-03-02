define([
  "esri/tasks/QueryTask", 
  "esri/tasks/support/Query"
],
function(QueryTask, Query) {

  const url = 'https://us-iot.arcgis.com/d8avj4l9dv7mdfsa/d8avj4l9dv7mdfsa/maps/arcgis/rest/services/e16_features_Update/FeatureServer/0';
 
  function getFeatures() {
    let queryTask = new QueryTask({
      url: url
    });
    let query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = "1=1";  // Return all cities with a population greater than 1 million
  
    // When resolved, returns features and graphics that satisfy the query.
    queryTask.execute(query)
    .then(results => {
      updateVehicleList(results.features);
    });
  }

  function updateVehicleList(features) {
    for (feature of features) {

      let a = feature.attributes;
      let item  = document.getElementById(a.Id);

      (item) ? updateListItem(a) : addListItem(a);
        
    }
  }

  function addListItem(feature) {
    let list = document.getElementById('machine-list');
    let item = document.createElement('div');
    let text = document.createElement('div');
    let icon = document.createElement('div');
    item.className = 'db-list-item';
    text.className = 'db-list-text';
    icon.className = 'icon-ui-map-pin';

    item.id = feature.Id
    updateItem(item, text, feature);
    
    item.appendChild(icon);
    item.appendChild(text);
    list.appendChild(item);
  }

  function updateListItem(feature) {
    let item = document.getElementById(feature.Id);
    let text = item.childNodes[1];
     updateItem(item, text, feature);
  }

  function updateItem(item, text, feature) {
    item.setAttribute('data-xcoord', feature.POINT_X);
    item.setAttribute('data-ycoord', feature.POINT_Y);

    text.innerHTML = feature.DumperMachineName + ' ' + Math.round(feature.Speed) + ' km/t';
  }


  return {
    updateList: () => {
      getFeatures();
    } 
  }
})