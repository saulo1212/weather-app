export interface GeocodingResult {
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

export interface CurrentWeather {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  precipitation: number
  precipitation_probability: number
  weather_code: number
  wind_speed_10m: number
  wind_direction_10m: number
}

export interface CurrentWeatherUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  is_day: string
  precipitation: string
  precipitation_probability: string
  weather_code: string
  wind_speed_10m: string
  wind_direction_10m: string
}

export interface ForecastResponse {
  current?: CurrentWeather
  current_units?: CurrentWeatherUnits
}

export interface WeatherResult {
  current: CurrentWeather
  current_units: CurrentWeatherUnits
}

export interface CombinedWeatherData {
  name: string
  country_code: string
  timezone: string
  current: CurrentWeather
  current_units: CurrentWeatherUnits
}
