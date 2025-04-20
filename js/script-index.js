document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContent = document.getElementById('modalContent');
    
    // Анимация появления меню
    menuItems.forEach((item, index) => {
      item.style.animationDelay = `${0.5 + index * 0.1}s`;
    });
    
    // Данные для модальных окон (разделы и их кнопки)
    const sectionsData = {
      about: {
        title: "About Costa Rica",
        buttons: [
          { text: "Government & Symbols - Costa Rica", link: "government.html" },
          { text: "Embassies & Consulates in Costa Rica", link: "embassies.html" },
          { text: "Weekends & Holidays", link: "holidays.html" },
          { text: "Climate & Seasons", link: "climate.html" },         
          { text: "Time & Language", link: "time-language.html" },
          { text: "Currency", link: "money.html" },
          { text: "Currency Converter", link: "exchange.html" },
          { text: "Geography", link: "geography.html" },
          { text: "History", link: "history.html" },
          { text: "Culture & People", link: "culture.html" },        
          { text: "Costa Rican Cuisine", link: "cuisine.html" },        
          { text: "Biodiversity", link: "biodiversity.html" },
          { text: "Media", link: "media.html" }
        ]
      },
      tips: {
        title: "Travel Tips",
        buttons: [
          { text: "Packing List", link: "#packing" },
          { text: "Safety Tips", link: "#safety" },
          { text: "Budget Guide", link: "#budget" },
          { text: "Local Customs", link: "#customs" },
          { text: "Transportation", link: "#transport" },
          { text: "Health Advice", link: "#health" },
          { text: "Money Tips", link: "#money" },
          { text: "Communication", link: "#communication" }
        ]
      },
      tours: {
        title: "Tours & Attractions",
        buttons: [
          { text: " Popular Tours & Activities", link: "poptours.html" },
          { text: "Eco Tours", link: "eco-tours.html" },
          { text: "Adventure Tours", link: "adventure-tours.html" },
          { text: "Beach Tours", link: "beach-tours.html" },
          { text: "Cultural Tours", link: "cultural-tours.html" },
          { text: "Family-Friendly Options", link: "family-tours.html" },
          { text: "Seasonal & Special Interest Tours", link: "seasonal-tours.html" },
        //  { text: "Regional Highlights", link: "#cultural" },
        //  { text: "Must-Visit Attractions", link: "#cultural" },
          { text: "Travel Tips for Costa Rica", link: "practical-info.html" },
         /* { text: "Volcano Tours", link: "#volcano" },
          { text: "Rainforest Tours", link: "#rainforest" },
          { text: "Coffee Tours", link: "#coffee" },
          { text: "Wildlife Tours", link: "#wildlife-tours" }*/
        ]
      },
      itineraries: {
        title: "Travel Itineraries",
        buttons: [
          { text: "7-Day Itinerary", link: "7-day-itinerary.html" },
          { text: "10-Day Itinerary", link: "#10day" },
          { text: "Family Vacation", link: "#family" },
          { text: "Honeymoon", link: "#honeymoon" },
          { text: "Adventure Trip", link: "#adventure-trip" },
          { text: "Luxury Vacation", link: "#luxury" },
          { text: "Budget Travel", link: "#budget-trip" },
          { text: "Surfing Holiday", link: "#surfing" }
        ]
      }
    };
  
    // Инициализация событий
    function initEvents() {
      // Клик по пунктам главного меню
      menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const section = this.dataset.section;
          openModal(section);
        });
      });
      
      // Закрытие модального окна
      closeModalBtn.addEventListener('click', closeModal);
      modalOverlay.addEventListener('click', closeModal);
      
      // Закрытие по ESC
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
      });
    }
  
    // Открытие модального окна
    function openModal(section) {
      if (!sectionsData[section]) return;
      
      // Создаем заголовок
      const title = document.createElement('h2');
      title.className = 'modal-title';
      title.textContent = sectionsData[section].title;
      
      // Создаем контейнер для кнопок
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'modal-buttons';
      
      // Создаем кнопки
      sectionsData[section].buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'modal-btn';
        button.textContent = btn.text;
        button.addEventListener('click', () => {
          window.location.href = btn.link;
        });
        buttonsContainer.appendChild(button);
      });
      
      // Очищаем и заполняем модальное окно
      modalContent.innerHTML = '';
      modalContent.appendChild(title);
      modalContent.appendChild(buttonsContainer);
      
      // Показываем модальное окно
      modal.style.display = 'block';
      modalOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';

      modalOverlay.style.display = 'block';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Запускаем анимацию после отображения элементов
      setTimeout(() => {
        modalOverlay.classList.add('active');
        modal.classList.add('active');
      }, 10);
    }
  
    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        
        // Ждем завершения анимации перед скрытием
        setTimeout(() => {
          modal.style.display = 'none';
          modalOverlay.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 300);
      }
  
    // Инициализируем приложение
    initEvents();
  });