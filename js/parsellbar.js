const pnames = {
  1: 'Åsbygda',
  3: 'Kleggerud',
  5: 'Moselva',
  9: 'Søtbakkdalen',
  21: 'Olum'
}

function onItemClick(item) {
    //Find parsell number
    let pnr = Number(item.getAttribute('data-pnr'));
  
    //Set text color active
    let active = document.querySelector('.db-pbar-item.active');
    if (active) {
      active.className = active.className.replace(' active', '');
    }
    
    let header = item.childNodes[0];
    let pname = item.childNodes[2];
    header.className += ' active';
    if (pname) pname.className += ' active';
    
    //Switch BIM if applicable
    if (pnr === 5 || pnr === 9) loadModel(pnr);

    //Get volume data for parsell
    updateVoxelVolumeCards(pnr);
}

function createBar(parsels) {

  let bar = document.getElementById('parsellbar');

  for (var i = 0; i < parsels; i++) {
    let item = document.createElement('div');
    let header = document.createElement('div');
    let status = document.createElement('div');
    let placename = document.createElement('div');
    
    item.className = 'db-pbar-item';
    item.setAttribute('data-pnr', i + 1);
    header.className = 'db-pbar-text';
    status.className = 'db-pbar-status';
    if (i < 10) status.className = 'db-pbar-status db-pbar-status-complete';
    placename.className = 'db-pbar-text';

    let pnr = (i + 1).toLocaleString('no', {minimumIntegerDigits: 2});
    
    header.innerHTML = 'P ' + pnr;
    
    let name = '';
    (i + 1 in pnames) ? name = pnames[i + 1] : name = '';
    
    placename.innerHTML = name;
    
    item.appendChild(header);
    item.appendChild(status);
    item.appendChild(placename);

    bar.appendChild(item);

    item.addEventListener('click', e => {onItemClick(item)});
  }
}