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
    let panel = document.getElementById("BIMViewer");
    let width = (panel.style.display === "none") ? '100%' : viewerStyle.width;
   
    document.getElementById("GISViewer").style.height = viewerStyle.height;
    document.getElementById("GISViewer").style.width = width;
    document.getElementById("BIMViewer").style.height = viewerStyle.height;
    document.getElementById("BIMViewer").style.width = viewerStyle.width;

    setTimeout(e => Forge.resizeViewer(), 1000)
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

    if (panel.style.display === "none") {
      panel.style.display = "";
      document.getElementById("GISViewer").style.width = '50%';
      Forge.resizeViewer();
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


  
