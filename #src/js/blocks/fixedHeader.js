const header = document.querySelector('.header');
let headerH = header.scrollHeight;
let pos = window.scrollY;
console.log(pos)
checkPos(headerH, pos)
function checkPos(headerH, pos) {
  pos = window.scrollY;
  headerH = header.scrollHeight;
  if (pos >= headerH) {
    if (!header.classList.contains('fixed')) {
      header.classList.add('fixed')
    }
  } else {
    if (header.classList.contains('fixed')) {
      header.classList.remove('fixed')
    }
  }
}

window.addEventListener('scroll', checkPos);
window.addEventListener('resize', checkPos);