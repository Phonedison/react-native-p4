# 🌦️ Clima Tempo

Aplicativo mobile de previsão do tempo desenvolvido em **React Native** com **Expo**, como projeto em grupo do **Serratec**. Permite consultar o clima da localização atual via GPS, buscar cidades pelo nome e salvar locais favoritos para acompanhamento rápido.

## 📱 Funcionalidades

- **Clima da localização atual**: obtém a posição via GPS e exibe a previsão do tempo em tempo real, com atualização automática a cada 1 minuto.
- **Busca de cidades**: pesquisa por nome (mínimo de 3 caracteres) com preview de temperatura para cada resultado encontrado.
- **Favoritos**: adiciona e remove cidades favoritas, com persistência local via `AsyncStorage`.
- **Detalhes do clima**: temperatura mínima/máxima, sensação térmica e status do clima (com ícone correspondente).
- **Página de membros**: lista os integrantes do grupo com foto e link para o GitHub.

## 🛠️ Tecnologias

- [React Native]  + [Expo]
- [TypeScript]
- [React Navigation] (Stack + Bottom Tabs)
- [Axios] — consumo de APIs
- [Open-Meteo API] — previsão do tempo e geocodificação de cidades
- [Expo Location] — GPS e geolocalização reversa
- [AsyncStorage] — persistência local dos favoritos
- [React Native Gesture Handler] / [Safe Area Context]

## 📂 Estrutura do projeto

```
react-native-p4/
├── App.tsx                      # Ponto de entrada, providers globais
├── src/
│   ├── components/
│   │   ├── CardClimaLocal/      # Card principal com o clima da localização atual
│   │   ├── CardMembros/         # Card de cada membro na tela de Membros
│   │   ├── CityResultItem/      # Item de resultado na busca de cidades
│   │   ├── EmptyState/          # Estado vazio da busca
│   │   ├── LocalFavorito/       # Item de cidade favorita na Home
│   │   ├── SearchInput/         # Campo de busca de cidades
│   │   └── Navigators/
│   │       ├── Stack/           # Navegação em pilha (Home, Busca, Membros)
│   │       ├── BottomTabs/      # Navegação por abas (Home, Membros)
│   │       └── IconNavigators/  # Ícones das abas
│   ├── contexts/
│   │   └── FavoritosContext.tsx # Contexto global de favoritos (add/remove/persistência)
│   ├── hooks/
│   │   └── index.tsx            # Métodos usados no projeto
│   ├── screens/
│   │   ├── Home/                # Tela inicial com clima atual e favoritos
│   │   ├── Search/               # Tela de busca de cidades
│   │   └── Members/               # Tela com os membros do grupo
|   |   └── Climate /              # Tela com detalhes de clima
│   ├── services/
│   │   └── API/                  # Instâncias do Axios (Open-Meteo e Geocoding)
│   └── utils/
│       ├── climaHelper/          # Cálculo de métricas do clima (min, max, status, ícone)
│       ├── globalStyles/         # Cores e estilos compartilhados
│       └── routes/               # Componente raiz de rotas
└── assets/                       # Ícones e imagens do app
```

## 🚀 Como executar

### Pré-requisitos

- [Node.js] instalado
- App **Expo Go** no celular ([Android] / [iOS]) ou um emulador configurado

### Passos

```bash
# Clone o repositório
git clone https://github.com/Phonedison/react-native-p4.git

# Acesse a pasta do projeto
cd react-native-p4

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

Após o `npm start`, escaneie o QR Code com o app **Expo Go** ou escolha uma das opções abaixo:

```bash
npm run android   # Abre no emulador/dispositivo Android
npm run ios       # Abre no simulador iOS
npm run web       # Abre no navegador
```

## 🌐 APIs utilizadas

O projeto consome a API gratuita [Open-Meteo](https://open-meteo.com/), sem necessidade de chave de API:

- **Geocoding API** (`geocoding-api.open-meteo.com`) — busca de cidades pelo nome
- **Weather Forecast API** (`api.open-meteo.com`) — dados de previsão do tempo por coordenadas (temperatura, umidade, vento, chuva, etc.)

## 👥 Membros do grupo

| Nome | GitHub |
|---|---|
| Igor Brian | [@Bryanxrt] |
| João Vitor Clemente Ferreira | [@JClemente-web] |
| João Pedro Motta | [@joaopedrobr3] |
| Lucas Leal da Silva | [@Phonedison] |
| Matheus | [@zMatheus77] |
| Yan Martins de Oliveira | [@YanYMO] |

## 👥 Funções do grupo

Tela Principal  | Lucas e Yan |
Tela de Pesquisa  | João Pedro  |
Tela de detalhes | Igor e João Vitor |
Tela de Membros | Lucas |

## 📄 Licença

Projeto acadêmico desenvolvido para fins de estudo no curso da **Serratec**.
