const buttonsView = document.querySelectorAll('[data-view]');
const catalogItem = document.querySelector('.games--catalog');
if (buttonsView.length) {
  buttonsView.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.currentTarget.dataset.view === 'list') {
        catalogItem.classList.add('list')
        console.log(e.currentTarget.parentElement)
        const activeBtn = e.currentTarget.parentElement.querySelector('button[data-view].active')
        if (activeBtn) {
          activeBtn.classList.remove('active')
        }
        e.currentTarget.classList.add('active')
      } else {
        const activeBtn = e.currentTarget.parentElement.querySelector('button[data-view].active')
        if (activeBtn) {
          activeBtn.classList.remove('active')
        }
        catalogItem.classList.remove('list')
        e.currentTarget.classList.add('active')
      }
    })
  })
}