// Costa Rica Time Widget

class TimeWidget {
    constructor() {
        this.timeElement = document.getElementById('costaRicaTime');
        this.dateElement = document.getElementById('costaRicaDate');
        this.timeZone = 'America/Costa_Rica';
        this.updateInterval = 1000; // 1 second
        
        if (this.timeElement && this.dateElement) {
            this.updateTime();
            setInterval(() => this.updateTime(), this.updateInterval);
        }
    }
    
    updateTime() {
        try {
            const currentTime = new Date();
            
            // Time formatting
            const timeOptions = {
                timeZone: this.timeZone,
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            
            // Date formatting
            const dateOptions = {
                timeZone: this.timeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            
            const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
            const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
            
            // Format time: "11:45:32 AM"
            this.timeElement.textContent = timeFormatter.format(currentTime);
            
            // Format date: "Wednesday, April 16, 2025"
            this.dateElement.textContent = dateFormatter.format(currentTime);
        } catch (error) {
            console.error('Time widget error:', error);
            this.timeElement.textContent = '--:-- --';
            this.dateElement.textContent = '-- --';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TimeWidget();
});