import './style.css'

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

  <main class="card" id="card">
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
  </main>
`
