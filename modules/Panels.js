define([

],
function() {

  function addEventHandlers() {
    document.getElementById('closebtn')
    .addEventListener('click', closeDashboard)
    
    document.getElementById('togglebtn')
    .addEventListener('click', toggleDashboard)
    
    document.getElementById('toggleBIMbtn')
    .addEventListener('click', toggleBIM)
  }

  function togglePanel(panelId, buttonId, height, caption) {
    let panel = document.querySelector(panelId);
    let rheight = 100 - height;

    if (panel.style.display === "") {
      panel.style.display = "none"; //Hide panel
    } else {
      panel.style.display = "";
    }
    
    let container = document.querySelector('.viewers-panel');
    let style = window.getComputedStyle(container);


    document.getElementById("BIMViewer").style.height = style.height;
    document.getElementById("GISViewer").style.height = style.height;
    document.getElementById(buttonId).title = caption;
    document.getElementById(buttonId).innerText = caption; 
  }
  
  function toggleDashboard() {
    let panel = document.querySelector(".db-panel");
    let style = window.getComputedStyle(panel);

    if (style.display === "none") {
      openDashboard();
    } else {
      closeDashboard();
    }
  }
      
  function openDashboard() {
    togglePanel('.db-panel', 'togglebtn', 30, 'Skjul dashboard');
  }

  function closeDashboard() {
    togglePanel('.db-panel', 'togglebtn', 0, 'Vis dashboard');
  }

  function toggleBIM() {
    let panel = document.getElementById("BIMViewer");
    let style = window.getComputedStyle(panel);
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


  
