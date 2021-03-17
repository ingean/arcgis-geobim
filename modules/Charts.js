define([
  "lib/Chart.min.js",
  "lib/DeepMerge.js"

],
function(Chart, deepmerge) {
  
  const chartDefaults = {
    options: {
      responsive: true,
      title: {
        display: true,
        position: "top",
        fontSize: 16,
        fontFamily: "'Avenir Next W01','Avenir Next W00','Avenir Next','Avenir','Helvetica Neue','sans-serif'",
        fontStyle: 'normal',
        fontColor: 'rgba(241, 241, 241, 1)'
      },
      legend: {
        display: false
      }
    }
  }

  function drawDoughNut(data, labels, title, id) {
    let ctx = document.getElementById(id);
    
    let chartOptions = {
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
      options: {title: {text: title}}
    }

    let options = deepmerge(chartDefaults, chartOptions);
    let pieChart = new Chart(ctx, options);
  }

  function drawBars(data, labels, title, id) {
    let ctx = document.getElementById(id);
    let chartOptions = {
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
        title: { text: title },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

    let options = deepmerge(chartDefaults, chartOptions);
    let barChart = new Chart(ctx, options);
  }
  
  //Public properties and methods
  return {
    drawDoughNutChart: (data, labels, title, id) => {
      drawDoughNut(data, labels, title, id)
    },
    drawBarChart: (data, labels, title, id) => {
      drawBars(data, labels, title, id)
    }
  }
});