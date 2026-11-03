import type {
  CombinedWeatherData,
  ForecastResponse,
  GeocodingResponse,
  GeocodingResult,
  WeatherResult,
} from '../types/weather.ts'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

const REQUIRED_CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'wind_speed_10m',
  'wind_direction_10m',
  'precipitation_probability',
  'weather_code',
] as const

export async function searchCity(
  cityName: string,
): Promise<GeocodingResult | null> {
  const trimmedName = cityName.trim()
  if (!trimmedName) return null

  const url = new URL(GEOCODING_URL)
  url.searchParams.set('name', trimmedName)
  url.searchParams.set('count', '1')
  url.searchParams.set('language', 'pt')
  url.searchParams.set('format', 'json')

  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const data: GeocodingResponse = await response.json()
    const result = data.results?.[0]
    if (!result) return null

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country_code: result.country_code,
      timezone: result.timezone,
    }
  } catch {
    return null
  }
}

export async function getWeather(
  latitude: number,
  longitude: number,
  timezone: string,
): Promise<WeatherResult | null> {
  if (
    latitude === undefined ||
    longitude === undefined ||
    !timezone ||
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    return null
  }

  const url = new URL(FORECAST_URL)
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('timezone', timezone)
  url.searchParams.set(
    'current',
    'precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,weather_code',
  )

  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const data: ForecastResponse = await response.json()
    const { current, current_units } = data
    if (!current || !current_units) return null

    const hasAllRequiredFields = REQUIRED_CURRENT_FIELDS.every(
      (field) => current[field] !== undefined,
    )
    if (!hasAllRequiredFields) return null

    return { current, current_units }
  } catch {
    return null
  }
}

export async function searchWeather(
  cityName: string,
): Promise<CombinedWeatherData | null> {
  const city = await searchCity(cityName)
  if (!city) return null

  const weather = await getWeather(city.latitude, city.longitude, city.timezone)
  if (!weather) return null

  return {
    name: city.name,
    country_code: city.country_code,
    timezone: city.timezone,
    current: weather.current,
    current_units: weather.current_units,
  }
}
