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
    query.where = "1=1"; 
  
    queryTask.execute(query)
    .then(results => {
      updateVehicleList(results.features);
    });
  }

  function updateVehicles() {
    return new Promise((resolve, reject) => {
      let queryTask = new QueryTask({
        url: url
      });
      let query = new Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.where = "1=1"; 
  
      queryTask.execute(query)
      .then(results => {
        updateVehicleList(results.features);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  function updateVehicleList(features) {
    
    let count = features.length
    let sumload = 0;
    let maxspeed = 0;
    
    for (feature of features) {

      let a = feature.attributes;
      let item  = document.getElementById(a.globalid);

      (item) ? updateListItem(a) : addListItem(a);
      sumload += a.Quantity;
      if (a.Speed > maxspeed) maxspeed = a.Speed;
        
    }

    document.getElementById('indicator-vehicles').innerHTML = count;
    document.getElementById('indicator-sumload').innerHTML = sumload.toLocaleString() + ' m<sup>3</sup>';
    document.getElementById('indicator-maxspeed').innerHTML = Math.round(maxspeed) + ' km/t';

  }

  function addListItem(feature) {
    let list = document.getElementById('machine-list');
    let item = document.createElement('div');
    let icon = document.createElement('div');
    let textcontainer = document.createElement('div');
    let header = document.createElement('div');
    let body = document.createElement('div');
    let footer = document.createElement('div');
    
    item.className = 'db-list-item';
    icon.className = 'icon-ui-grant';
    if (feature.Speed > 6) icon.className = 'icon-ui-deny icon-ui-red'
    textcontainer.className = 'db-list-text';
    header.className = 'db-list-text db-list-text-header';
    body.className = 'db-list-text db-list-text-body';
    footer.className = 'db-list-text db-list-text-footer';

    item.id = feature.globalid
    updateItem(item, header, body, footer, feature);
    
    textcontainer.appendChild(header);
    textcontainer.appendChild(body);
    textcontainer.appendChild(footer);

    item.appendChild(icon);
    item.appendChild(textcontainer);
    list.appendChild(item);
  }

  function updateListItem(feature) {
    let item = document.getElementById(feature.globalid);
    let textcontainer = item.childNodes[1];
    let header = textcontainer.childNodes[0];
    let body = textcontainer.childNodes[1];
    let footer = textcontainer.childNodes[2];
     updateItem(item, header, body, footer, feature);
  }

  function updateItem(item, header, body, footer, f) {
    item.setAttribute('data-xcoord', f.POINT_X);
    item.setAttribute('data-ycoord', f.POINT_Y);

    let speed = Math.round(f.Speed) + ' km/t'
    header.innerHTML = `${f.TaskDescription_1}`;
    body.innerHTML = `${f.Quantity} m3 ${f.MassTypeName.toLowerCase()} med ${f.LoaderMachineTypeId.toLowerCase()} i ${speed}`;
    footer.innerHTML = `Sist oppdatert ${f.Dato}`;
  }

  async function update() {
    const t1 = new Date();
    await updateVehicles();
    setTimeout(update, Math.max(0, 6000 - new Date + t1));
  }

  return {
    updateList: () => {
      update();
    } 
  }
})