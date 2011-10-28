function ge(id) {
  return (typeof id === 'string') ? document.getElementById(id) : id;
}
var fixMask = false;
function maskOn(num, mode, over) {
  if (fixMask && over) return;
  if (!over) fixMask = true;
  ge('mask1').className = 'contest_mask ' + (num == 1 ? mode : 'off');
  ge('mask2').className = 'contest_mask ' + (num == 2 ? mode : 'off');
  ge('mask3').className = 'contest_mask ' + (num == 3 ? mode : 'off');
  ge('masks_wrapper').className = '';
}
function maskOff(out) {
  if (fixMask && out) return;
  ge('masks_wrapper').className = 'off';
  fixMask = false;
}