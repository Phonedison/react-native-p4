import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import iconeAlerta from "../../../assets/Siren.png";

export const Home = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.iconeContainer}>
          <Image style={styles.icone} source={iconeAlerta} />
        </View>
      </View>

      <View style={styles.cardPrincipal}>
        <Text>Meu Local Atual</Text>
        <View>
          <Text>20º</Text>
          <Image />
        </View>

        <View>
          <View>
            <Text>Nublado</Text>
            <Image />
          </View>
          <Text></Text>
        </View>

        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
