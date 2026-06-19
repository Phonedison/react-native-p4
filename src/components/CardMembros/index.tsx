import React from "react";
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Members } from "../../screens/Members";
import { styles } from "./styles";

type MemberCardProps = {
  pessoa: Members;
};

export const CardMembros = ({ pessoa }: MemberCardProps) => {
  const handleOpenLink = async () => {
    if (!pessoa.github) {
      Alert.alert("Aviso", "Este usuário não possui GitHub cadastrado.");
      return;
    }

    const githubUrl = `https://github.com/${pessoa.github}`;

    try {
      const supported = await Linking.canOpenURL(githubUrl);
      if (supported) {
        await Linking.openURL(githubUrl);
      } else {
        Alert.alert(
          "Erro",
          `Não foi possível abrir o link do GitHub de: ${pessoa.nome}`,
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao tentar abrir o navegador.");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.card, styles.cardPrincipal]}
      onPress={handleOpenLink}
    >
      {pessoa.fotoUrl && (
        <Image source={{ uri: pessoa.fotoUrl }} style={styles.avatar} />
      )}
      <View style={styles.containerCard}>
        <Text style={[styles.text, styles.memberName]} numberOfLines={1}>
          {pessoa.nome}
        </Text>

        {pessoa.github && (
          <>
            <Text style={[styles.text, styles.memberNickname]}>
              @{pessoa.github}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
