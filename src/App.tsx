import { ThemeProvider } from './components/ThemeProvider';
import { WeatherProvider } from './components/WeatherProvider';
import { TopAppBar } from './components/TopAppBar';
import { PageHeader } from './components/PageHeader'
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { WeatherMap } from './components/Map';
import {HourlyWeatherTabs} from './components/HourlyWeatherTabs'

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
        <main className='py-4'>
          <div className='container' >
            <PageHeader />
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <CurrentWeatherCard />
              <WeatherMap />
            </div>
            <HourlyWeatherTabs />
          </div>
        </main>
        <footer className='pb-5'>
          <p className='text-center text-muted-foreground'>
            Made with ❤️ by <a href=''>VinayJ</a>
          </p>
        </footer>
      </WeatherProvider>
    </ThemeProvider>
  )
}

export default App