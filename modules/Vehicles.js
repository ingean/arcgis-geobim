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
      addListItem(
        'machine-list',
        a.DumperMachineName + ' ' + 
        a.Speed + ' km/t')
    }
  }

  function addListItem(listId, content, iconClass = 'icon-ui-map-pin', iconImg = '') {
    let list = document.getElementById(listId);
    let item = document.createElement('div');
    let text = document.createElement('div');
    let icon = document.createElement('div');
    item.className = 'db-list-item';
    text.className = 'db-list-text';
    icon.className = iconClass;
    icon.innerHTML = iconImg
    text.innerHTML = content;
    
    item.appendChild(icon);
    item.appendChild(text);
    list.appendChild(item);
  }

  return {
    updateList: () => {
      setInterval(getFeatures(), 10000);
    } 
  }
})