
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useBuscarClima } from "../../hooks";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { SearchInput } from "../../components/SearchInput";
import { EmptyState } from "../../components/EmptyState";
import { CityResultItem } from "../../components/CityResultItem";


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

  const renderItem = ({ item }: { item: any }) => (
  <CityResultItem
    item={item}
    isFavorito={favoritos.has(item.id)}
    temperatura={temperaturas[item.id]}
    onPress={() => console.log("navegar para detalhes de", item.name)}
    onFavoritar={() => handleFavoritar(item.id)}
  />
);
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

      


        

          
        

        
      
      
        

