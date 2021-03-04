define([
  "modules/Charts.js"
],
function(Charts) {
  const agolUrl = 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Volumberegninger/FeatureServer/0';
  let vData = {};
  let modelProperties = {};

  function drawVolumeIndicator(stats) {
    let range = document.querySelector('.range input');
    let phase = range.value;
    let volume = stats[phase - 1];

    volume = volume.toLocaleString();
    document.getElementById('indicator-volume').innerHTML = volume + ' m<sup>3</sup>';
  }

  function drawCountIndicator(stats) {
    let range = document.querySelector('.range input');
    let phase = range.value;
    let count = stats[phase - 1].length;
    let totCount = 0;
    
    for (let key in stats) {
      totCount += stats[key].length;
    }

    count = count.toLocaleString();
    totCount = totCount.toLocaleString();
    document.getElementById('indicator-parts').textContent = count;
  }

  function drawPartsBarChart(stats) {
    let labels = []
    for (let i = 1; i < 8; i++) labels.push('Fase ' + i);

    let data = [];
    for (let key in stats) {
      data.push(stats[key].length);
    }

    Charts.drawBarChart(data, labels, 'Deler pr fase', 'parts-barchart');
  }

  function drawVolumeBarChart(stats) {
    let labels = []
    for (let i = 1; i < 8; i++) labels.push('Fase ' + i);

    let data = [];
    for (let key in stats) {
      data.push(stats[key]);
    }

    Charts.drawBarChart(data, labels, 'Volum pr fase', 'volume-barchart')
  }

  function drawVoxelVolumePieChart(vVol = vData) {
    let range = document.querySelector('.range input');
    let phase = range.value;
    let d = vVol[phase - 1];
    let data = [d['Prosjektert'] - d['Fjernet'], d['Fjernet'] , d['Lagt_til']];
    let labels = ['Prosjektert utgravd', 'Faktisk utgravd', 'Faktisk fylt ut'];

    Charts.drawDoughNutChart(data, labels, 'Fremdrift, grunnarbeid', 'voxel-piechart');
  }

  function getVolumeData(pnr){
    return new Promise((resolve, reject) => {
      fetch(agolUrl+`/query?where=Parsell=${pnr}&f=json&outFields=*`)
      .then(res => {
        res.json()
        .then(r => {
          for (let i = 0; i < r.features.length; i++) {
            vData[i] = r.features[i].attributes;
          }
          resolve(vData);
        })
      })
    });
  }

  function drawVoxelVolumeIndicators(vVol = vData) {
    let range = document.querySelector('.range input');
    let p = range.value;
    let c = 0

    if(p >= 1 && p < 5) {
      c = 1;
    } else if(p >= 5 && p < 7) {
      c = 10;
    } else if(p >= 7) {
      c = 11;
    }

    let pr = vVol[c]['Prosjektert'];
    let r = vVol[c]['Fjernet'];
    let a = vVol[c]['Lagt_til'];
    let prog = (r/pr)*100
    let prosj = pr - r;
    prosj = prosj.toLocaleString();
    r = r.toLocaleString();
    a = a.toLocaleString();
    prog = Math.round(prog);
    document.getElementById('indicator-planned').innerHTML = prosj + ' m<sup>3</sup>';
    document.getElementById('indicator-removed').innerHTML = r + ' m<sup>3</sup>';
    document.getElementById('indicator-added').innerHTML = a + ' m<sup>3</sup>';
    document.getElementById('indicator-diggingprogress').innerHTML = prog + ' %';
  }

  
  async function updateVoxelVolumeCards(pnr = 3) {
    if(pnr != 3 && pnr != 9) pnr = 3;

    let pVol = await getVolumeData(pnr);
    drawVoxelVolumePieChart(pVol);
    drawVoxelVolumeIndicators(pVol);
  }

  //Public properties and methods
  return {
    start: () => {
      let f = require('modules/Forge.js');
      modelProperties = f.getModelProps();
      drawCountIndicator(modelProperties.parts);
      drawVolumeIndicator(modelProperties.volume);
      drawPartsBarChart(modelProperties.parts);
      drawVolumeBarChart(modelProperties.volume);
      updateVoxelVolumeCards();
    },
    onStageChange: () => {
      drawCountIndicator(modelProperties.parts);
      drawVolumeIndicator(modelProperties.volume);
      drawVoxelVolumePieChart();
      drawVoxelVolumeIndicators();
    },
    onSegmentChange: (pnr) => {
      updateVoxelVolumeCards(pnr);
    }  
  }
});








 

