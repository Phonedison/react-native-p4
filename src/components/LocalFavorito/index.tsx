import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export type Favorito = {
  id: string;
  longitude: string;
  latitude: string;
};

type FavoritoProps = {
  local: Favorito;
  removeFavorito: (id: string) => void;
};

export function LocalFavorito({ local, removeFavorito }: FavoritoProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text style={styles.cidadeTexto}>{local.longitude}</Text>
        <Text style={styles.tempTexto}>{local.latitude}</Text>
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
