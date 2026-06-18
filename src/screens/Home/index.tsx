import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Favorito, LocalFavorito } from "../../components/LocalFavorito";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { useBuscarClima, useMyLocation } from "../../hooks";
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

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchPage"
>;

export const HomeScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [favoritos, setFavoritos] = useState<Favorito[]>(locaisFavoritos);
  const [cidadeGps, setCidadeGps] = useState<string | null>(null);

  const {
    erro: erroGps,
    loading: loadingGps,
    getCoordenadas,
  } = useMyLocation();

  const {
    buscarClimaPorCoodenadas,
    dadosClima,
    loading: loadingClima,
  } = useBuscarClima();

  const handleGpsLoading = async () => {
    const resultadoGps = await getCoordenadas();
    if (resultadoGps && resultadoGps.latitude && resultadoGps.longitude) {
      let nomeCidade = "Minha Localização";

      try {
        const [endereco] = await Location.reverseGeocodeAsync({
          latitude: resultadoGps.latitude,
          longitude: resultadoGps.longitude,
        });
        if (endereco && (endereco.city || endereco.subregion)) {
          nomeCidade =
            endereco.city || endereco.subregion || "Minha Localização";
        }
      } catch (error) {
        console.log(
          "Não foi possível traduzir as coordenadas no nome da cidade:",
          error,
        );
      }

      setCidadeGps(nomeCidade);
      buscarClimaPorCoodenadas(resultadoGps.latitude, resultadoGps.longitude);
    }
  };

  const temperaturasDoDia = dadosClima?.hourly?.temperature_2m || [];
  const tempMinima = temperaturasDoDia.length
    ? Math.round(Math.min(...temperaturasDoDia))
    : "--";
  const tempMaxima = temperaturasDoDia.length
    ? Math.round(Math.max(...temperaturasDoDia))
    : "--";

  const sensacaoTermica =
    dadosClima?.hourly?.apparent_temperature?.[0] !== undefined
      ? Math.round(dadosClima.hourly.apparent_temperature[0])
      : "--";

  const coberturaNuvens = dadosClima?.hourly?.cloud_cover?.[0] || 0;
  const milimetrosChuva = dadosClima?.hourly?.rain?.[0] || 0;

  let statusClima = "Céu Limpo";
  let iconStatusClima = "https://maps.gstatic.com/weather/v1/clear.png";

  if (milimetrosChuva > 0) {
    statusClima = "Chuvoso";
    iconStatusClima = "https://maps.gstatic.com/weather/v1/mostly_cloudy.png";
  } else if (coberturaNuvens > 70) {
    statusClima = "Nublado";
    iconStatusClima = "https://maps.gstatic.com/weather/v1/cloudy.png";
  } else if (coberturaNuvens > 30) {
    statusClima = "Parcialmente Nublado";
    iconStatusClima = "https://maps.gstatic.com/weather/v1/partly_cloudy.png";
  }

  function removeFavorito(id: string) {
    const novaListaFavorito = favoritos.filter(
      (favoritos) => favoritos.id != id,
    );
    setFavoritos(novaListaFavorito);
  }

  const estaCarregando = loadingGps || loadingClima;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
          onPress={handleGpsLoading}
          disabled={estaCarregando}
        >
          {estaCarregando ? (
            <View
              style={[
                styles.containerCard,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={[styles.text, { marginTop: 8 }]}>
                Buscando localização e clima...
              </Text>
            </View>
          ) : dadosClima ? (
            <View style={styles.containerCard}>
              <Text style={[styles.text, styles.description]}>
                Minha Localização
              </Text>
              <Text style={[styles.text, styles.local]}>{cidadeGps}</Text>

              <View style={styles.infoContainer}>
                <Text style={[styles.text, styles.temperature]}>
                  {dadosClima?.hourly?.temperature_2m?.[0] !== undefined
                    ? `${Math.round(dadosClima.hourly.temperature_2m[0])}ºC`
                    : "-- ºC"}
                </Text>
                <Image
                  source={{
                    uri: iconStatusClima,
                  }}
                  style={styles.iconTemperature}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.infoContainer}>
                <Text style={[styles.text, styles.subInfoText]}>
                  {statusClima}
                </Text>
                <Image
                  source={{
                    uri: iconStatusClima,
                  }}
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
          ) : (
            <View
              style={[
                styles.containerCard,
                { paddingVertical: 20, alignItems: "center" },
              ]}
            >
              <Text
                style={[styles.text, styles.local, { textAlign: "center" }]}
              >
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
          )}
        </TouchableOpacity>

        <FlatList<Favorito>
          data={favoritos}
          keyExtractor={(local) => local.id}
          renderItem={({ item }) => (
            <LocalFavorito local={item} removeFavorito={removeFavorito} />
          )}
          ListEmptyComponent={
            <Text
              style={[
                styles.local,
                styles.text,
                { textAlign: "center", marginTop: 20 },
              ]}
            >
              Ainda não existem locais favoritos.
            </Text>
          }
          contentContainerStyle={{ gap: 16, width: "100%", paddingBottom: 20 }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
          <Text>Adicionar Cidade</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
