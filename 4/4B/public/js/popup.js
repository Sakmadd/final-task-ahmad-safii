document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup')
  
  if (popup) {
    setTimeout(() => {
      popup.classList.add('popup-hidden')
    }, 2500)
  }

})

function previewImage() {
  const input = document.getElementById('file-input')
  const fileName = document.getElementById('file-name')
  const imagePreview = document.getElementById('image-preview')

  if (input.files && input.files[0]) {
    fileName.textContent = input.files[0].name

    const reader = new FileReader()
    reader.onload = function(e) {
      imagePreview.src = e.target.result
      imagePreview.classList.remove('hidden') 
    }
    reader.readAsDataURL(input.files[0]) 
  } else {
    fileName.textContent = 'No file chosen'
    imagePreview.classList.add('hidden') 
  }
}