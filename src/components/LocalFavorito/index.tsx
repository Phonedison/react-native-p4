import { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useBuscarClimaCidade } from "../../hooks";
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

  if (loading) {
    return (
      <View style={[styles.card, { padding: 20, justifyContent: "center" }]}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (!climaLocal) return null;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text style={styles.cidadeTexto}>{local.nomeCidade}</Text>
        <Text style={styles.tempTexto}>
          {climaLocal.hourly?.temperature_2m?.[0]} ºC
        </Text>
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
