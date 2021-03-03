const agolUrl = 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Volumberegninger/FeatureServer/0';
let vData = {};

// Set Charts.js defaults
Chart.defaults.global.defaultFontColorn = 'rgba(241, 241, 241, 1)';
Chart.defaults.global.defaultFontFamily = "'Avenir Next W01','Avenir Next W00','Avenir Next','Avenir','Helvetica Neue','sans-serif'";
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.defaultFontSize = 12;

function drawDoughNut(data, labels, title, id) {
  let ctx = document.getElementById(id);

  let pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(90, 189, 249, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(90, 189, 249, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }],
      labels: labels
    },
    options: {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: title,
        fontSize: 16,
        fontFamily: "'Avenir Next W01','Avenir Next W00','Avenir Next','Avenir','Helvetica Neue','sans-serif'",
        fontStyle: 'normal',
        fontColor: 'rgba(241, 241, 241, 1)'
      },
      legend: {
        display: false
      }
    }
  });
}

function drawBars(data, labels, title, id) {
  let ctx = document.getElementById(id);
  let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Antall deler',
        data: data,
        backgroundColor: 'rgba(90, 189, 249, 0.2)',
        borderColor: 'rgba(90, 189, 249, 1)',
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        position: "top",
        text: title,
        fontSize: 16,
        fontFamily: "'Avenir Next W01','Avenir Next W00','Avenir Next','Avenir','Helvetica Neue','sans-serif'",
        fontStyle: 'normal',
        fontColor: 'rgba(241, 241, 241, 1)'
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

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

  drawBars(data, labels, 'Deler pr fase', 'parts-barchart')
}

function drawVolumeBarChart(stats) {
  let labels = []
  for (let i = 1; i < 8; i++) labels.push('Fase ' + i);

  let data = [];
  for (let key in stats) {
    data.push(stats[key]);
  }

  drawBars(data, labels, 'Volum pr fase', 'volume-barchart')
}

function drawVoxelVolumePieChart(vVol = vData) {
  let range = document.querySelector('.range input');
  let phase = range.value;
  let d = vVol[phase - 1];
  let data = [d['Prosjektert'] - d['Fjernet'], d['Fjernet'] , d['Lagt_til']];
  let labels = ['Prosjektert utgravd', 'Faktisk utgravd', 'Faktisk fylt ut'];

  drawDoughNut(data, labels, 'Fremdrift, grunnarbeid', 'voxel-piechart');
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

function startDashboard(stats) {
  drawCountIndicator(stats.parts);
  drawVolumeIndicator(stats.volume);
  drawPartsBarChart(stats.parts);
  drawVolumeBarChart(stats.volume);
  updateVoxelVolumeCards();
}

async function updateVoxelVolumeCards(pnr = 3) {
  if(pnr != 3 && pnr != 9) pnr = 3;

  let pVol = await getVolumeData(pnr);
  drawVoxelVolumePieChart(pVol);
  drawVoxelVolumeIndicators(pVol);
} 

