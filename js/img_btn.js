document.addEventListener('DOMContentLoaded', function() {
    // Для изображений
    const images = document.querySelectorAll('.scroll-animate');
    const images_del = document.querySelectorAll('.scroll-animate1');
    // Для кнопок
    const buttons = document.querySelectorAll('.btn-scroll-animate'); 
    
    function checkScrollForElements(elements) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    function checkAllScrolls() {
        checkScrollForElements(images);
        checkScrollForElements(images_del);
        checkScrollForElements(buttons);
    }
    
    // Проверяем при загрузке страницы
    checkAllScrolls();
    
    // Проверяем при прокрутке
    window.addEventListener('scroll', checkAllScrolls);
});