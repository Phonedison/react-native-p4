import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CityResultItem } from "../../components/CityResultItem";
import { EmptyState } from "../../components/EmptyState";
import { RootStackParamList } from "../../components/Navigators/Stack";
import { SearchInput } from "../../components/SearchInput";
import { useBuscarClima } from "../../hooks";
import { whiteColor } from "../../utils/globalStyles";
import { styles } from "./styles";

type NavigationProp = StackNavigationProp<RootStackParamList, "SearchPage">;

interface CidadeResultado {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [search, setSearch] = useState("");

  const [favoritosIds, setFavoritosIds] = useState<Set<string>>(new Set());
  const [temperaturas, setTemperaturas] = useState<
    Record<number, number | null>
  >({});

  const {
    locaisEncontrados,
    loading,
    buscarCidade,
    limparResultados,
    buscarTemperatura,
  } = useBuscarClima();

  useEffect(() => {
    const carregarFavoritosIniciais = async () => {
      try {
        const json = await AsyncStorage.getItem("@favoritos");
        if (json) {
          const favoritados = JSON.parse(json);

          const idsSet = new Set<string>(
            favoritados.map((fav: any) => String(fav.id)),
          );
          setFavoritosIds(idsSet);
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos iniciais:", error);
      }
    };

    carregarFavoritosIniciais();
  }, []);

  useEffect(() => {
    if (locaisEncontrados.length === 0) {
      setTemperaturas({});
      return;
    }

    const carregarTemperaturas = async () => {
      locaisEncontrados.forEach(async (cidade: CidadeResultado) => {
        try {
          const temp = await buscarTemperatura(
            cidade.latitude,
            cidade.longitude,
          );
          setTemperaturas((prev) => ({
            ...prev,
            [cidade.id]: temp,
          }));
        } catch (err) {
          console.error(
            `Erro ao buscar temperatura da cidade ${cidade.id}:`,
            err,
          );
        }
      });
    };

    carregarTemperaturas();
  }, [locaisEncontrados]);

  async function salvarFavorito(cidade: CidadeResultado) {
    try {
      const json = await AsyncStorage.getItem("@favoritos");
      const favoritosSalvos = json ? JSON.parse(json) : [];

      const jaExiste = favoritosSalvos.some(
        (fav: any) => String(fav.id) === String(cidade.id),
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

  async function removerFavoritoStorage(cidadeId: string) {
    try {
      const json = await AsyncStorage.getItem("@favoritos");
      if (json) {
        const favoritosSalvos = JSON.parse(json);
        const novaLista = favoritosSalvos.filter(
          (fav: any) => String(fav.id) !== cidadeId,
        );
        await AsyncStorage.setItem("@favoritos", JSON.stringify(novaLista));
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  }

  const handleFavoritar = async (cidade: CidadeResultado) => {
    const idString = String(cidade.id);

    setFavoritosIds((prev) => {
      const next = new Set(prev);

      if (next.has(idString)) {
        next.delete(idString);
        removerFavoritoStorage(idString);
      } else {
        next.add(idString);
        salvarFavorito(cidade);
      }

      return next;
    });
  };

  const renderItem = ({ item }: { item: CidadeResultado }) => (
    <CityResultItem
      item={item}
      isFavorito={favoritosIds.has(String(item.id))}
      temperatura={temperaturas[item.id]}
      onPress={() => console.info("navegar para detalhes de", item.name)}
      onFavoritar={() => handleFavoritar(item)}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "top", "bottom"]}
      >
        <SearchInput
          value={search}
          onSearch={(text) => {
            setSearch(text);
            buscarCidade(text);
          }}
          onClear={(text) => {
            setSearch(text);
            limparResultados();
          }}
        />

        {loading && (
          <ActivityIndicator
            size="large"
            color={whiteColor}
            style={styles.loading}
          />
        )}

        <FlatList
          data={locaisEncontrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          ListEmptyComponent={
            <EmptyState visible={search.trim().length >= 3 && !loading} />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
