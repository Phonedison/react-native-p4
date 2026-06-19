import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBuscarClimaCidade } from "../../hooks";
import { calcularMetricasClima } from "../../utils/climaHelper";
import { whiteColor } from "../../utils/globalStyles";
import { styles } from "./styles";

export type Favorito = {
  id: string;
  nomeCidade: string;
  longitude: string;
  latitude: string;
  temperatura?: string;
};

type FavoritoProps = {
  local: Favorito;
  removeFavorito: (id: string) => void;
};

export function LocalFavorito({ local, removeFavorito }: FavoritoProps) {
  const { climaLocal, loading, buscarClimaLocal } = useBuscarClimaCidade();

  useEffect(() => {
    buscarClimaLocal(Number(local.latitude), Number(local.longitude));
  }, [local.latitude, local.longitude]);

  const clima = calcularMetricasClima(climaLocal);

  if (loading) {
    return (
      <View style={[styles.card, styles.loading]}>
        <ActivityIndicator size="small" color={whiteColor} />
      </View>
    );
  }

  if (!climaLocal) return null;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text style={styles.cidadeTexto}>{local.nomeCidade}</Text>
        <View style={styles.containerInfo}>
          <Image source={{ uri: clima.iconStatusClima }} style={styles.image} />
          <Text style={styles.tempTexto}>
            {climaLocal.hourly?.temperature_2m?.[0] !== undefined
              ? `${Math.round(climaLocal.hourly.temperature_2m[0])}º`
              : "-- ºC"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeFavorito(local.id)}
        activeOpacity={0.8}
        style={styles.botaoRemover}
      >
        <Text style={styles.botaoRemoverTexto}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
