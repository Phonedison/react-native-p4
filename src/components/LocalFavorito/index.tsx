import { Text, TouchableOpacity, View } from "react-native";
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
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text style={styles.cidadeTexto}>{local.nomeCidade}</Text>
        <Text style={styles.tempTexto}>{local.temperatura} ºC</Text>
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
