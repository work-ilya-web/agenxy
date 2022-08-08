document.body.addEventListener('click', (e) => {
  const modalBtn = e.target.closest('[data-modal]')
  const modalOverlay = document.querySelector('.modal-overlay')
  if (modalBtn) {
    e.preventDefault()
    const modal = document.querySelector(modalBtn.dataset.modal)
    modalOverlay.classList.add('modal-overlay--show')
    showModal(modal)
  }
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target.closest('.modal__close')) {
      const modals = document.querySelectorAll('.modal')
      closeModal(modals)
    }
  })
  function showModal(modal) {
    modal.style.display = 'flex'
    setTimeout(() => {
      modal.classList.add('active')
    }, 200)
    document.body.classList.add('no-scroll')
  }
  function closeModal(modals) {
    if (!document.querySelector('.mobile-menu.show')) {
      document.body.classList.remove('no-scroll')
    }
    modals.forEach((modal) => {
      modal.classList.remove('active')
      setTimeout(() => {
        modal.style.display = 'none'
        modalOverlay.classList.remove('modal-overlay--show')
      }, 300)
    })
  }
})
