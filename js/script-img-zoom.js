function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    // Копируем data-modal-height (если есть)
    if (imgElement.hasAttribute("data-modal-height")) {
        modalImg.setAttribute("data-modal-height", imgElement.getAttribute("data-modal-height"));
    } else {
        modalImg.removeAttribute("data-modal-height"); // Удаляем, если у исходной картинки его нет
    }
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
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