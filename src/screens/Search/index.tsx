import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { useBuscarClima } from "../../hooks";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { SearchInput } from "../../components/SearchInput";
import { EmptyState } from "../../components/EmptyState";
import { CityResultItem } from "../../components/CityResultItem";

type NavigationProp = StackNavigationProp<RootStackParamList, "SearchPage">;

type Cidade = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type FavoritosContextType = {
  favoritos: Set<number>;
  handleFavoritar: (cidade: Cidade) => void;
};

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

const FavoritosProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());

  async function salvarFavorito(cidade: Cidade) {
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
      await AsyncStorage.setItem("@favoritos", JSON.stringify(favoritosSalvos));
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    }
  }

  const handleFavoritar = (cidade: Cidade) => {
    setFavoritos((prev) => {
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

  return (
    <FavoritosContext.Provider value={{ favoritos, handleFavoritar }}>
      {children}
    </FavoritosContext.Provider>
  );
};

const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos deve ser usado dentro de um FavoritosProvider");
  }
  return context;
};

const SearchScreenContent = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [temperaturas, setTemperaturas] = useState<Record<number, number | null>>({});
  const { favoritos, handleFavoritar } = useFavoritos();
  const {
    locaisEncontrados,
    loading,
    buscarCidade,
    limparResultados,
    buscarTemperatura,
  } = useBuscarClima();

  useEffect(() => {
    if (locaisEncontrados.length === 0) {
      setTemperaturas({});
      return;
    }
    locaisEncontrados.forEach(async (cidade) => {
      const temp = await buscarTemperatura(cidade.latitude, cidade.longitude);
      setTemperaturas((prev) => ({
        ...prev,
        [cidade.id]: temp,
      }));
    });
  }, [locaisEncontrados]);

  const renderItem = ({ item }: { item: any }) => (
    <CityResultItem
      item={item}
      isFavorito={favoritos.has(item.id)}
      temperatura={temperaturas[item.id]}
      onPress={() => console.log("navegar para detalhes de", item.name)}
      onFavoritar={() => handleFavoritar(item)}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
        <SearchInput
          value={search}
          onSearch={(text) => {
            setSearch(text);
            if (text.trim().length >= 3) {
              buscarCidade(text);
            } else {
              limparResultados();
            }
          }}
          onClear={(text) => {
            setSearch(text);
            limparResultados();
          }}
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

export const SearchScreen = () => (
  <FavoritosProvider>
    <SearchScreenContent />
  </FavoritosProvider>
);