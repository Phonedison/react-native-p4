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

            )) : clima.hourly.time.map((horario, index) => (
                
              <View style={styles.cardDatails} key={horario}>
                <Text style={styles.locationDatails}>
                  {index === 0 ? "Agora" : horario.slice(11, 16)}
                </Text>

                <Image source={{ uri: obterIconClima(clima.hourly.weather_code[index])}}
                  style={styles.weatherIcon}
                  resizeMode="contain"
                />

                <Text style={styles.locationDatails}>
                  {Math.round(clima.hourly.temperature_2m[index])}°
                </Text>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

export default CardDatails;
