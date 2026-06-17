import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export type Favorito = {
  id: string;
  longitude: string;
  altitude: string;
}

export type FavoritoProps = {
  local: Favorito;
}

export function LocalFavorito ({ local }: FavoritoProps) {
  

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text style={styles.cidadeTexto}>local.longitude</Text>
        <Text style={styles.tempTexto}>local.altitude</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.botaoRemover}>
        <Text style={styles.botaoRemoverTexto}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
