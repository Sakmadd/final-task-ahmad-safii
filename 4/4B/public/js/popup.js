document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup')
  
  if (popup) {
    setTimeout(() => {
      popup.classList.add('popup-hidden')
    }, 2500)
  }

})
