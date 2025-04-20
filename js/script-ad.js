document.addEventListener('DOMContentLoaded', function() {
    // Получаем все adContainer'ы
    const adContainer = document.getElementById('adContainer');
    const adContainer1 = document.getElementById('adContainer1');
    const adContainer2 = document.getElementById('adContainer2');
    const adContainer3 = document.getElementById('adContainer3');
    const adContainer4 = document.getElementById('adContainer4');
    const adContainer5 = document.getElementById('adContainer5');
  
    // Для каждого adContainer'а находим элементы внутри
    function setupAd(adContainer, adClosedClass) {
      const closeAdBtn = adContainer.querySelector('.close-ad-btn');
      const adContent = adContainer.querySelector('.ad-content');
      const adActionBtn = adContainer.querySelector('.ad-action-btn');
  
      // Закрытие рекламы
      closeAdBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.classList.add(adClosedClass);
      });
  
      // Клик по рекламе (но не по кнопке)
      adContent.addEventListener('click', function(e) {
        if (e.target === adActionBtn) return;
        window.open('https://www.google.com', '_blank');
      });
  
      // Клик по кнопке "Learn More"
      adActionBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        window.open('https://www.google.com', '_blank');
      });
    }
  
    // Настраиваем каждый рекламный блок
    setupAd(adContainer, 'ad-closed');
    setupAd(adContainer1, 'ad-closed1');
    setupAd(adContainer2, 'ad-closed2');
    setupAd(adContainer3, 'ad-closed3');
    setupAd(adContainer4, 'ad-closed4');
    setupAd(adContainer5, 'ad-closed5');
  });