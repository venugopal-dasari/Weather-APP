# 🌤️ Weather App

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for cities worldwide with detailed metrics and an intuitive user interface.

## ✨ Features

- **Real-time Weather Data**: Get current weather information from OpenWeatherMap API
- **Global City Search**: Search for any city worldwide with autocomplete
- **Detailed Weather Metrics**:
  - Temperature & Visibility
  - Wind & Atmospheric conditions
  - Humidity & Precipitation
  - Location details
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Dark Theme**: Rich color scheme with excellent contrast
- **Weather Condition Colors**: Dynamic colors based on weather conditions
- **Temperature Gradient**: Color-coded temperature display

## 🚀 Live Demo

[View the live application here](https://venugopal-dasari.github.io/Weather-APP)

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/venugopal-dasari/Weather-APP.git
   cd Weather-APP
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Key Setup

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the project root
3. Add your API key: `VITE_OPENWEATHER_API_KEY=your_api_key_here`

## 📱 Usage

1. **Search for a City**: Use the search bar to find any city worldwide
2. **Use Current Location**: Click the location icon to get weather for your current location
3. **Navigate Sections**: Use the navigation buttons to explore different weather details:
   - **Location Details**: City information and coordinates
   - **Wind & Atmospheric**: Wind speed, direction, and pressure
   - **Humidity & Precipitation**: Moisture and rain data
   - **Temperature & Visibility**: Temperature ranges and visibility

## 🎨 Design Features

### Color Scheme

- **Background**: Deep navy (`#1A1A2E`) with gradient animations
- **Cards**: Glassmorphism with white transparency
- **Text**: White with varying opacity levels for hierarchy
- **Weather Conditions**: Dynamic colors based on weather type
- **Temperature**: Gradient colors from blue (cold) to red (hot)

### Weather Condition Colors

- **Clear/Sunny**: `#FDB813` (sun yellow)
- **Partly Cloudy**: `#B0BEC5` (light grey)
- **Cloudy**: `#90A4AE` (grey-blue)
- **Rain**: `#4FC3F7` (light blue)
- **Thunderstorm**: `#455A64` (dark slate)
- **Snow**: `#E0F7FA` (icy blue)
- **Fog**: `#CFD8DC` (mist grey)
- **Wind**: `#81D4FA` (sky blue)

## 📁 Project Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── LocationPage.tsx
│   │   ├── WindPage.tsx
│   │   ├── HumidityPage.tsx
│   │   └── TemperaturePage.tsx
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   ├── WeatherDashboard.tsx
│   ├── WeatherDetails.tsx
│   ├── WeatherMetrics.tsx
│   └── Navigation.tsx
├── services/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 🚀 Deployment

### GitHub Pages

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch or `main` branch with `/docs` folder

### Netlify

1. **Connect your GitHub repository to Netlify**
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Add environment variable**: `VITE_OPENWEATHER_API_KEY`

### Vercel

1. **Import your GitHub repository to Vercel**
2. **Set build command**: `npm run build`
3. **Set output directory**: `dist`
4. **Add environment variable**: `VITE_OPENWEATHER_API_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Contact me at [your-email@example.com]

---

Made with ❤️ by [Your Name]
