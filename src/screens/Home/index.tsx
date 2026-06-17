import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import iconeAlerta from "../../../assets/Siren.png";
import { styles } from "./styles";

export const Home = () => {
  const [notificacao, setNotificacao] = useState(true);

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

        {/* Estilização dos elementos renderizados -> lista de locais salvos */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
