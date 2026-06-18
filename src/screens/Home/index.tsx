import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Favorito, LocalFavorito } from "../../components/LocalFavorito";
import { RootStackParamList } from "../../utils/routes";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openMeteoApi } from "../../services/API";

const locaisFavoritos = [{}];

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchPage"
>;

export const HomeScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const [notificacao, setNotificacao] = useState(true);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarFavoritosComClima = async () => {
    try {
      setCarregando(true);

      const json = await AsyncStorage.getItem("@favoritos");

      const dados: Favorito[] = json
        ? JSON.parse(json)
        : locaisFavoritos;

      const favoritosComClima = await Promise.all(
        dados.map(async (favorito): Promise<Favorito> => {
          try {
            const resposta = await openMeteoApi.get("/forecast", {
              params: {
                latitude: favorito.latitude,
                longitude: favorito.longitude,
                current: "temperature_2m",
                forecast_days: 1,
              },
            });

            return {
              ...favorito,
              temperatura: resposta.data?.current?.temperature_2m,
            };
          } catch {
            return favorito;
          }
        })
      );

      setFavoritos(favoritosComClima);
    } catch (erro) {
      console.error("Erro ao carregar favoritos:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarFavoritosComClima();
    }, [])
  );

  async function removeFavorito(id: string) {
    try {
      const novaLista = favoritos.filter(
        (favorito) => favorito.id !== id
      );

      setFavoritos(novaLista);

      await AsyncStorage.setItem(
        "@favoritos",
        JSON.stringify(
          novaLista.map(({ temperatura, ...rest }) => rest)
        )
      );
    } catch (erro) {
      console.error("Erro ao remover favorito:", erro);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "top"]}
      >
        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("SearchPage")}
        >
          <View style={styles.containerCard}>
            <Text style={[styles.text, styles.description]}>
              Minha Localização
            </Text>

            <Text style={[styles.text, styles.local]}>
              Rio de Janeiro
            </Text>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.temperature]}>
                20º
              </Text>

              <Image
                source={require("../../../assets/icons/iconCloud.png")}
                style={styles.iconTemperature}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.subInfoText]}>
                Nublado
              </Text>

              <Image
                source={require("../../../assets/icons/moonCloud.png")}
                style={styles.iconSubInfo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, styles.observation]}>
                Dia 22° - Noite 18°C
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList<Favorito>
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LocalFavorito
              local={item}
              removeFavorito={removeFavorito}
            />
          )}
          ListEmptyComponent={
            !carregando ? (
              <Text style={[styles.local, styles.text]}>
                Ainda não existem locais favoritos.
              </Text>
            ) : null
          }
          contentContainerStyle={{
            gap: 16,
            width: "100%",
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};