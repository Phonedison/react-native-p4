
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useBuscarClima } from "../../hooks";
import {RootStackParamList} from "../../utils/routes"

type NavigationProp = StackNavigationProp<RootStackParamList, "SearchPage">;

export const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());
  const [temperaturas, setTemperaturas] = useState<Record<number, number | null>>({});

  const { locaisEncontrados, loading, buscarCidade, limparResultados, buscarTemperatura } = useBuscarClima();
  

  useEffect(() => {
  if (locaisEncontrados.length === 0) {
    setTemperaturas({});
    return;
  }

  locaisEncontrados.forEach(async (cidade) => {
    const temp = await buscarTemperatura(cidade.latitude, cidade.longitude);
    setTemperaturas(prev => ({ ...prev, [cidade.id]: temp }));
  });
}, [locaisEncontrados]);
  const handleFavoritar = (id: number) => {
    setFavoritos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderItem = ({ item }: { item: any }) => {
  const isFavorito = favoritos.has(item.id);
  const subtitle = [item.admin1, item.country].filter(Boolean).join(", ");
  const temperatura = temperaturas[item.id];

  return (
    <TouchableOpacity
      style={[styles.resultItem, isFavorito && styles.resultItemSelected]}
      onPress={() => console.log("navegar para detalhes de", item.name)}
      activeOpacity={0.85}
    >
      <View style={styles.resultTextWrapper}>
      
        <Text style={[styles.text, styles.local]}>{item.name} / <Text style={[styles.text, styles.subInfoText]}>
        {temperatura !== undefined && temperatura !== null
          ? `${(temperatura)}°`
          : "..."}
        </Text> </Text> 
        {subtitle ? <Text style={[styles.text, styles.description]}>{subtitle}</Text> : null}

      </View>
        

      

      <TouchableOpacity
        onPress={() => handleFavoritar(item.id)}
        style={[styles.checkWrapper, isFavorito && styles.checkWrapperSelected]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.checkIcon}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>

        

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar cidade..."
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              if (text.trim().length >= 3) {
                buscarCidade(text);
              } else {
                limparResultados();
              }
            }}
          />
        </View>

        <FlatList
          data={locaisEncontrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          ListEmptyComponent={
            search.trim().length >= 3 && !loading
              ? <Text style={styles.emptyText}>Nenhuma cidade encontrada.</Text>
              : null
          }
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};
        
      
      
        

