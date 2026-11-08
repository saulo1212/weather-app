import './style.css'
import { searchWeather } from './services/openMeteo.ts'
import type { CombinedWeatherData } from './types/weather.ts'

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

function renderResult(_data: CombinedWeatherData): void {
  // O preenchimento da sidebar e da área principal é feito na Fase 5.
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
