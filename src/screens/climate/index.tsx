import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../../components/Navigators/Stack";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { openMeteoApi } from "../../services/API";
import { CardClimaLocal } from "../../components/CardClimaLocal";
import { calcularMetricasClima } from "../../utils/climaHelper";
import CardDatails from "../../components/CardDatails";

type ClimateRouteProp = RouteProp<
  RootStackParamList,
  "WeatherDatailsPage"
>;

type DadosPrevisao = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    weather_code: number[];
    is_day: number[];
  };
};

export const Climate = () => {
  const route = useRoute<ClimateRouteProp>();
  const {localId, nomeCidade, latitude, longitude } = route.params;
  const [clima, setClima] = useState<DadosPrevisao | null>(null);
  const [nextDay, setNextDay] = useState<string[]>([]);
  const date = new Date();
  const metricas = calcularMetricasClima(clima);

  useEffect(() => {
    const datas = []

    for (let i = 0; i < 7; i++) {
      let dateString = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      dateString = (dateString.substring(0, 1).toUpperCase() + dateString.substring(1).replace(".", ""))
      date.setDate(date.getDate() + 1);
      datas.push(dateString)
    } setNextDay(datas)

    async function buscarClima() {
      try {
        const resposta = await openMeteoApi.get("/forecast", {
          params: {
            latitude,
            longitude,

            current: [
              "temperature_2m",
              "apparent_temperature",
              "relative_humidity_2m",
              "wind_speed_10m",
            ].join(","),

            hourly: [
              "temperature_2m",
              "apparent_temperature",
              "weather_code",
              "is_day",
            ].join(","),

            forecast_hours: 12,
            timezone: "auto",
          },
        });

        setClima(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar o clima:", erro);
      }
    }

    buscarClima();
  }, [latitude, longitude]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} >

        <View style={[styles.card, styles.weatherCard]}>
          <CardClimaLocal
            mostrarLocalizacao={localId === 0}
            estaCarregando={!clima}
            dadosClima={clima}
            cidadeGps={nomeCidade}
            erroGps={null}
            statusClima={metricas.statusClima}
            iconStatusClima={metricas.iconStatusClima}
            tempMinima={metricas.tempMinima}
            tempMaxima={metricas.tempMaxima}
            sensacaoTermica={metricas.sensacaoTermica}
          />
        </View>

        <View style={styles.column}>

          <CardDatails clima={clima} />

          <View style={[styles.card, styles.CardDown]}>
            <Text style={[styles.locationDatails, styles.days]}>7 DIAS</Text>
            {nextDay.map((day, index) => (
              <View key={`${day}-${index}`} style={[styles.card, styles.CardDay]}>
                <View>
                  <Text style={styles.location}> {index === 0 ? "Hoje" : day}</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
