import * as Location from "expo-location";
import { useState } from "react";
import { geoCodeApi, openMeteoApi } from "../services/API";

export type ResultadoBuscaLocal = {
  id: number; //id da cidade/local
  name: string; //nome da cidade
  latitude: number;
  longitude: number;
  country: string; // País
  admin1?: string; //Nome do Estado
};

export type DadosClima = {
  nomeCidade?: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number; // Tempo do servidor resposta
  utc_offset_seconds: number; // Diferença do fuso horário com UTC
  timezone: string; // Nome da região do fuso horário
  timezone_abbreviation: string; // Sigla do fuso horário
  elevation: number; // qtd metros acima do mar

  /* Previsões a cada 15 minutos */
  minutely_15?: {
    /* _Xm -> representa 'X metros' do solo */
    time: string[]; // Lista de horários/datas das medições (formato ISO 8601).
    temperature_2m: number[]; // Temperatura do ar medida do solo (°C).
    relative_humidity_2m: number[]; // Umidade relativa do ar medida do solo (%).
    wind_speed_10m: number[]; // Velocidade do vento medida (km/h).
    wind_gusts_10m: number[]; // Velocidade das rajadas de vento (km/h).
    is_day: number[]; // Indica se é dia (1) ou noite (0) naquele horário.
    apparent_temperature: number[]; // Sensação térmica percebida pelo corpo humano (°C).
    precipitation: number[]; // Quantidade total de precipitação líquida/sólida acumulada (mm).
    rain: number[]; // Quantidade específica de chuva líquida acumulada (mm).
    dew_point_2m: number[]; // Ponto de orvalho (temperatura em que o ar condensa) (°C).
  };

  /* Previsões de hora em hora */
  hourly?: {
    /* _Xcm ou _Xm -> representa 'X distancia' do solo */
    time: string[]; // Lista de horários de cada hora do dia.
    temperature_2m: number[]; // Temperatura do ar de hora em hora (°C).
    rain: number[]; // Volume de chuva esperado para aquela hora (mm).
    cloud_cover: number[]; // Cobertura total de nuvens no céu (%).
    cloud_cover_low: number[]; // Cobertura de nuvens baixas - neblina/estratos (%).
    cloud_cover_mid: number[]; // Cobertura de nuvens médias - altocumulus (%).
    cloud_cover_high: number[]; // Cobertura de nuvens altas - cirrus (%).
    wind_speed_10m: number[]; // Velocidade média do vento naquela hora (km/h).
    snowfall: number[]; // Quantidade de neve acumulada (cm).
    precipitation: number[]; // Precipitação total combinada (chuva + neve) (mm).
    precipitation_probability: number[]; // Probabilidade/Chance de chover (de 0% a 100%).
    wind_direction_10m: number[]; // Direção do vento em graus azimutais (0° = Norte, 180° = Sul).
    soil_temperature_6cm: number[]; // Temperatura do solo a 6 centímetros de profundidade (°C).
    relative_humidity_2m: number[]; // Umidade relativa do ar horária (%).
    dew_point_2m: number[]; // Ponto de orvalho horário (°C).
    apparent_temperature: number[]; // Sensação térmica horária (°C).
  };
};

export type Coordenadas = {
  latitude: number;
  longitude: number;
};

export const useBuscarClima = () => {
  const [locaisEncontrados, setLocaisEncontrados] = useState<
    ResultadoBuscaLocal[]
  >([]);
  const [dadosClima, setDadosClima] = useState<DadosClima | null>(null);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscarCidade = async (nomeCidade: string) => {
    if (!nomeCidade || nomeCidade.trim().length < 3) {
      setErro("Digite pelo menos 3 carateres para buscar.");
      return;
    }

    setLoading(true);
    setErro(null);
    setDadosClima(null); //limpa

    try {
      const response = await geoCodeApi.get<{
        results?: ResultadoBuscaLocal[];
      }>("/search", {
        params: { name: nomeCidade, count: 10, language: "pt" },
      });

      setLocaisEncontrados(response.data.results || []);
    } catch (error) {
      console.error(error);
      setErro(
        "Erro! Não foi possível buscar as localizações.  => erro em buscarCidade",
      );
    } finally {
      setLoading(false);
    }
  };

  const buscarClimaPorCoodenadas = async (
    latitude: number,
    longitude: number,
    nomeCidade?: string,
  ) => {
    setLoading(true);
    setErro(null);

    const params = {
      latitude,
      longitude,
      forecast_days: 1,
      hourly: [
        "temperature_2m",
        "rain",
        "cloud_cover",
        "cloud_cover_low",
        "cloud_cover_mid",
        "cloud_cover_high",
        "wind_speed_10m",
        "snowfall",
        "precipitation",
        "precipitation_probability",
        "wind_direction_10m",
        "soil_temperature_6cm",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
      ].join(","),

      minutely_15: [
        "temperature_2m",
        "relative_humidity_2m",
        "wind_speed_10m",
        "wind_gusts_10m",
        "is_day",
        "apparent_temperature",
        "precipitation",
        "rain",
        "dew_point_2m",
      ].join(","),
    };

    try {
      const response = await openMeteoApi.get<DadosClima>("/forecast", {
        params,
      });
      setDadosClima({
        ...response.data,
        nomeCidade: nomeCidade || "Localização Atual",
      });
    } catch (error) {
      console.error(
        "Error! Não fom possível carregar os dados do clime. => erro em buscarClimaPorCoodenadas",
      );
    } finally {
      setLoading(false);
    }
  };

  const buscarTemperatura = async (
    latitude: number,
    longitude: number,
  ): Promise<number | null> => {
    try {
      const response = await openMeteoApi.get<any>("/forecast", {
        params: {
          latitude,
          longitude,
          current: "temperature_2m",
        },
      });
      return response.data.current?.temperature_2m ?? null;
    } catch {
      return null;
    }
  };

  const limparResultados = () => {
    setLocaisEncontrados([]);
    setErro(null);
  };

  return {
    locaisEncontrados, // -> lista de locais após a busca da cidade pelo nome
    dadosClima, // -> objeto com todos os dados meteorológicos da cidade selecionada
    loading, // -> indica se a função está carregando ou não
    erro, // -> Mensagem de erro informando o local
    buscarCidade, // -> método para buscar cidade pelo nome
    buscarClimaPorCoodenadas, // buscarClimaPorCoodenadas(latitude, longitude)-> busca dados climaticos passando latitude e longitude
    limparResultados, // Método para limpar os resultados da tela de pesquisa quando o usuário excluir o que digitou
    buscarTemperatura, // Método para buscar a temperatura especifica da cidade sem sobreescrever
  };
};

export const useBuscarClimaCidade = () => {
  const [loading, setLoading] = useState(false);
  const [climaLocal, setClimaLocal] = useState<any>(null);

  const buscarClimaLocal = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await openMeteoApi.get("/forecast", {
        params: {
          latitude: lat,
          longitude: lon,
          forecast_days: 1,
          hourly: [
            "temperature_2m",
            "rain",
            "cloud_cover",
            "cloud_cover_low",
            "cloud_cover_mid",
            "cloud_cover_high",
            "wind_speed_10m",
            "snowfall",
            "precipitation",
            "precipitation_probability",
            "wind_direction_10m",
            "soil_temperature_6cm",
            "relative_humidity_2m",
            "dew_point_2m",
            "apparent_temperature",
          ],

          minutely_15: [
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "wind_gusts_10m",
            "is_day",
            "apparent_temperature",
            "precipitation",
            "rain",
            "dew_point_2m",
          ],
        },
      });
      setClimaLocal(response.data);
    } catch (error) {
      console.error("Erro ao buscar clima da cidade infordado:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    climaLocal,
    loading,
    buscarClimaLocal,
  };
};

export const useMyLocation = () => {
  const [coordenadas, setCoordenadas] = useState<Coordenadas>();
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCoordenadas = async (): Promise<Coordenadas | null> => {
    setLoading(true);
    setErro(null);

    //pega a permissão do usuário
    let { status } = await Location.requestForegroundPermissionsAsync();

    //verifica a permissão
    if (status !== "granted") {
      setErro("Permissão de acesso à localização foi negada");
      setLoading(false);
      return null;
    }

    try {
      const localizacao = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = localizacao.coords;

      const novasCoordenadas = { latitude, longitude };
      setCoordenadas({ latitude, longitude });

      return novasCoordenadas;
    } catch (err) {
      console.log(err);
      alert("erro, Não foi possí9vel obter a localização atual.");
      setErro("Erro");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { coordenadas, erro, loading, getCoordenadas };
};
