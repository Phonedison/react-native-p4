import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Favorito, LocalFavorito } from "../../components/LocalFavorito";
import { RootStackParamList } from "../../utils/routes";
import { styles } from "./styles";

const favoritos = [
  { id: "1", longitude: "111", latitude: "111" },
  { id: "2", longitude: "222", latitude: "222" },
  { id: "3", longitude: "333", latitude: "333" },
  { id: "4", longitude: "444", latitude: "444" },
  { id: "5", longitude: "555", latitude: "555" },
  { id: "6", longitude: "666", latitude: "666" },
];

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchPage"
>;

export const HomeScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [notificacao, setNotificacao] = useState(true);
  const [favorito, setFavorito] = useState<Favorito[]>(favoritos);

  function listarFavoritos() {}

  function removeFavorito(id: string) {
    const novaListaFavorito = favorito.filter((favorito) => favorito.id != id);
    setFavorito(novaListaFavorito);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("SearchPage")} //teste
        >
          <View style={styles.containerCard}>
            <Text style={[styles.text, styles.description]}>
              Minha Localização
            </Text>
            <Text style={[styles.text, styles.local]}>Rio de Janeiro</Text>
            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.temperature]}>20º</Text>
              <Image
                source={require("../../../assets/icons/iconCloud.png")}
                style={styles.iconTemperature}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.subInfoText]}>Nublado</Text>
              <Image
                source={require("../../../assets/icons/moonCloud.png")}
                style={styles.iconSubInfo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.observation]}>
                Dia 22ª - Noite 18ºC
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList<Favorito>
          data={favorito}
          keyExtractor={(local) => local.id}
          renderItem={({ item }) => (
            <LocalFavorito local={item} removeFavorito={removeFavorito} />
          )}
          ListEmptyComponent={
            <Text style={[styles.local, styles.text]}>
              Ainda não existem locais favoritos.
            </Text>
          }
          contentContainerStyle={{ gap: 16, width: "100%" }}
        />

        {/* Estilização dos elementos renderizados -> lista de locais salvos */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
