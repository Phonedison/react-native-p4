import React, { useEffect, useState } from "react";
import {View, FlatList, ActivityIndicator} from "react-native";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import { useBuscarClima } from "../../hooks";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { SearchInput } from "../../components/SearchInput";
import { EmptyState } from "../../components/EmptyState";
import { CityResultItem } from "../../components/CityResultItem";
import { useFavoritos } from "../../contexts/FavoritosContext";

type NavigationProp = StackNavigationProp<RootStackParamList, "SearchPage">;

export const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");

  const [temperaturas, setTemperaturas] = useState<Record<number, number | null>>({});

  const {favoritos: favoritosContext, adicionarFavorito} = useFavoritos();

  const favoritos = new Set(favoritosContext.map((item) => Number(item.id)));

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
      const temp = await buscarTemperatura(
        cidade.latitude,
        cidade.longitude
      );

      setTemperaturas((prev) => ({
        ...prev,
        [cidade.id]: temp,
      }));
    });
  }, [locaisEncontrados]);

  const handleFavoritar = async (cidade: any) => {await adicionarFavorito(cidade);};

  const renderItem = ({ item }: { item: any }) => (
    <CityResultItem
      item={item}
      isFavorito={favoritos.has(item.id)}
      temperatura={temperaturas[item.id]}
      onPress={() =>
        console.log("navegar para detalhes de", item.name)
      }
      onFavoritar={() => handleFavoritar(item)}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "top"]}
      >
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
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 20 }}
          />
        )}

        <FlatList
          data={locaisEncontrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          ListEmptyComponent={
            <EmptyState
              visible={
                search.trim().length >= 3 &&
                !loading
              }
            />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};