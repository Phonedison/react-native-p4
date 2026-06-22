import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { styles } from "../../screens/climate/styles";
import { obterIconClima } from "../../utils/obterIconClima";

type CardDatailsProps = {
  clima: {
    hourly: {
      time: string[];
      temperature_2m: number[];
      weather_code: number[];
    };
  } | null;
};

export const CardDatails = ({ clima }: CardDatailsProps) => {
  const previsao24Horas = clima
  ? clima.hourly.time
      .map((horario, index) => ({
        horario,
        temperatura: clima.hourly.temperature_2m[index],
        codigoClima: clima.hourly.weather_code[index],
      }))
      .filter(({ horario }) => new Date(horario) >= new Date())
      .slice(0, 24)
  : [];

  return (
    <View style={[styles.card, styles.largeCard]}>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.largeCardContent}
      >
        {!clima ? Array.from({ length: 4 }).map((_, index) => (
            
              <View style={styles.cardDatails} key={index}>
                <ActivityIndicator color="#FFFFFF" />
              </View>

            )) : previsao24Horas.map((item, index) => (
                
              <View style={styles.cardDatails} key={item.horario}>
                <Text style={styles.locationDatails}>
                  {index === 0 ? "Agora" : item.horario.slice(11, 16)}
                </Text>

                <Image source={{ uri: obterIconClima(item.codigoClima)}}
                  style={styles.weatherIcon}
                  resizeMode="contain"
                />

                <Text style={styles.locationDatails}>
                  {Math.round(item.temperatura)}°
                </Text>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

export default CardDatails;
