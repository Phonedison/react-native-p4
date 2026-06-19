import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CardClimaLocal } from "../../components/CardClimaLocal";
import { Favorito, LocalFavorito } from "../../components/LocalFavorito";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { useBuscarClima, useMyLocation } from "../../hooks";
import { calcularMetricasClima } from "../../utils/climaHelper";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const locaisFavoritos = [{}];

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

  const clima = calcularMetricasClima(dadosClima);

  function removeFavorito(id: string) {
    const novaListaFavorito = favoritos.filter((fav) => fav.id !== id);
    setFavoritos(novaListaFavorito);
  }

  const estaCarregando = loadingGps || loadingClima;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "top", "bottom"]}
      >
        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
          onPress={handleGpsLoading}
          disabled={estaCarregando}
        >
          <CardClimaLocal
            estaCarregando={estaCarregando}
            dadosClima={dadosClima}
            cidadeGps={cidadeGps}
            erroGps={erroGps}
            statusClima={clima.statusClima}
            iconStatusClima={clima.iconStatusClima}
            tempMinima={clima.tempMinima}
            tempMaxima={clima.tempMaxima}
            sensacaoTermica={clima.sensacaoTermica}
          />
        </TouchableOpacity>

        <FlatList<Favorito>
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LocalFavorito local={item} removeFavorito={removeFavorito} />
          )}
          ListEmptyComponent={
            !carregando ? (
              <Text style={[styles.local, styles.text, styles.textInfo]}>
                Ainda não existem locais favoritos.
              </Text>
            ) : null
          }
          contentContainerStyle={styles.containerFlatList}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SearchPage")}
          activeOpacity={0.85}
          style={styles.buttonAdd}
        >
          <Text style={styles.text}>Adicionar Cidade</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
