import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Favorito, LocalFavorito } from "../../components/LocalFavorito";
import type { HomeStackParamList } from "../../components/Navigators/HomeStack";
import { openMeteoApi } from "../../services/API";
import { styles } from "./styles";

const locaisFavoritos = [
  {
    id: "1",
    nomeCidade: "Rio de Janeiro, BR",
    latitude: "-22.9068",
    longitude: "-43.1729",
  },
  {
    id: "2",
    nomeCidade: "São Paulo, BR",
    latitude: "-23.5505",
    longitude: "-46.6333",
  },
  {
    id: "3",
    nomeCidade: "Porto Alegre, BR",
    latitude: "-30.0346",
    longitude: "-51.2177",
  },
  {
    id: "4",
    nomeCidade: "Fortaleza, BR",
    latitude: "-3.7172",
    longitude: "-38.5433",
  },
  {
    id: "5",
    nomeCidade: "Paris, França",
    latitude: "48.8566",
    longitude: "2.3522",
  },
  {
    id: "6",
    nomeCidade: "Tóquio, Japão",
    latitude: "35.6762",
    longitude: "139.6503",
  },
];

type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  useEffect(() => {
    async function carregarFavoritosComClima(): Promise<void> {
      try {
        const json = await AsyncStorage.getItem("@favoritos");
        const dados: Favorito[] = json ? JSON.parse(json) : locaisFavoritos;

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
              return { ...favorito };
            }
          }),
        );

        setFavoritos(favoritosComClima);
      } catch (erro) {
        console.error("Erro ao carregar favoritos:", erro);
      }
    }

    carregarFavoritosComClima();
  }, []);

  function removeFavorito(id: string) {
    setFavoritos((listaAtual) =>
      listaAtual.filter((favorito) => favorito.id !== id),
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("SearchPage")}
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
          data={favoritos}
          keyExtractor={(local) => local.id}
          renderItem={({ item }) => (
            <LocalFavorito
              local={item}
              removeFavorito={removeFavorito}
              onPress={() =>
                navigation.navigate("WeatherDatailsPage", {
                  localId: Number(item.id),
                  nomeCidade: item.nomeCidade,
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                  temperatura: item.temperatura,
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={[styles.local, styles.text]}>
              Ainda não existem locais favoritos.
            </Text>
          }
          contentContainerStyle={{ gap: 16, width: "100%" }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
