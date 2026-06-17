import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export const SearchScreen = () => {
  const [notificacao, setNotificacao] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar cidade..."
          placeholderTextColor="rgba(26, 25, 25, 0.6)"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>
    </SafeAreaView>
  );
};
