function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

     // Копируем data-атрибут (если есть)
  if (img.hasAttribute("data-modal-type")) {
    modalImg.setAttribute("data-modal-type", img.getAttribute("data-modal-type"));
  } else {
    modalImg.removeAttribute("data-modal-type"); // Удаляем, если у исходной картинки его нет
  }
  
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
  }

  function closeModal() {
    document.getElementById("imageModal").style.display = "none";
  }
  
  // Закрытие при клике вне картинки
  window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
      closeModal();
    }
  };