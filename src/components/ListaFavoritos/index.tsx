import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const ListaFavoritos = () => {
  
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.conteudo}>
        <Text>Opa</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.botaoRemover}>
        <Text style={styles.botaoRemoverTexto}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
