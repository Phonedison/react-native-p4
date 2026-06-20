import { calcularMetricasClima } from "../climaHelper";

export function obterIconClima(codigoClima: number) {
  return calcularMetricasClima({
    hourly: {
      weather_code: [codigoClima],
      temperature_2m: [],
      apparent_temperature: [],
    },
  }).iconStatusClima;
}
