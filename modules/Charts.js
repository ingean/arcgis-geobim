define([
  "lib/Chart.min.js"
],
function(Chart) {
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