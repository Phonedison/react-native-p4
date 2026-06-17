import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import iconeAlerta from "../../../assets/Siren.png";
import { LocalFavorito } from "../../components/LocalFavorito";
import { Favorito } from "../../components/LocalFavorito";

const favoritos = [
  { id: "1", longitude: "111", altitude: "111" },
  { id: "2", longitude: "222", altitude: "222" },
  { id: "3", longitude: "333", altitude: "333" },
  { id: "4", longitude: "444", altitude: "444" },
  { id: "5", longitude: "555", altitude: "555" },
  { id: "6", longitude: "666", altitude: "666" },
];

export const Home = () => {
  const [notificacao, setNotificacao] = useState(true);
  const [favorito, setFavorito] = useState<Favorito[]>(favoritos);

function removeFavorito(id: string) {
    const novaListaFavorito = favorito.filter(favorito => favorito.id != id)
    setFavorito(novaListaFavorito)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <TouchableOpacity style={styles.notification} activeOpacity={0.8}>
          {notificacao && (
            <View style={styles.iconeContainer}>
              <Image source={iconeAlerta} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardPrincipal]}
          activeOpacity={0.85}
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
          renderItem={({ item }) => <LocalFavorito local={ item } removeFavorito={removeFavorito}/>}
          ListEmptyComponent={<Text style={[styles.local, styles.text]}>Ainda não existem locais favoritos.</Text>}
          contentContainerStyle={{ gap: 16, width: "100%" }}
        />

        {/* Estilização dos elementos renderizados -> lista de locais salvos */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
