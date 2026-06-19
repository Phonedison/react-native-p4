import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import iconCloud from "../../../assets/icons/iconCloud.png";
import type { RootStackParamList } from "../../components/Navigators/Stack";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { openMeteoApi } from "../../services/API";

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
    weather_code: number[];
    is_day: number[];
  };
};

function obterEmojiClima(codigo: number, dia: number) {
  if (codigo === 0) return dia === 1 ? "☀️" : "🌙";
  if ([1, 2].includes(codigo)) return dia === 1 ? "🌤️" : "☁️";
  if (codigo === 3) return "☁️";
  if ([45, 48].includes(codigo)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(codigo)) return "🌦️";

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)) {
    return "🌧️";
  }

  if ([71, 73, 75, 77, 85, 86].includes(codigo)) {
    return "🌨️";
  }

  if ([95, 96, 99].includes(codigo)) return "⛈️";

  return "🌡️";
}

export const Climate = () => {
  const route = useRoute<ClimateRouteProp>();
  const { nomeCidade, temperatura, latitude, longitude } = route.params;
  const [clima, setClima] = useState<DadosPrevisao | null>(null);
  const [nextDay, setNextDay] = useState<string[]>([]);
  const date = new Date();

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
          <View style={styles.locationRow}>
            <Text style={styles.location}>{nomeCidade}</Text>
            <Image source={iconCloud} style={styles.cloudIcon} />
          </View>
          <Text style={styles.temperature}>
            {temperatura ?? "--"}
            {"\u00b0"}
          </Text>
          <View style={styles.datails}>
            <Text style={styles.color}>
              🌡️ {clima?.current.apparent_temperature ?? "--"}°
            </Text>
            <Text style={styles.color}>
              💧 {clima?.current.relative_humidity_2m ?? "--"}%
            </Text>
            <Text style={styles.color}>
              💨 {clima?.current.wind_speed_10m ?? "--"} km/h
            </Text>
          </View>
        </View>


        <View style={styles.column}>
          <View style={[styles.card, styles.largeCard]}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.largeCardContent}
            >
              {clima?.hourly.time.map((horario, index) => (
                <View style={styles.cardDatails} key={horario}>
                  <Text style={styles.locationDatails}>
                    {index === 0
                      ? "Agora"
                      : horario.slice(11, 16)}
                  </Text>

                  <Text style={styles.weatherEmoji}>
                    {obterEmojiClima(
                      clima.hourly.weather_code[index],
                      clima.hourly.is_day[index]
                    )}
                  </Text>

                  <Text style={styles.locationDatails}>
                    {Math.round(
                      clima.hourly.temperature_2m[index]
                    )}
                    °
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={[styles.card, styles.CardDown]}>
            {nextDay.map((day, index) => (
              <View key={`${day}-${index}`} style={[styles.card, styles.CardDay]}>
                <View>
                  <Text style={styles.location}>{day}</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
