document.addEventListener("DOMContentLoaded", function(event) {
  function animationHeight(bodyContent, button) {
    if (bodyContent.style.maxHeight) {
      bodyContent.style.maxHeight = null
      button.classList.remove('opened')
    } else {
      bodyContent.style.maxHeight = bodyContent.scrollHeight + "px";
      button.classList.add('opened')
    }
}


const accordionButtons = document.querySelectorAll('.js-accordion');
const accordionBody = document.querySelectorAll('.js-accordion-body');
accordionButtons.forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    animationHeight(accordionBody[idx], btn)
  })
});
});