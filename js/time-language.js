function updateCostaRicaTime() {
    const options = {
        timeZone: 'America/Costa_Rica',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const now = new Date();

    // Получаем текущее UTC время
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

    // Время в Коста-Рике (UTC−6)
    const costaRicaTime = new Date(utcTime - 6 * 60 * 60 * 1000);

    // Форматируем и выводим текущее время в Коста-Рике
    const costaRicaTimeStr = costaRicaTime.toLocaleTimeString('en-US', options);
    const costaRicaDateStr = costaRicaTime.toLocaleDateString('en-US', options);

    document.getElementById('costaRicaTime').textContent = costaRicaTimeStr.split(',')[1].trim();
    document.getElementById('costaRicaDate').textContent = costaRicaDateStr.split(',')[0] + ',' + costaRicaDateStr.split(',')[1];

    document.getElementById('currentHour').textContent = costaRicaTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });

    const cities = [
        { name: 'New York', selector: '.ny-time', timeZone: 'America/New_York' },
        { name: 'London', selector: '.london-time', timeZone: 'Europe/London' },
        { name: 'Moscow', selector: '.moscow-time', timeZone: 'Europe/Moscow' },
        { name: 'Tokyo', selector: '.tokyo-time', timeZone: 'Asia/Tokyo' }
    ];
    
    cities.forEach(city => {
        const cityTime = new Date().toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            timeZone: city.timeZone
        });
        document.querySelector(city.selector).textContent = cityTime;
    });
    
}

updateCostaRicaTime();
setInterval(updateCostaRicaTime, 1000);
