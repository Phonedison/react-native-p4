export interface ClimaProcessado {
  tempMinima: string | number;
  tempMaxima: string | number;
  sensacaoTermica: string | number;
  statusClima: string;
  iconStatusClima: string;
}

export const calcularMetricasClima = (dadosClima: any): ClimaProcessado => {
  if (!dadosClima?.hourly) {
    return {
      tempMinima: "--",
      tempMaxima: "--",
      sensacaoTermica: "--",
      statusClima: "Céu Limpo",
      iconStatusClima: "",
    };
  }

  const temperaturasDoDia = dadosClima.hourly.temperature_2m || [];

  const tempMinima = temperaturasDoDia.length
    ? Math.round(Math.min(...temperaturasDoDia))
    : "--";

  const tempMaxima = temperaturasDoDia.length
    ? Math.round(Math.max(...temperaturasDoDia))
    : "--";

  const sensacaoTermica =
    dadosClima.hourly.apparent_temperature?.[0] !== undefined
      ? Math.round(dadosClima.hourly.apparent_temperature[0])
      : "--";

  const codigoClima = dadosClima.hourly.weather_code?.[0] ?? 0;

  let statusClima = "";
  let iconStatusClima = "";

  switch (codigoClima) {
    case 0:
      statusClima = "Céu Limpo";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/sunny.png";
      break;

    case 1:
    case 2:
      statusClima = "Parcialmente Nublado";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/partly_cloudy.png";
      break;

    case 3:
      statusClima = "Nublado";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/cloudy.png";
      break;

    case 45:
    case 48:
      statusClima = "Névoa / Nevoeiro";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/windy_breezy.png";
      break;

    case 51:
    case 53:
    case 55:
      statusClima = "Garoa / Chuva Leve";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/drizzle.png";
      break;

    case 61:
    case 80:
      statusClima = "Chuva Fraca";
      iconStatusClima =
        "https://maps.gstatic.com/weather/v1/scattered_showers.svg";
      break;

    case 63:
    case 65:
    case 81:
    case 82:
      statusClima = "Chuvoso";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/showers.png";
      break;

    case 71:
    case 73:
    case 75:
    case 85:
    case 86:
      statusClima = "Neve";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/snow.png";
      break;

    case 95:
    case 96:
    case 99:
      statusClima = "Tempestade";
      iconStatusClima =
        "https://maps.gstatic.com/weather/v1/scattered_snow.png";
      break;

    default:
      statusClima = "Céu Limpo";
      iconStatusClima = "https://maps.gstatic.com/weather/v1/sunny.png";
  }

  return {
    tempMinima,
    tempMaxima,
    sensacaoTermica,
    statusClima,
    iconStatusClima,
  };
};
