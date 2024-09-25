 
const toggleDropdown = () => {
  const dropdown = document.getElementById('dropdown')
  dropdown.classList.toggle('hidden')
}

const toggleMobileMenu = () => {
  const mobileMenu = document.querySelector('#mobile-menu')
  const openButton = document.querySelector('.menu-open-icon')
  const closeButton = document.querySelector('.menu-close-icon')
  mobileMenu.classList.toggle('hidden')
  openButton.classList.toggle('dissapear')
  closeButton.classList.toggle('dissapear')
}




