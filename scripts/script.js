const labelTopLine = document.getElementById('label-top-line');
const labelBottomLine = document.getElementById('label-bottom-line');
const inputTopLine = document.getElementById('top-line');
const inputBottomLine = document.getElementById('bottom-line');
const topLineGraphs = document.getElementById('top-line-graphs');
const bottomLineGraphs = document.getElementById('bottom-line-graphs');

// bottom line button
inputBottomLine.addEventListener( 'change', function() {
  if(this.checked) {
    // change button color
    labelBottomLine.classList.add('active');
    labelTopLine.classList.remove('active');
    // change content
    bottomLineGraphs.classList.remove('d-none');
    topLineGraphs.classList.add('d-none');
  } 
});

// top line button
inputTopLine.addEventListener( 'change', function() {
  if(this.checked) {
    // change button color
    labelTopLine.classList.add('active');
    labelBottomLine.classList.remove('active');
    // change content
    topLineGraphs.classList.remove('d-none');
    bottomLineGraphs.classList.add('d-none');
  } 
});