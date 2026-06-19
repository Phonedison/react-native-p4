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
};

export function CardClimaLocal({
  estaCarregando,
  dadosClima,
  cidadeGps,
  statusClima,
  iconStatusClima,
  tempMinima,
  tempMaxima,
  sensacaoTermica,
  erroGps,
}: CardClimaLocalProps) {
  if (estaCarregando) {
    return (
      <View
        style={[
          styles.containerCard,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={whiteColor} />
        <Text style={styles.text}>Buscando localização e clima...</Text>
      </View>
    );
  }

  if (dadosClima) {
    return (
      <View style={styles.containerCard}>
        <Text style={[styles.text, styles.description]}>Minha Localização</Text>
        <Text style={[styles.text, styles.local]}>{cidadeGps}</Text>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.temperature]}>
            {dadosClima?.hourly?.temperature_2m?.[0] !== undefined
              ? `${Math.round(dadosClima.hourly.temperature_2m[0])}ºC`
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
            Min: {tempMinima}ºC • Max: {tempMaxima}ºC (Sensação:{" "}
            {sensacaoTermica}ºC)
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.containerCard,
        { paddingVertical: 20, alignItems: "center" },
      ]}
    >
      <Text style={[styles.text, styles.local, { textAlign: "center" }]}>
        Toque para ver o clima local
      </Text>
      <Text
        style={[
          styles.text,
          styles.description,
          { textAlign: "center", marginTop: 4 },
        ]}
      >
        {erroGps ? erroGps : "Necessário permissão de localização."}
      </Text>
    </View>
  );
}
