import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { whiteColor } from "../../utils/globalStyles";
import { styles } from "./styles";

type CardClimaLocalProps = {
  estaCarregando: boolean;
  dadosClima: any;
  cidadeGps: string | null;
  statusClima: string;
  iconStatusClima: string;
  tempMinima: string | number;
  tempMaxima: string | number;
  sensacaoTermica: string | number;
  erroGps: string | null;
  mostrarLocalizacao?: boolean;
};

export function CardClimaLocal({
  dadosClima,
  cidadeGps,
  statusClima,
  iconStatusClima,
  tempMinima,
  tempMaxima,
  sensacaoTermica,
  erroGps,
  mostrarLocalizacao = true,
}: CardClimaLocalProps) {
  if (!dadosClima && !erroGps) {
    return (
      <View style={[styles.containerCard, styles.loading]}>
        <ActivityIndicator size="large" color={whiteColor} />
      </View>
    );
  }

  return (
    <View style={styles.containerCard}>
      {mostrarLocalizacao && (
        <Text style={[styles.text, styles.description]}>
          Minha Localização
        </Text>
      )}
      <Text style={[styles.text, styles.local]}>{cidadeGps}</Text>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.temperature]}>
          {dadosClima?.hourly?.temperature_2m?.[0] !== undefined
            ? `${Math.round(dadosClima.hourly.temperature_2m[0])}º`
            : "-- ºC"}
        </Text>
        <Image
          source={{ uri: iconStatusClima }}
          style={styles.iconTemperature}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.subInfoText]}>{statusClima}</Text>
        <Image
          source={{ uri: iconStatusClima }}
          style={styles.iconSubInfo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.observation]}>
          Min: {tempMinima}ºC • Max: {tempMaxima}ºC (Sensação: {sensacaoTermica}
          ºC)
        </Text>
      </View>
    </View>
  );
}
