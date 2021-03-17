define([
  "modules/Forge.js"
],
function(Forge) {

  function addEventHandlers() {
    document.getElementById('closebtn')
    .addEventListener('click', toggleDashboard)
    
    document.getElementById('toggleDB')
    .addEventListener('click', toggleDashboard)
    
    document.getElementById('toggleBIMbtn')
    .addEventListener('click', toggleBIM)

    window.onresize = resizeViewers;
  }

  function resizeViewers() {
    let viewer = document.querySelector('.viewer-panel');
    let viewerStyle = window.getComputedStyle(viewer);

    document.getElementById("GISViewer").style.height = viewerStyle.height;
    document.getElementById("GISViewer").style.width = viewerStyle.width;
    document.getElementById("BIMViewer").style.height = viewerStyle.height;
    document.getElementById("BIMViewer").style.width = viewerStyle.width;

    Forge.resizeViewer();
  }

  
  function toggleDashboard() {
    let panel = document.querySelector(".db-panel");
    let style = window.getComputedStyle(panel);
    let caption = 'Vis dashboard';

    if (style.display === "none") {
      panel.style.display = "";
      caption = 'Skjul dashboard'
    } else {
      panel.style.display = "none";
    }
    resizeViewers();
    document.getElementById('toggleDB').title = caption;
    document.getElementById('toggleDB').innerText = caption; 
  }
      
  
  function toggleBIM() {
    let panel = document.getElementById("BIMViewer");
    let caption = "Skjul BIM";

    if (style.display === "none") {
      panel.style.display = "";
      document.getElementById("GISViewer").style.width = '50%';
    } else {
      panel.style.display = "none";
      document.getElementById("GISViewer").style.width = '100%';
      caption = "Vis BIM";
    }
    
    document.getElementById('toggleBIMbtn').title = caption;
    document.getElementById('toggleBIMbtn').innerText = caption; 
  }

  //Public properties and methods
  return {
    init: () => {
      addEventHandlers();
    }
  }
});


  
