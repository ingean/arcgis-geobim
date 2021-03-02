const pnames = {
  0: 'Åsbygda',
  5: 'Hadeland glassverk',
  20: 'Olum'
}

function createBar(parsels) {

  let bar = document.getElementById('parsellbar');

  for (var i = 0; i < parsels; i++) {
    let item = document.createElement('div');
    let header = document.createElement('div');
    let status = document.createElement('div');
    let placename = document.createElement('div');
    
    item.className = 'db-pbar-item';
    header.className = 'db-pbar-text';
    status.className = 'db-pbar-status';
    if (i < 10) status.className = 'db-pbar-status db-pbar-status-complete';
    placename.className = 'db-pbar-text';
    
    header.innerHTML = 'Parsell ' + (i + 1);
    
    let name = '';
    (i in pnames) ? name = pnames[i] : name = '';
    
    placename.innerHTML = name;
    
    item.appendChild(header);
    item.appendChild(status);
    item.appendChild(placename);

    bar.appendChild(item);

  }
}