document.addEventListener('DOMContentLoaded', function() {
  // Универсальная функция для управления аудио
  function setupAudioPlayer(audioId, playerContainerClass) {
    const container = document.querySelector(`.${playerContainerClass}`);
    if (!container) return;
    
    const audio = container.querySelector('audio');
    const playBtn = container.querySelector('.play-btn');
    const pauseBtn = container.querySelector('.pause-btn');
    const timeDisplay = container.querySelector('.player-time');

    if (!audio || !playBtn || !pauseBtn || !timeDisplay) return;

    // Форматирование времени
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00 / 0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Обновление времени
    audio.addEventListener('timeupdate', function() {
      const currentTime = formatTime(audio.currentTime);
      const duration = formatTime(audio.duration);
      timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    // Загрузка метаданных
    audio.addEventListener('loadedmetadata', function() {
      timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    // Кнопка play
    playBtn.addEventListener('click', function() {
      audio.play();
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
    });

    // Кнопка pause
    pauseBtn.addEventListener('click', function() {
      audio.pause();
      pauseBtn.style.display = 'none';
      playBtn.style.display = 'inline-block';
    });

    // Сброс при завершении
    audio.addEventListener('ended', function() {
      pauseBtn.style.display = 'none';
      playBtn.style.display = 'inline-block';
    });
  }

  // Инициализация плееров
  setupAudioPlayer('BirdAudio', 'bird-card');
  setupAudioPlayer('anthemAudio', 'anthem-card');
});