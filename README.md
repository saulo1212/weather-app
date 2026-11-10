# Clima

Aplicação web para consultar o clima atual de qualquer cidade do mundo, usando a API pública [Open-Meteo](https://open-meteo.com/).

🔗 **Demo:** https://saulo1212.github.io/weather-app/

## Funcionalidades

- Busca de cidade por nome (geocoding + previsão em sequência)
- Temperatura, sensação térmica, umidade, precipitação e vento (velocidade + direção cardinal)
- Condição do tempo e data formatados em português
- Ícone de dia/noite
- Layout responsivo (desktop e mobile)

## Stack

- [Vite](https://vitejs.dev/)
- TypeScript (strict mode)
- HTML + CSS vanilla (sem framework)

## Estrutura do projeto

O código da aplicação está em [`vite-project/`](./vite-project):

```
vite-project/
├── src/
│   ├── main.ts              # Entry point, orquestra a UI
│   ├── style.css            # Estilos globais
│   ├── services/
│   │   └── openMeteo.ts     # Chamadas à API Open-Meteo
│   ├── utils/
│   │   ├── weatherCode.ts   # Mapeamento WMO → PT
│   │   └── windDirection.ts # Conversão graus → cardinal
│   ├── types/
│   │   └── weather.ts       # Interfaces TypeScript
│   └── assets/               # Ícones (sol, lua)
└── .docs/
    ├── prd.md                # Especificação do produto
    └── tasks.md              # Tarefas de implementação
```

## Como executar localmente

```bash
cd vite-project
yarn install
yarn dev
```

Outros scripts disponíveis (dentro de `vite-project/`):

```bash
yarn build     # build de produção
yarn preview   # preview do build de produção
```

## Deploy

O deploy é automático: a cada push na branch `main`, o workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builda o projeto e publica o conteúdo de `vite-project/dist` no GitHub Pages via GitHub Actions.
