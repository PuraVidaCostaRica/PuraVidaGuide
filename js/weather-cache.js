// Weather Widget with Caching
class WeatherWidget {
  constructor() {
    this.config = {
      cities: {
        'san-jose': { id: 3621849, name: "San José" },
        'liberia': { id: 3623076, name: "Liberia" }
      },
      apiKey: process.env.OPENWEATHER_API_KEY,
      units: "metric",
      cacheHours: 2,
      refreshInterval: 60 * 60 * 1000 // 1 hour
    };

    this.init();
  }

  init() {
    if (!this.checkElements()) return;

    // Load cached data immediately
    this.loadCachedData();

    // Fetch fresh data
    this.loadAllWeather();
    this.interval = setInterval(() => this.loadAllWeather(), this.config.refreshInterval);
  }

  checkElements() {
    this.boxes = {};
    let allFound = true;

    Object.keys(this.config.cities).forEach(cityKey => {
      this.boxes[cityKey] = document.querySelector(`.weather-box[data-city="${cityKey}"]`);
      if (!this.boxes[cityKey]) {
        console.error(`Element not found for ${cityKey}`);
        allFound = false;
      }
    });

    return allFound;
  }

  loadCachedData() {
    Object.keys(this.config.cities).forEach(cityKey => {
      const cached = this.getCachedWeather(cityKey);
      if (cached) {
        this.updateWeatherBox(cityKey, cached);
      }
    });
  }

  getCostaRicaTime(date = new Date()) {
    const costaRicaOffset = -6 * 60; // UTC-6 в минутах
    return new Date(date.getTime() + (date.getTimezoneOffset() + costaRicaOffset) * 60000);
  }

  async loadAllWeather() {
    try {
      await Promise.all(
        Object.keys(this.config.cities).map(cityKey =>
          this.loadWeather(cityKey).catch(e => console.error(e))
        )
      );
    } catch (error) {
      console.error("Weather update failed:", error);
    }
  }

  async loadWeather(cityKey) {
    try {
      this.showLoading(cityKey);
      const data = await this.fetchWeatherData(cityKey);
      this.cacheWeatherData(cityKey, data);
      this.updateWeatherBox(cityKey, data);
    } catch (error) {
      console.warn(`Error loading ${cityKey}:`, error);

      const cached = this.getCachedWeather(cityKey);
      if (cached) {
        console.info(`Using cached data for ${cityKey}`);
        this.updateWeatherBox(cityKey, cached);
      } else {
        this.showError(cityKey);
      }
    }
  }

  async fetchWeatherData(cityKey) {
    const cityId = this.config.cities[cityKey].id;
    const apiKey = process.env.OPENWEATHER_API_KEY || this.config.apiKey;
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${this.config.units}&appid=${this.config.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error;
    }
  }

  cacheWeatherData(cityKey, data) {
    try {
      const cache = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(`weather_${cityKey}`, JSON.stringify(cache));
      // Сохраняем время последнего обновления в localStorage (или в другом месте, например, в кеше)
      const currentTime = this.getCostaRicaTime();
      localStorage.setItem(`${cityKey}-last-updated`, currentTime.toISOString());  // Сохраняем в формате ISO
    } catch (e) {
      console.error('Cache save failed:', e);
    }
  }

  getCachedWeather(cityKey) {
    try {
      const cache = localStorage.getItem(`weather_${cityKey}`);
      if (!cache) return null;

      const parsed = JSON.parse(cache);
      const cacheAge = Date.now() - parsed.timestamp;
      const maxAge = this.config.cacheHours * 60 * 60 * 1000;

      return cacheAge <= maxAge ? parsed.data : null;
    } catch (e) {
      console.error('Cache read failed:', e);
      return null;
    }
  }

  updateWeatherBox(cityKey, data) {
    const box = this.boxes[cityKey];
    if (!box) return;

    const city = this.config.cities[cityKey];
    const weather = data.weather[0];
    const main = data.main;

    // Time calculation for Costa Rica (UTC-6)
    const now = new Date();
    const costaRicaOffset = -6 * 60; // UTC-6 in minutes
   // const lastUpdatedTime = new Date(localStorage.getItem(`${cityKey}-last-updated`));
    const localTime = new Date(now.getTime() + (now.getTimezoneOffset() + costaRicaOffset) * 60000);
    const hours = localTime.getHours();
    const isNight = hours >= 19 || hours < 6;

    // Set data
    box.querySelector('.weather-location').textContent = city.name;
    box.querySelector('.weather-temp').textContent =
      `${Math.round(main.temp)}°C / ${Math.round((main.temp * 9 / 5) + 32)}°F`;
    box.querySelector('.weather-desc').textContent =
      weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
    box.querySelector('.weather-humidity').textContent =
      `Humidity: ${main.humidity}%`;

    // Set icon
    const icon = this.getWeatherIcon(weather.id, isNight);
    const iconElement = box.querySelector('.weather-icon i');
    iconElement.className = `fas ${icon.name}`;
    iconElement.style.color = icon.color;

    // Обновляем визуально строку с временем
    const updatedEl = box.querySelector('.weather-updated');
    if (updatedEl) {
      const lastUpdatedTime = new Date(localStorage.getItem(`${cityKey}-last-updated`));
      const hours = lastUpdatedTime.getHours().toString().padStart(2, '0');
      const minutes = lastUpdatedTime.getMinutes().toString().padStart(2, '0');
      updatedEl.textContent = `Updated: ${hours}:${minutes}`;
      updatedEl.style.fontSize = '0.7em';
      updatedEl.style.opacity = '0.6';
    }

  }

  getWeatherIcon(weatherId, isNight) {
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300)
      return { name: 'fa-bolt' };

    // Drizzle/Rain
    if (weatherId >= 300 && weatherId < 600)
      return { name: 'fa-cloud-rain' };

    // Snow
    if (weatherId >= 600 && weatherId < 700)
      return { name: 'fa-snowflake' };

    // Fog/Mist
    if (weatherId >= 700 && weatherId < 800)
      return { name: 'fa-smog' };

    // Clear
    if (weatherId === 800)
      return {
        name: isNight ? 'fa-moon' : 'fa-sun'
      };

    // Clouds
    if (weatherId === 801)
      return {
        name: isNight ? 'fa-cloud-moon' : 'fa-cloud-sun'
      };

    if (weatherId > 801)
      return { name: 'fa-cloud' };

    // Default
    return { name: 'fa-question', color: '#ccc' };
  }

  showLoading(cityKey) {
    const box = this.boxes[cityKey];
    if (!box) return;

    box.querySelector('.weather-temp').textContent = 'Loading...';
    box.querySelector('.weather-icon i').className = 'fas fa-spinner fa-spin';
  }

  showError(cityKey) {
    const box = this.boxes[cityKey];
    if (!box) return;

    box.querySelector('.weather-temp').textContent = '--°C / --°F';
    box.querySelector('.weather-icon i').className = 'fas fa-exclamation-triangle';
    box.querySelector('.weather-icon i').style.color = 'red';
    box.querySelector('.weather-desc').textContent = 'Data unavailable';
  }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
  new WeatherWidget();
});