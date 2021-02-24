const agolUrl = 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Volumberegninger/FeatureServer/0';
let vData = {};

function drawDoughNut(data, labels, title, id) {
  let ctx = document.getElementById(id);

  let pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
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
        fontSize: 18,
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
        fontSize: 18,
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

function drawCountIndicator(stats) {
  let count = 0;
  for (let key in stats) {
    count += stats[key].length;
  }

  count = count.toLocaleString();
  document.getElementById('indicator-parts').textContent = count;
}

function drawProgressBarChart(stats) {
  let labels = []
  for (let i = 1; i < 8; i++) labels.push('Fase ' + i);

  let data = [];
  for (let key in stats) {
    data.push(stats[key].length);
  }

  drawBars(data, labels, 'Deler pr fase', 'barchart')
}

function drawProgressPieChart() {
  let range = document.querySelector('.range input');
  let phase = range.value;
  let d = vData[phase - 1];
  let data = [d['Prosjektert'] - d['Fjernet'], d['Fjernet'] , d['Lagt_til']];
  let labels = ['Prosjektert utgravd', 'Faktisk utgravd', 'Faktisk fylt ut'];

  drawDoughNut(data, labels, 'Fremdrift, grunnarbeid', 'piechart');
}

function getVolumeData(){
  return new Promise((resolve, reject) => {
    fetch(agolUrl+'/query?where=1=1&f=json&outFields=*')
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

function drawPlannedVolumeIndicator() {
  let v = vData[0]['Prosjektert'];
  v = v.toLocaleString();
  document.getElementById('indicator-planned').innerHTML = v  + ' m<sup>3</sup>';
}

function drawCurrentVolumeIndicator() {
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

  let pr = vData[c]['Prosjektert'];
  let r = vData[c]['Fjernet'];
  let a = vData[c]['Lagt_til'];
  let prog = (r/pr)*100
  r = r.toLocaleString();
  a = a.toLocaleString();
  prog = Math.round(prog);
  document.getElementById('indicator-removed').innerHTML = r + ' m<sup>3</sup>';
  document.getElementById('indicator-added').innerHTML = a + ' m<sup>3</sup>';
  document.getElementById('indicator-diggingprogress').innerHTML = prog + ' %';
}

async function startDashboard(stats) {
  drawCountIndicator(stats);
  drawProgressBarChart(stats);
  let vd = await getVolumeData();
  drawProgressPieChart();
  drawPlannedVolumeIndicator();
  drawCurrentVolumeIndicator();
}

