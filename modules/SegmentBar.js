define([
  "modules/Config.js",
  "modules/Forge.js",
  "modules/Dashboard.js"
],
function(Config, Forge, Dashboard) {
  const config = Config.settings();


  function onItemClick(item) {
      let snr = Number(item.getAttribute('data-segment'));
      let actives = document.querySelectorAll('.db-pbar-text.active');
      for (active of actives) {
        active.className = active.className.replace(' active', '');
      }
      
      let header = item.childNodes[0];
      let pname = item.childNodes[2];
      header.className += ' active';
      if (pname) pname.className += ' active';
      
      //Switch BIM if applicable
      Forge.loadModel(snr);
      Dashboard.onSegmentChange(snr);
  }
  
  function createBar() {
  
    let bar = document.getElementById('parsellbar');
  
    for (var i = 1; i <= config.segments.count; i++) {
      let seg = config.segments[i];
      
      let item = document.createElement('div');
      let header = document.createElement('div');
      let status = document.createElement('div');
      let placename = document.createElement('div');
      let name = '';
      let snr = i.toLocaleString('no', {minimumIntegerDigits: 2});
      header.innerHTML = 'P ' + snr;

      item.className = 'db-pbar-item';
      item.setAttribute('data-segment', i);
      header.className = 'db-pbar-text';
      status.className = 'db-pbar-status';
      placename.className = 'db-pbar-text';
      
      if (i === 5) {
        header.className = 'db-pbar-text active';
        placename.className = 'db-pbar-text active';
      }
     
      if (seg) {
        if (seg.volume || seg.BIM) status.className = 'db-pbar-status db-pbar-status-complete';
        (seg.name) ? name = seg.name : name = '';
      }
  
      placename.innerHTML = name;
      
      item.appendChild(header);
      item.appendChild(status);
      item.appendChild(placename);
      bar.appendChild(item);
  
      item.addEventListener('click', e => {onItemClick(item)});
    }
  }
  //Public properties and methods
  return {
    start: () => {
      createBar();
    },
    onClick: (item) => {
      onItemClick(item);
    }
  }
});

