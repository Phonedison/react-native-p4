
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useBuscarClima } from "../../hooks";
<<<<<<< HEAD
import {RootStackParamList} from "../../utils/routes"
import AsyncStorage from "@react-native-async-storage/async-storage"
=======
import { RootStackParamList } from "../../components/Navigators/Stack";
import { SearchInput } from "../../components/SearchInput";
import { EmptyState } from "../../components/EmptyState";
import { CityResultItem } from "../../components/CityResultItem";

>>>>>>> 1e419cb69ad5b9e4c6ac03690fb1aa523179f4e6

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


  const handleFavoritar = async (cidade: any) => {
  setFavoritos(prev => {
    const next = new Set(prev);

    if (next.has(cidade.id)) {
      next.delete(cidade.id);
    } else {
      next.add(cidade.id);
      salvarFavorito(cidade);
    }

    return next;
  });
};

  async function salvarFavorito(cidade: any) {
    try {
      const json = await AsyncStorage.getItem("@favoritos");
      const favoritosSalvos = json ? JSON.parse(json) : [];

      const jaExiste = favoritosSalvos.some(
        (fav: any) => fav.id === String(cidade.id)
      );

      if (jaExiste) return;

      favoritosSalvos.push({
        id: String(cidade.id),
        nomeCidade: `${cidade.name}, ${cidade.country}`,
        latitude: String(cidade.latitude),
        longitude: String(cidade.longitude),
      });

      await AsyncStorage.setItem(
        "@favoritos",
        JSON.stringify(favoritosSalvos)
      );
    } catch (error) {
      console.error(error);
    }
  }

<<<<<<< HEAD
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
        onPress={() => handleFavoritar(item)}
        style={[styles.checkWrapper, isFavorito && styles.checkWrapperSelected]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.checkIcon}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

=======
  const renderItem = ({ item }: { item: any }) => (
  <CityResultItem
    item={item}
    isFavorito={favoritos.has(item.id)}
    temperatura={temperaturas[item.id]}
    onPress={() => console.log("navegar para detalhes de", item.name)}
    onFavoritar={() => handleFavoritar(item.id)}
  />
);
>>>>>>> 1e419cb69ad5b9e4c6ac03690fb1aa523179f4e6
return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <SearchInput
         value={search}
         onSearch={(text) => { setSearch(text); buscarCidade(text); }}
         onClear={(text) => { setSearch(text); limparResultados(); }} 
        />
    {loading && (
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      )}

    <FlatList
       data={locaisEncontrados}
       keyExtractor={(item) => String(item.id)}
       renderItem={renderItem}
       keyboardShouldPersistTaps="handled"
       showsVerticalScrollIndicator={false}
       style={{ width: "100%" }}
       ListEmptyComponent={
    <EmptyState visible={search.trim().length >= 3 && !loading} />
     }
    />
    </SafeAreaView>
  </SafeAreaProvider>
);
};

      


        

          
        

        
      
      
        

