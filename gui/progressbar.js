let sheet = document.createElement('style');  
//let range = document.getElementById('range-bar');
let range = document.querySelector('.range input');
let prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {  
  var curVal = el.value,
      val = (curVal - 1) * 16.666666667,
      style = '';
  
  // Set active label
  let node = document.getElementById('range-labels');
  let children = node.children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove('active', 'selected');
    if (i < curVal - 1) {
      children[i].classList.add('selected');
    } else if (i === curVal - 1) {
      children[i].classList.add('active', 'selected');
    }
  }
  
  // Set different color for range input before and after thumb/marker
  let c1 = '#5abdf9'; // Active track color
  let c2 = '#232323'; // Must be same as background
  let c3 = '#f1f1f1'; // Original track color

  for (var i = 0; i < prefs.length; i++) {
    style += `.range {background: linear-gradient(to right, ${c1} 0%, ${c1} ${val}%, ${c2} ${val}%, ${c2} 100%)}`;
    style += `.range input::-${prefs[i]}{background: linear-gradient(to right, ${c1} 0%, ${c1} ${val}%, ${c3} ${val}%, ${c3} 100%)}`;
  }

  return style;
}

range.addEventListener('input', (e) => {
  sheet.textContent = getTrackStyle(e.target);
  highlightPhase();
  drawCountIndicator(props.parts);
  drawVolumeIndicator(props.volume);
  drawProgressPieChart();
  drawVoxelVolumeIndicators();
});

document.getElementById('range-labels')
.addEventListener('click', (e) => {
  let node = e.target;
  let children = node.parentElement.children;
  let index = 0;

  for (let i = 0; i < children.length; i++) {
    if (children[i]==node) index = i;
  }

  const event = new MouseEvent('input', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  range.value = index + 1;
  !range.dispatchEvent(event);
});