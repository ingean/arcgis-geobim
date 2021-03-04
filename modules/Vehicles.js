define([
  "esri/tasks/QueryTask", 
  "esri/tasks/support/Query"
],
function(QueryTask, Query) {

  const url = 'https://us-iot.arcgis.com/d8avj4l9dv7mdfsa/d8avj4l9dv7mdfsa/maps/arcgis/rest/services/e16_features_Update/FeatureServer/0';
 
  function createDiv(className) {
    let div = document.createElement('div');
    div.className = className;
    return div
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
    updateVehicleIndicators(count, sumload, maxspeed);
  }

  function updateVehicleIndicators(count, sumload, maxspeed) {
    document.getElementById('indicator-vehicles').innerHTML = count;
    document.getElementById('indicator-sumload').innerHTML = sumload.toLocaleString() + ' m<sup>3</sup>';
    let sText = document.getElementById('indicator-maxspeed');
    sText.innerHTML = Math.round(maxspeed) + ' km/t';
    let sIcon = sText.nextSibling;

    if (maxspeed >= 8) {
      sText.className = 'i-text i-text-alert';
      sIcon.className = 'icon-ui-chart icon-ui-red';
    } else {
      sText.className = 'i-text';
      sIcon.className = 'icon-ui-chart';
    } 
  }



  function addListItem(feature) {
    let list = document.getElementById('machine-list');

    let item = createDiv('db-list-item');
    let icon = createDiv('icon-ui-grant');
    let text = createDiv('db-list-text');
    let header = createDiv('db-list-text db-list-text-header');
    let body = createDiv('db-list-text db-list-text-body');
    let footer = createDiv('db-list-text db-list-text-footer');
    if (feature.Speed >= 8) icon.className = 'icon-ui-deny icon-ui-red'
    
    
    item.id = feature.globalid
    updateItem(item, header, body, footer, feature);
    
    text.appendChild(header);
    text.appendChild(body);
    text.appendChild(footer);

    item.appendChild(icon);
    item.appendChild(text);
    list.appendChild(item);
  }

  function updateListItem(feature) {
    let item = document.getElementById(feature.globalid);
    let text = item.childNodes[1];
    let header = text.childNodes[0];
    let body = text.childNodes[1];
    let footer = text.childNodes[2];
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