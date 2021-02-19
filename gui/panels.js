document.getElementById('closebtn')
.addEventListener('click', closeDashboard)

document.getElementById('togglebtn')
.addEventListener('click', toggleDashboard)

document.getElementById('toggleBIMbtn')
.addEventListener('click', toggleBIM)

function togglePanel(panelId, buttonId, height, caption) {
  let panel = document.getElementById(panelId);
  let rheight = 100 - height;

  if (height === 0) {
    panel.style.display = "none"; //Hide panel
  } else {
    panel.style.display = "";
  }
  
  document.getElementById("BIMViewer").style.height = String(rheight) + '%';
  document.getElementById("GISViewer").style.height = String(rheight) + '%';
  document.getElementById(buttonId).title = caption;
  document.getElementById(buttonId).innerText = caption; 
}
  
function toggleDashboard() {
  let panel = document.getElementById("dashboard-panel");
  let style = window.getComputedStyle(panel);

  if (style.display === "none") {
    openDashboard();
  } else {
    closeDashboard();
  }
}
    
function openDashboard() {
  togglePanel('dashboard-panel', 'togglebtn', 30, 'Skjul dashboard');
}

function closeDashboard() {
  togglePanel('dashboard-panel', 'togglebtn', 0, 'Vis dashboard');
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
  
