import './style.css'
import { searchWeather } from './services/openMeteo.ts'
import { getWeatherDescription } from './utils/weatherCode.ts'
import { getCardinalDirection } from './utils/windDirection.ts'
import type { CombinedWeatherData } from './types/weather.ts'
import sunIcon from './assets/sun.svg'
import moonIcon from './assets/moon.svg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="search-area">
    <form class="search-form" id="search-form" role="search">
      <input
        type="text"
        id="search-input"
        class="search-input"
        name="city"
        placeholder="Digite o nome da cidade"
        autocomplete="off"
        aria-label="Nome da cidade"
      />
      <button type="submit" id="search-button" class="search-button">Buscar</button>
    </form>
  </header>

  <main class="card" id="card" data-state="empty">
    <div class="state-empty" id="empty-state">
      <p class="state-empty__message">Pesquise uma cidade para ver o clima</p>
    </div>

    <div class="state-loading" id="loading-state">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state-loading__message">Buscando...</p>
    </div>

    <div class="result" id="result">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar__temperature" id="temperature"></div>
        <div class="sidebar__location" id="location"></div>
        <div class="sidebar__date" id="date"></div>
        <div class="sidebar__day-night" id="day-night"></div>
        <div class="sidebar__condition" id="condition"></div>
      </aside>

      <section class="main-area" id="main-area">
        <div class="metrics" id="metrics">
          <div class="metric" id="metric-humidity">
            <span class="metric__label">Umidade</span>
            <span class="metric__value" id="humidity"></span>
          </div>
          <div class="metric" id="metric-apparent">
            <span class="metric__label">Sensação térmica</span>
            <span class="metric__value" id="apparent-temperature"></span>
          </div>
          <div class="metric" id="metric-precipitation">
            <span class="metric__label">Precipitação</span>
            <span class="metric__value" id="precipitation"></span>
          </div>
          <div class="metric" id="metric-wind">
            <span class="metric__label">Vento</span>
            <span class="metric__value" id="wind"></span>
          </div>
        </div>
      </section>
    </div>
  </main>
`

type UiState = 'empty' | 'loading' | 'result'

const form = document.querySelector<HTMLFormElement>('#search-form')!
const input = document.querySelector<HTMLInputElement>('#search-input')!
const button = document.querySelector<HTMLButtonElement>('#search-button')!
const card = document.querySelector<HTMLElement>('#card')!

function setState(state: UiState): void {
  card.dataset.state = state

  const isLoading = state === 'loading'
  input.disabled = isLoading
  button.disabled = isLoading
}

function formatDate(timezone: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  }).format(new Date())
}

function el(id: string): HTMLElement {
  return document.getElementById(id)!
}

function renderResult(data: CombinedWeatherData): void {
  const { name, country_code, timezone, current, current_units } = data

  // --- Sidebar ---
  el('temperature').textContent =
    `${current.temperature_2m}${current_units.temperature_2m}`

  el('location').textContent = `${name}, ${country_code}`

  el('date').textContent = formatDate(timezone)

  const isDay = current.is_day === 1
  el('day-night').innerHTML = `
    <img class="day-night__icon" src="${isDay ? sunIcon : moonIcon}" alt="" width="24" height="24" />
    <span>${isDay ? 'Dia' : 'Noite'}</span>
  `

  el('condition').textContent = getWeatherDescription(current.weather_code)

  // --- Área principal ---
  el('humidity').textContent =
    `${current.relative_humidity_2m}${current_units.relative_humidity_2m}`

  el('apparent-temperature').textContent =
    `${current.apparent_temperature}${current_units.apparent_temperature}`

  el('precipitation').textContent =
    `${current.precipitation_probability}${current_units.precipitation_probability}`

  const cardinal = getCardinalDirection(current.wind_direction_10m)
  el('wind').textContent =
    `${current.wind_speed_10m} ${current_units.wind_speed_10m} · ${current.wind_direction_10m}${current_units.wind_direction_10m} (${cardinal})`

  setState('result')
}

async function handleSearch(): Promise<void> {
  const cityName = input.value.trim()
  if (!cityName) return

  setState('loading')

  const data = await searchWeather(cityName)
  if (data) {
    renderResult(data)
  } else {
    setState('empty')
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  void handleSearch()
})

setState('empty')
